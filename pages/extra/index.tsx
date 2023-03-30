import { FormField, FormLabel } from "@utrecht/component-library-react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { FormEvent } from "react";
import {
  Button,
  Document,
  Fieldset,
  FieldsetLegend,
  Heading1,
  Heading2,
  HeadingGroup,
  Page,
  PageContent,
  PageContentMain,
  PageFooter,
  PageHeader,
  Paragraph,
  Surface,
} from "../../src/components";
import { Checkbox2, RadioButton2 } from "../../src/components";
import { PageFooterTemplate } from "../../src/components/huwelijksplanner/PageFooterTemplate";
import { PageHeaderTemplate } from "../../src/components/huwelijksplanner/PageHeaderTemplate";
import { ReservationCard } from "../../src/components/huwelijksplanner/ReservationCard";
import { exampleState } from "../../src/data/huwelijksplanner-state";

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "huwelijksplanner-step-5", "form"])),
  },
});

export default function MultistepForm1() {
  const { t } = useTranslation(["common", "huwelijksplanner-step-5", "form"]);
  const data = { ...exampleState };
  const { locale, push } = useRouter();

  const onMarriageCertificateKindSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    push("/voorgenomen-huwelijk/checken");
  };

  return (
    <Surface>
      <Document>
        <Head>
          <title>{`${t("huwelijksplanner-step-5:title")} - ${t("common:website-name")}`}</title>
        </Head>
        <Page>
          <PageHeader>
            <PageHeaderTemplate />
          </PageHeader>
          <PageContent>
            <PageContentMain>
              <form onSubmit={onMarriageCertificateKindSubmit}>
                <HeadingGroup>
                  <Heading1>{t("huwelijksplanner-step-5:heading-1")}</Heading1>
                  {/*TODO: Previous button */}
                  {/*TODO: Step indicator component */}
                  <Paragraph lead>Stap 3 — Meld je voorgenomen huwelijk</Paragraph>
                </HeadingGroup>
                {/*TODO: Banner / card */}
                <ReservationCard locale={locale || "en"} />
                <section>
                  <Heading2>Kies je extra’s</Heading2>
                  <Paragraph>
                    Een trouwboekje hoort niet meer standaard bij een huwelijk. Je kunt het wel bestellen als extra -
                    dan is het een mooie aandenken aan jullie trouwdag.
                  </Paragraph>
                  <Fieldset style={{ width: "fit-content" }}>
                    <FieldsetLegend>Trouwboekje</FieldsetLegend>
                    <Paragraph>
                      <Image src="/img/voorbeeld-trouwboekjes.jpg" width={600} height={385} alt="trouwboekjes" />
                    </Paragraph>
                    <FormField type="checkbox">
                      <Checkbox2 id="marriage-certificate-agreement" />
                      <FormLabel htmlFor="marriage-certificate-agreement" type="checkbox">
                        Ja, wij willen een trouwboekje
                      </FormLabel>
                    </FormField>
                    <FormField type="radio">
                      <RadioButton2 id="1" name="marriage-certificate-kind" />
                      <FormLabel htmlFor="1" type="radio">
                        Wit lederen omslag (€ 32,50)
                      </FormLabel>
                    </FormField>
                    <FormField type="radio">
                      <RadioButton2 id="2" name="marriage-certificate-kind" />
                      <FormLabel htmlFor="2" type="radio">
                        Wit lederen omslag (€ 32,50)
                      </FormLabel>
                    </FormField>
                    <FormField type="radio">
                      <RadioButton2 id="3" name="marriage-certificate-kind" />
                      <FormLabel htmlFor="3" type="radio">
                        Donkerblauw lederen omslag (€ 32,50)
                      </FormLabel>
                    </FormField>
                    <FormField type="radio">
                      <RadioButton2 id="4" name="marriage-certificate-kind" />
                      <FormLabel htmlFor="4" type="radio">
                        Rood kunstlederen omslag (€ 30,00)
                      </FormLabel>
                    </FormField>
                  </Fieldset>
                  <Button type="submit" name="type" appearance="primary-action-button">
                    Deze wil ik hebben
                  </Button>
                </section>
              </form>
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
