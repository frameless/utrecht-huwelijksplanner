import { Metadata } from "next/types";
import {
  ButtonLink,
  Heading1,
  Heading2,
  Paragraph,
  SpotlightSection,
  Strong,
  UnorderedList,
  UnorderedListItem,
  UtrechtIconArrow,
  Link as UtrechtLink,
} from "../../components";
import { useTranslation } from "../i18n";

type Params = {
  params: {
    locale: string;
  };
};

export async function generateMetadata({ params: { locale } }: Params): Promise<Metadata> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(locale, "huwelijksplanner-step-0");
  return {
    title: `${t("title")}`,
  };
}

export default async function HuwelijksplannerStep0({ params: { locale } }: Params) {
  const { t } = await useTranslation(locale, "huwelijksplanner-step-0");

  return (
    <form>
      <Heading1>{t("heading-1")}</Heading1>
      <Paragraph lead>Plan een datum en tijd. En doe een officiële melding bij de gemeente.</Paragraph>
      <Paragraph>
        <Strong>Let op:</Strong> hou je DigiD bij de hand.
      </Paragraph>
      <section>
        <Heading2>Welke stappen kun je verwachten?</Heading2>
        <UnorderedList>
          <UnorderedListItem>Kies tussen trouwen en geregistreerd partnerschap</UnorderedListItem>
          <UnorderedListItem>Kies een datum en tijd voor de bijeenkomst</UnorderedListItem>
          <UnorderedListItem>Log in met je DigiD</UnorderedListItem>
          <UnorderedListItem>Je partner logt ook in met DigID</UnorderedListItem>
          <UnorderedListItem>Nodig getuigen uit</UnorderedListItem>
          <UnorderedListItem>Betaal met iDEAL</UnorderedListItem>
          <UnorderedListItem>Je datum is geregeld!</UnorderedListItem>
        </UnorderedList>
        <Paragraph>
          <ButtonLink appearance="primary-action-button" href={`/${locale}/trouw-opties`}>
            Start
            <UtrechtIconArrow />
          </ButtonLink>
        </Paragraph>
      </section>
      <SpotlightSection aside type="info">
        <Heading2>Meer informatie</Heading2>
        <Paragraph>
          <UtrechtLink href="https://www.uabc.nl/?osc=uabc" external>
            Vindt u DigiD ingewikkeld? Bekijk dan deze uitleg over DigiD.
          </UtrechtLink>
        </Paragraph>
        <Paragraph>
          <UtrechtLink
            href="https://www.rijksoverheid.nl/onderwerpen/trouwen-samenlevingscontract-en-geregistreerd-partnerschap/vraag-en-antwoord/wat-is-het-verschil-tussen-een-huwelijk-geregistreerd-partnerschap-en-samenlevingscontract"
            external
          >
            Wat zijn de verschillen tussen een huwelijk, geregistreerd partnerschap en een samenlevingscontract?
          </UtrechtLink>
        </Paragraph>
        <Paragraph>
          <UtrechtLink href="https://example.com/#TODO" external>
            Wat is een spoedhuwelijk en hoe kun je dat regelen?
          </UtrechtLink>
        </Paragraph>
      </SpotlightSection>
    </form>
  );
}
