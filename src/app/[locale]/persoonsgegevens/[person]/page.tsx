import type { Metadata } from "next";
import { PersonContext } from "./context";
import { useTranslation } from "../../../i18n";

type Params = {
  params: {
    locale: string;
  };
};

export async function generateMetadata({ params: { locale } }: Params): Promise<Metadata> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(locale, ["huwelijksplanner-step-4", "common"]);
  return {
    title: `${t("step-n", { n: 3 })}: ${t("title")}`,
  };
}

export default function MultistepForm1({ params: { locale, person } }: any) {
  return <PersonContext locale={locale} person={person} />;
}
