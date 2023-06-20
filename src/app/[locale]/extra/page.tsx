import type { Metadata } from "next";
import { ExtraContext } from "./context";
import { useTranslation } from "../../i18n";

type Params = {
  params: {
    locale: string;
  };
};

export async function generateMetadata({ params: { locale } }: Params): Promise<Metadata> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(locale, "huwelijksplanner-step-5");
  return {
    title: `${t("title")}`,
  };
}

export default async function MultistepForm1({ params: { locale } }: Params) {
  return <ExtraContext locale={locale} />;
}
