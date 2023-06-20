import type { Metadata } from "next";
import { BackLink, PageContentMain } from "../../../../components";
import { useTranslation } from "../../../i18n";
import { PlanningFormPageContext } from "../context";

type Params = {
  params: {
    locale: string;
  };
};

export async function generateMetadata({ params: { locale } }: Params): Promise<Metadata> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(locale, "huwelijksplanner-step-2");
  return {
    title: `${t("step-n", { n: 2 })}: ${t("title")}`,
  };
}

const PlanningFormPage = async ({ params: { locale } }: Params) => {
  return (
    <>
      <BackLink href={`${locale}/trouw-opties/`}>← Terug</BackLink>
      <PageContentMain>
        <PlanningFormPageContext locale={locale} />
      </PageContentMain>
    </>
  );
};

export default PlanningFormPage;
