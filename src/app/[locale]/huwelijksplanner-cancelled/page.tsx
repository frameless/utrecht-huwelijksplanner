import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Heading1, Paragraph } from "../../../../src/components";
import { exampleState } from "../../../../src/data/huwelijksplanner-state";
import { useTranslation } from "../../i18n";

type Params = {
  params: {
    locale: string;
  };
};

export async function generateMetadata({ params: { locale } }: Params): Promise<Metadata> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(locale, "huwelijksplanner-cancelled");
  return {
    title: t("title"),
  };
}

export default async function WeddingPlannerCancelled({ params: { locale } }: Params) {
  const { t } = await useTranslation(locale, ["huwelijksplanner-cancelled"]);
  const data = { ...exampleState };

  if (!data.cancelled) {
    notFound();
  }
  // TODO replace hardcoded text with i18n JSON text
  return (
    <div>
      <Heading1>{t("heading-1")}</Heading1>
      <Paragraph> {locale}We sturen jullie en de getuigen een e-mail over deze annulering.</Paragraph>
      <Paragraph>
        Binnen 10 werkdagen zal het bedrag dat je voor de reservering hebt betaald weer op je rekening staan.
      </Paragraph>
    </div>
  );
}
