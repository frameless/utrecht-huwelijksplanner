import type { Metadata } from "next";
import {
  BackLink,
  ButtonGroup,
  ButtonLink,
  Heading1,
  HeadingGroup,
  Paragraph,
  UtrechtDigidButton,
  UtrechtIconArrow,
  Link as UtrechtLink,
} from "../../../../components";
import { useTranslation } from "../../../i18n";

type Params = {
  params: {
    locale: string;
  };
};

export async function generateMetadata({ params: { locale } }: Params): Promise<Metadata> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(locale, ["common", "huwelijksplanner-step-5", "form"]);
  return {
    title: `${t("step-n", { n: 3 })}: ${t("title")}`,
  };
}

export default async function MultistepForm1({ params: { locale } }: Params) {
  const { t } = await useTranslation(locale, ["common", "huwelijksplanner-step-5", "form"]);
  // const [marriageOptions] = useContext(MarriageOptionsContext);

  // FIXME: personId from state
  const personId = "xxxx";

  return (
    <>
      <BackLink href={`/persoonsgegevens/${personId}`}>← Terug</BackLink>

      <HeadingGroup>
        <Heading1>{t("heading-1")}</Heading1>
        {/*TODO: Previous button */}
        {/*TODO: Step indicator component */}
        <Paragraph lead>{t("step-n-of-m", { n: 3, m: 5 })} — Meld je voorgenomen huwelijk</Paragraph>
      </HeadingGroup>
      {/*TODO: Banner / card */}
      {/* {marriageOptions.reservation ? (
                <ReservationCard reservation={marriageOptions.reservation} locale={locale || "en"} />
              ) : (
                ""
              )} */}
      <section>
        <Paragraph>
          We hebben jouw gegevens ontvangen. Laat nu je partner inloggen met DigiD om zijn/haar gegevens te bevestigen.
        </Paragraph>
        <ButtonGroup>
          <UtrechtDigidButton>
            <ButtonLink appearance="primary-action-button">
              Partner inloggen met DigiD <UtrechtIconArrow />
            </ButtonLink>
          </UtrechtDigidButton>
          <ButtonLink appearance="secondary-action-button" href={`/gateway-login/`}>
            {" "}
            {/*TODO add partner id*/}
            Testomgeving login
          </ButtonLink>
        </ButtonGroup>
        <Paragraph>
          Of{" "}
          <UtrechtLink href="/voorgenomen-huwelijk/partner/uitnodigen">mail een uitnodiging aan je partner</UtrechtLink>{" "}
          om in te loggen.
        </Paragraph>
      </section>
    </>
  );
}
