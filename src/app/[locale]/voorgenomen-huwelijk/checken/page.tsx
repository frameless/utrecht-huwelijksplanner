import { UnorderedList, UnorderedListItem } from "@utrecht/component-library-react";
import type { Metadata } from "next";
import {
  ButtonGroup,
  ButtonLink,
  Heading1,
  Heading2,
  HeadingGroup,
  Paragraph,
  ReservationCard,
} from "../../../../components";
import { exampleState } from "../../../../data/huwelijksplanner-state";
import { useTranslation } from "../../../i18n";
type Params = {
  params: {
    locale: string;
  };
};
export async function generateMetadata({ params: { locale } }: Params): Promise<Metadata> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(locale, ["common", "huwelijksplanner-step-5", "form"]);
  return {
    title: t("title"),
  };
}
export default async function MultistepForm1({ params: { locale } }: Params) {
  const { t } = await useTranslation(locale, ["common", "huwelijksplanner-step-5", "form"]);
  const data = { ...exampleState };

  return (
    <form method="POST" action="/api/huwelijksplanner-step-5">
      <HeadingGroup>
        <Heading1>{t("heading-1")}</Heading1>
        {/*TODO: Previous button */}
        {/*TODO: Step indicator component */}
        <Paragraph lead>{t("step-n-of-m", { n: 3, m: 5 })} — Meld je voorgenomen huwelijk</Paragraph>
      </HeadingGroup>
      {/*TODO: Banner / card */}
      {data["reservation"] ? <ReservationCard reservation={data["reservation"]} locale={locale} /> : ""}
      <section>
        <Heading2>Gelukt</Heading2>
        <Paragraph>De gemeente heeft de volgende punten gecontroleerd:</Paragraph>
        <UnorderedList>
          <UnorderedListItem>Jullie zijn beide 18 jaar of ouder</UnorderedListItem>
          <UnorderedListItem>
            Jullie zijn niet met iemand anders getrouwd of hebben een geregistreerd partnerschap met iemand anders
          </UnorderedListItem>
          <UnorderedListItem>Jullie staan niet onder curatele</UnorderedListItem>
          <UnorderedListItem>
            Jullie zijn geen directe familie van elkaar (ouder en kind, grootouder en kleinkind, broer en zus)
          </UnorderedListItem>
        </UnorderedList>
        <Heading2>Jullie hebben verklaard dat:</Heading2>
        <UnorderedList>
          <UnorderedListItem>
            Jullie nu niet met iemand anders getrouwd zijn (in Nederland of in een ander land). Jullie hebben nu ook
            geen geregistreerd partnerschap.
          </UnorderedListItem>
          <UnorderedListItem>Geen neef, nicht, oom of tante van elkaar zijn.</UnorderedListItem>
        </UnorderedList>
        <Paragraph>Je kunt nu je reservering voor datum en tijd vastleggen door te betalen.</Paragraph>
        <ButtonGroup>
          <ButtonLink appearance="primary-action-button" href="/voorgenomen-huwelijk/betalen">
            Ga betalen
          </ButtonLink>
        </ButtonGroup>
      </section>
    </form>
  );
}
