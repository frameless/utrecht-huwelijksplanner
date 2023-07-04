import type { Metadata } from "next";
import { Button, ButtonGroup, ButtonLink, Heading1, Paragraph } from "../../../components";
import { exampleState } from "../../../data/huwelijksplanner-state";
import { useTranslation } from "../../i18n";

type Params = {
  params: {
    locale: string;
  };
};

export async function generateMetadata({ params: { locale } }: Params): Promise<Metadata> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(locale, "huwelijksplanner-cancel");
  return {
    title: `${t("title")}`,
  };
}

export default async function MultistepForm1({ params: { locale } }: Params) {
  const { t } = await useTranslation(locale, ["huwelijksplanner-cancel"]);
  const data = { ...exampleState };

  if (!data.cancelable) {
    return <Paragraph>Huwelijk kan niet on-line geannuleerd worden. Neem contact op met Gemeente Utrecht.</Paragraph>;
  }
  return (
    <form method="POST" action="/api/huwelijksplanner-cancel">
      <Heading1>{t("heading-1")}</Heading1>
      <Paragraph>
        De gemeente Utrecht brengt geen kosten in rekening: je krijgt het volledige bedrag voor de reservering
        teruggestort op je rekening.
      </Paragraph>
      <Paragraph id="cancel-warning">Weet je zeker dat je het voorgenomen huwelijk wil annuleren?</Paragraph>
      <ButtonGroup>
        <Button
          type="submit"
          appearance="primary-action-button"
          name="cancel"
          value="1"
          aria-describedby="cancel-warning"
        >
          {t("submit-button")}
        </Button>
        <ButtonLink href="/">{t("back-button")}</ButtonLink>
      </ButtonGroup>
    </form>
  );
}
