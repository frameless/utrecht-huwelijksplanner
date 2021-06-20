import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import {
  Address,
  ButtonGroup,
  ButtonLink,
  Document,
  Email,
  Heading1,
  Page,
  PageContent,
  PageContentMain,
  Paragraph,
  URLValue,
  UtrechtLogo,
} from "../src/components";

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["huwelijksplanner-step-0", "common"])),
  },
});

export default function HuwelijksplannerStep0() {
  const { t } = useTranslation("huwelijksplanner-step-0");

  return (
    <Email>
      <Document>
        <Head>
          <title>{`Melding Voorgenomen Huwelijk - ${t("common:website-name")}`}</title>
        </Head>
        <Page>
          <PageContent>
            <PageContentMain>
              <Heading1>Melding Voorgenomen Huwelijk</Heading1>
              <Paragraph>
                Beste <bdi translate="no">Anne</bdi> en <bdi translate="no">Sanne</bdi>,
              </Paragraph>
              <Paragraph>
                De reservering is geslaagd. We hebben de melding van jullie voorgenomen huwelijk ontvangen.
              </Paragraph>
              <Paragraph>
                Jullie gaan trouwen op <time dateTime="2021-04-14T10:00+01:00">14 april 2021 om 10.00 uur</time>, op de
                vierde verdieping van het Stadskantoor. De ceremonie is een eenvoudig huwelijk.
              </Paragraph>
              <Paragraph>
                Tot 24 maart kunnen jullie getuigen wijzigen of meer getuigen uitnodigen. Op{" "}
                <time dateTime="2021-03-24">24 maart</time> moeten de getuigen bij de gemeente bekend zijn. De getuigen
                moet zelf inloggen met hun DigiD.
              </Paragraph>
              <Paragraph>
                Vóór <time dateTime="2021-03-31">31 maart</time> kunnen jullie nog besluiten of jullie een trouwboekje
                willen. Je kunt dat regelen door in te loggen met je DigiD. Daarna reken je weer af met iDEAL.
              </Paragraph>
              <Paragraph>
                Willen jullie iets aanpassen aan de reservering, of gewoon kijken of alles goed is? Dat kan door in te
                loggen met je DigiD:
              </Paragraph>
              <ButtonGroup>
                <ButtonLink href="/" appearance="primary-action-button">
                  Reservering aanpassen
                </ButtonLink>
              </ButtonGroup>
              <Paragraph>Of kopieer het adres hieronder en open het in je browser:</Paragraph>
              <Paragraph>
                <URLValue>https://utrecht.nl/reservering</URLValue>
              </Paragraph>
              <Paragraph>Met vriendelijke groet,</Paragraph>
              <Address translate="no">
                Gemeente Utrecht
                <br />
                Publiekszaken
                <br />
                Burgerzaken
                <br />
                Stadsplateau 1, 3521 AZ Utrecht
              </Address>
              <Paragraph>
                <UtrechtLogo />
              </Paragraph>
            </PageContentMain>
          </PageContent>
        </Page>
      </Document>
    </Email>
  );
}
