import { Heading1, Heading2, HeadingGroup, Link, Paragraph, SpotlightSection } from "@utrecht/component-library-react";
import { addMinutes } from "date-fns";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import { Form } from "./context";
import { Aside, ReservationCard } from "../../../../components";
import { AddressDataList } from "../../../../components/huwelijksplanner/AddressDataList";
import { PersonalDataList } from "../../../../components/huwelijksplanner/PersonalDataList";
import { HuwelijkWithId } from "../../../../data/huwelijksplanner-state";
import { resolveEmbedded } from "../../../../embedded";
import { AssentService, HuwelijkService, IngeschrevenpersoonService } from "../../../../generated";
import { getBsnFromJWT } from "../../../../openapi/authentication";
import { useTranslation } from "../../../i18n";

type Params = {
  params: {
    locale: string;
  };
};

export async function generateMetadata({ params: { locale } }: Params): Promise<Metadata> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(locale, ["huwelijksplanner-step-4", "common"]);
  return {
    title: `${t("step-n", { n: 3 })}: ${t("title")}`,
  };
}

const mapToContactObject = (email?: string, phoneNumber?: string) => {
  const contactObject: any = {};

  if (email) {
    contactObject.emails = [
      {
        naam: email,
        email: email,
      },
    ];
  }

  if (phoneNumber) {
    contactObject.telefoonnummers = [
      {
        naam: phoneNumber,
        telefoonnummer: phoneNumber,
      },
    ];
  }

  return contactObject;
};

const getResultsChecklist = () => {
  return [
    {
      display: "Ik verklaar dat ik niet trouw met mijn neef, nicht, oom of tante.",
      result: true,
    },
    {
      display:
        "Ik verklaar dat ik nu niet met iemand anders getrouwd ben (in Nederland of in een ander land). Ik heb nu ook geen geregistreerd partnerschap.",
      result: true,
    },
  ];
};

const initializeMarriage = async () => {
  const marriageOptions = JSON.parse(cookies().get("marriage-options")?.value || "");

  const response = await HuwelijkService.huwelijkPostItem({
    requestBody: {
      type: marriageOptions.productId,
      ceremonie: marriageOptions.reservation["ceremony-id"],
      moment: marriageOptions.reservation["ceremony-start"],
      ambtenaar: marriageOptions.ambtenaar,
      locatie: marriageOptions.reservation["ceremony-location"],
    },
  });

  const result = resolveEmbedded(response) as HuwelijkWithId;

  cookies().set({
    name: "marriage-options",
    value: JSON.stringify({
      ...marriageOptions,
      id: result._id || "",
      partners: [...result.partners],
      reservation: {
        ...marriageOptions.reservation,
        "ceremony-end": addMinutes(new Date(result.moment || ""), 15).toString(),
        "ceremony-price-currency": result.kosten?.split(" ")[0] || "EUR",
        "ceremony-price-amount": result.kosten?.split(" ")[1] || "-",
      },
    }),
  });
};

export default async function MultistepForm1({ params: { locale, person } }: any) {
  const { t } = await useTranslation(locale, ["huwelijksplanner-step-4", "form", "common"]);
  const marriageOptions = cookies().get("marriage-options")?.value;
  const JWT = getBsnFromJWT();
  // const { reservation } = JSON.parse(marriageOptions as any);

  const response = await IngeschrevenpersoonService.ingeschrevenpersoonGetCollection({
    burgerservicenummer: JWT as string,
  });
  const personData = resolveEmbedded(response.results[0]);

  const onActionHandler = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const phoneNumber = formData.get("phoneNumber") as string;

    if (personData.partners.length > 0) {
      HuwelijkService.huwelijkPatchItem({
        id: person as string,
        requestBody: {
          partners: [
            {
              requester: getBsnFromJWT(),
              contact: {
                subjectIdentificatie: {
                  inpBsn: getBsnFromJWT(),
                },
                ...mapToContactObject(email, phoneNumber),
              },
              results: getResultsChecklist(),
            },
          ],
        },
      });
      redirect("/voorgenomen-huwelijk/partner");
    } else {
      AssentService.assentPatchItem({
        id: person,
        requestBody: {
          requester: getBsnFromJWT(),
          contact: {
            subjectIdentificatie: {
              inpBsn: getBsnFromJWT(),
            },
            ...mapToContactObject(email, phoneNumber),
          },
          results: getResultsChecklist(),
          name: "",
        },
      });

      redirect(`/persoonsgegevens/succes?huwelijkId=${person}`);
    }
  };

  return (
    <>
      <HeadingGroup>
        <Heading1>{t("heading-1")}</Heading1>
        {/*TODO: Previous button */}
        {/*TODO: Step indicator component */}
        <Paragraph lead>{t("step-n-of-m", { n: 3, m: 5 })} — Meld je voorgenomen huwelijk</Paragraph>
      </HeadingGroup>
      {/* {reservation && <ReservationCard reservation={reservation} locale={locale} />} */}
      <div>
        {/*TODO: Banner / card */}
        <SpotlightSection type="info">
          <Heading2>Gegevens uit Basisregistratie Personen</Heading2>
          <Paragraph>
            Hieronder zie je de gegevens die bij ons bekend zijn. Klopt er iets niet?{" "}
            <Link href="https://pki.utrecht.nl/Loket/product/499c98cd12284d9c6bfe658dd0ea95cb">
              Neem contact op met de gemeente
            </Link>
            .
          </Paragraph>
        </SpotlightSection>
        <Heading2 id="personal-details">Persoonsgegevens</Heading2>
        {personData ? <PersonalDataList partner={personData} locale={locale} /> : <Skeleton height="100px" />}
        <Heading2 id="address">Adresgegevens</Heading2>
        {personData ? <AddressDataList locale={locale} partner={personData} /> : <Skeleton height="100px" />}
        <Heading2 id="contact">Contactgegevens</Heading2>
        <div>
          <Form locale={locale} onActionHandler={onActionHandler} />
        </div>
      </div>
      <Aside>
        <Heading2>Meer informatie</Heading2>
        <Paragraph>
          Je mag in Nederland trouwen met je neef, nicht, oom of tante. Je moet dan wel komen verklaren dat je niet
          gedwongen wordt. Neem contact op met de gemeente: <Link href="tel:14030">bel 14 030</Link> of{" "}
          <Link href="https://www.utrecht.nl/contact/">chat met ons</Link>.
        </Paragraph>
        <Paragraph>
          <Link href="https://www.rijksoverheid.nl/onderwerpen/huwelijksdwang/huwelijksdwang-voorkomen">
            Aanpak huwelijksdwang
          </Link>
        </Paragraph>
        <Paragraph>
          <Link href="https://pki.utrecht.nl/Loket/product/499c98cd12284d9c6bfe658dd0ea95cb">
            Wat kan ik doen als mijn gegevens niet kloppen?
          </Link>
        </Paragraph>
      </Aside>
    </>
  );
}
