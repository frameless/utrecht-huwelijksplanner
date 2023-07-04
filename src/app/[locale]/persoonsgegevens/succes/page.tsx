import type { Metadata } from "next";
import { useContext } from "react";
import {
  ButtonGroup,
  ButtonLink,
  DataNoTranslate,
  Heading1,
  Heading2,
  HeadingGroup,
  Paragraph,
  ReservationCard,
} from "../../../../components";
import { MarriageOptionsContext } from "../../../../context/MarriageOptionsContext";
import { useTranslation } from "../../../i18n";

type Params = {
  params: {
    locale: string;
  };
};

export async function generateMetadata({ params: { locale } }: Params): Promise<Metadata> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(locale, ["common", "huwelijksplanner-step-5"]);
  return {
    title: `${t("step-n", { n: 3 })}: ${t("title")}`,
  };
}

export default async function MultistepForm1({ params: { locale } }: Params) {
  const { t } = await useTranslation(locale, ["common", "huwelijksplanner-step-5"]);
  // const [marriageOptions] = useContext(MarriageOptionsContext);
  // const contact = marriageOptions.partners[0]?.contact;

  return (
    <form method="POST" action="/api/huwelijksplanner-step-5">
      <HeadingGroup>
        <Heading1>{t("heading-1")}</Heading1>
        {/*TODO: Previous button */}
        {/*TODO: Step indicator component */}
        <Paragraph lead>{t("step-n-of-m", { n: 3, m: 5 })} — Meld je voorgenomen huwelijk</Paragraph>
      </HeadingGroup>
      {/*TODO: Banner / card */}
      {/* {marriageOptions.reservation ? <ReservationCard reservation={marriageOptions.reservation} locale={locale} /> : ""} */}
      <section>
        <Heading2>Gelukt</Heading2>
        <Paragraph>
          We hebben jouw gegevens gekoppeld aan die van{" "}
          {/* <DataNoTranslate>{`${contact.voornaam} ${contact.achternaam}`}</DataNoTranslate>. Jullie kunnen nu verder gaan */}
          met het plannen van jullie huwelijk.
        </Paragraph>
        <ButtonGroup>
          <ButtonLink appearance="primary-action-button" href="/voorgenomen-huwelijk/getuigen">
            Nodig getuigen uit
          </ButtonLink>
        </ButtonGroup>
      </section>
    </form>
  );
}
