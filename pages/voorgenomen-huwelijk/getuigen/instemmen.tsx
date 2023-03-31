/* eslint-disable no-console */
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {
  Button,
  ButtonGroup,
  Document,
  Heading1,
  HeadingGroup,
  Page,
  PageContent,
  PageContentMain,
  PageFooter,
  PageHeader,
  Paragraph,
  SkipLink,
  Surface,
} from "../../../src/components";
import { PageFooterTemplate } from "../../../src/components/huwelijksplanner/PageFooterTemplate";
import { PageHeaderTemplate } from "../../../src/components/huwelijksplanner/PageHeaderTemplate";
import { Assent, Assent as AssentNamespace, AssentService } from "../../../src/generated";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { isAuthenticated, unauthenticate } from "../../../src/services/authentication";
import { useRouter } from "next/router";

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "huwelijksplanner-step-getuigen-success", "form"])),
  },
});

export default function MultistepForm1() {
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [assent, setAssent] = useState<Assent | null>(null);

  const { push, query } = useRouter();
  const { t } = useTranslation(["common", "huwelijksplanner-step-getuigen-success", "form"]);

  const { assentId } = query;

  const handleResponseSubmit = (response: AssentNamespace.status) => {
    setIsLoading(true);

    AssentService.assentPatchItem(
      assentId as string,
      {
        status: response,
      } as Assent
    )
      .then(() => {
        unauthenticate();
        setIsCompleted(true);
      })
      .finally(() => setIsLoading(false));
  };

  const handleGetAssent = () => {
    setIsLoading(true);

    AssentService.assentGetItem(assentId as string)
      .then((res) => setAssent(res))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (!assentId) return; // all logic requires the assentId.

    if (!isAuthenticated()) {
      push(`/gateway-login?redirectUrl=/voorgenomen-huwelijk/getuigen/instemmen?assentId=${assentId}`);
    }

    isAuthenticated() && handleGetAssent();
  }, []);

  if (!assentId) {
    return <>Did not receive a "assentId" param.</>;
  }

  const BeforeCompleted: React.FC = () => (
    <>
      {assent && !isLoading && (
        <>
          <HeadingGroup>
            <Heading1>{assent.name}</Heading1>
          </HeadingGroup>

          <Paragraph lead>{assent.description}</Paragraph>


          <ButtonGroup>
            <Button
              disabled={isLoading}
              appearance="primary-action-button"
              onClick={() => handleResponseSubmit(AssentNamespace.status.GRANTED)}
            >
              Accepteren
            </Button>

            <Button disabled={isLoading} onClick={() => handleResponseSubmit(AssentNamespace.status.DECLINED)}>
              Afwijzen
            </Button>
          </ButtonGroup>
        </>
      )}

      {isLoading && <Skeleton height="300px" />}
    </>
  );

  return (
    <Surface>
      <Document>
        <Head>
          <title>U bent gevraagd om getuigen te zijn..</title>
        </Head>
        <SkipLink href="#main">{t("common:skip-link-main")}</SkipLink>
        <Page>
          <PageHeader>
            <PageHeaderTemplate />
          </PageHeader>
          <PageContent>
            <PageContentMain>
              {!isCompleted && <BeforeCompleted />}

              {isCompleted && <>Bedankt voor uw reactie, uw sessie is afgesloten. U kunt deze pagina verlaten.</>}

              {!isAuthenticated() && !isCompleted && (
                <>Een ogenblik geduld, u wordt doorverwezen naar de inlogpagina...</>
              )}
            </PageContentMain>
          </PageContent>
          <PageFooter>
            <PageFooterTemplate />
          </PageFooter>
        </Page>
      </Document>
    </Surface>
  );
}
