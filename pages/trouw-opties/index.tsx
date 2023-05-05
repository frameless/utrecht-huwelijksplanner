import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { FormEvent, useContext, useState } from "react";
import {
  Aside,
  Button,
  ButtonGroup,
  ButtonLink,
  Document,
  Heading1,
  Heading2,
  HeadingGroup,
  Page,
  PageContent,
  PageContentMain,
  PageFooter,
  PageHeader,
  Paragraph,
  SkipLink,
  Surface,
  UtrechtIconArrow,
  Link as UtrechtLink,
} from "../../src/components";
import { PageFooterTemplate } from "../../src/components/huwelijksplanner/PageFooterTemplate";
import { PageHeaderTemplate } from "../../src/components/huwelijksplanner/PageHeaderTemplate";
import { MarriageOptionsContext } from "../../src/context/MarriageOptionsContext";
import { RegistrationType } from "../../src/data/huwelijksplanner-state";
import { SdgproductService } from "../../src/generated";

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "huwelijksplanner-step-1"])),
  },
});

export default function MultistepForm1() {
  const { t } = useTranslation(["common", "huwelijksplanner-step-1"]);
  const { replace } = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [weddingOptions, setWeddingOptions] = useState<RegistrationType | undefined>();
  const [marriageOptions, setMarriageOptions] = useContext(MarriageOptionsContext);

  const onWeddingOptionsSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);

    SdgproductService.sdgproductGetCollection(undefined, undefined, undefined, weddingOptions)
      .then((res: any) => {
        setMarriageOptions({ ...marriageOptions, type: res.results[0].id });
        replace(`/trouw-opties/${weddingOptions}`);
      })
      .finally(() => setIsLoading(false));
  };

  const onWeddingOptionsClick = (event: any) => {
    setWeddingOptions(event.target.value);
  };

  const back = () => {
    replace("/trouw-opties/");
  };

  return (
    <Surface>
      <Document>
        <Surface>
          <Head>
            <title>{`${t("common:step-n", { n: 1 })}: ${t("huwelijksplanner-step-1:title")} - ${t(
              "common:website-name"
            )}`}</title>
          </Head>
          <SkipLink href="#main">{t("common:skip-link-main")}</SkipLink>
          <Page>
            <PageHeader>
              <PageHeaderTemplate />
            </PageHeader>
            <PageContent>
              <ButtonGroup>
                <ButtonLink onClick={back} appearance="subtle-button">
                  ← Terug
                </ButtonLink>
              </ButtonGroup>
              <PageContentMain>
                <HeadingGroup>
                  <Heading1>{t("huwelijksplanner-step-1:heading-1")}</Heading1>
                  {/*TODO: Step indicator component */}
                  <Paragraph lead>{t("common:step-n-of-m", { n: 1, m: 5 })} — Kies wat je wil</Paragraph>
                </HeadingGroup>
                <form onSubmit={onWeddingOptionsSubmit}>
                  <Heading2>Wij willen trouwen</Heading2>
                  <Button
                    type="submit"
                    name="type"
                    value="huwelijk"
                    appearance="primary-action-button"
                    onClick={onWeddingOptionsClick}
                    disabled={isLoading}
                  >
                    {!isLoading ? "Trouwen plannen" : "Loading..."}
                    <UtrechtIconArrow />
                  </Button>
                  <Heading2>Wij willen een geregistreerd partnerschap</Heading2>
                  <Button
                    type="submit"
                    name="type"
                    value="partnerschap"
                    appearance="primary-action-button"
                    onClick={onWeddingOptionsClick}
                    disabled={isLoading}
                  >
                    {!isLoading ? "Geregistreerd partnerschap plannen" : "Loading..."}

                    <UtrechtIconArrow />
                  </Button>
                </form>
                <Aside>
                  <Heading2>Meer informatie</Heading2>
                  <Paragraph>
                    <UtrechtLink href="/" external>
                      Wat zijn de verschillen tussen een huwelijk, geregistreerd partnerschap en een
                      samenlevingscontract?
                    </UtrechtLink>
                  </Paragraph>
                  <Paragraph>
                    <UtrechtLink href="/" external>
                      Waar moet ik aan denken als ik wil trouwen of een geregistreerd partnerschap wil sluiten?
                    </UtrechtLink>
                  </Paragraph>
                  <Paragraph>
                    <UtrechtLink href="/" external>
                      Trouwen of partnerschap registreren in Utrecht
                    </UtrechtLink>
                  </Paragraph>
                </Aside>
              </PageContentMain>
            </PageContent>
            <PageFooter>
              <PageFooterTemplate />
            </PageFooter>
          </Page>
        </Surface>
      </Document>
    </Surface>
  );
}
