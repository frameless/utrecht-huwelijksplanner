import { UtrechtDigidButton, UtrechtIconArrow } from "@utrecht/web-component-library-react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import {
  Address,
  Button,
  ButtonGroup,
  ButtonLink,
  DataNoTranslate,
  Document,
  Email,
  Heading1,
  Page,
  PageContent,
  PageContentMain,
  Paragraph,
  URLValue,
  UtrechtLogo,
} from "../../../src/components";
import { Assent, AssentService } from "../../../src/generated";
import { isAuthenticated } from "../../../src/services/authentication";

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["huwelijksplanner-step-0", "common"])),
  },
});

export default function ApplicantEmail() {
  const { t } = useTranslation("huwelijksplanner-step-0");
  const { push, query } = useRouter();
  const [assent, setAssent] = useState<Assent | null>(null);

  const { assentId } = query;

  useEffect(() => {
    const handleGetAssent = () => {
      AssentService.assentGetItem(assentId as string).then((res) => setAssent(res));
    };

    if (!assentId) return; // all logic requires the assentId.

    if (!isAuthenticated()) {
      push(`/gateway-login?redirectUrl=/voorgenomen-huwelijk/partner/instemmen?assentId=${assentId}`);
    }

    if (isAuthenticated()) {
      handleGetAssent();
    }
  }, [assentId, push]);

  return (
    <Email>
      <Document>
        <Head>
          <title>{`Melding Voorgenomen Huwelijk - ${t("common:website-name")}`}</title>
        </Head>
        <Page>
          {assent && (
            <PageContent>
              <PageContentMain>
                <Heading1>Melding Voorgenomen Huwelijk</Heading1>
                <Paragraph>
                  {/* @ts-ignore */}
                  Beste <DataNoTranslate>{assent.embedded.contact.voornaam}</DataNoTranslate>,
                </Paragraph>
                <Paragraph>
                  Uw partner heeft u uitgenodigd om te loggen met DigiD. Zo bevestigt u met uw partner dat jullie het
                  huwelijk willen regelen.
                </Paragraph>
                <ButtonGroup>
                  <UtrechtDigidButton>
                    <ButtonLink appearance="primary-action-button">
                      Inloggen met DigiD <UtrechtIconArrow />
                    </ButtonLink>
                  </UtrechtDigidButton>

                  <Button
                    onClick={() =>
                      push(`/gateway-login?redirectUrl=/voorgenomen-huwelijk/partner/instemmen?assentId=${assentId}`)
                    }
                  >
                    Testomgeving login
                  </Button>
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
          )}
          {!assent && <Skeleton height="200px" />}
        </Page>
      </Document>
    </Email>
  );
}
