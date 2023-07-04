import type { Metadata } from "next";
import { redirect } from "next/navigation";
import {
  Button,
  ButtonGroup,
  DataNoTranslate,
  Heading1,
  Heading2,
  HeadingGroup,
  Paragraph,
  PartnerInvitation,
  ReservationCard,
  SpotlightSection,
} from "../../../../../components";
import { exampleState } from "../../../../../data/huwelijksplanner-state";
import { useTranslation } from "../../../../i18n";

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

const onPartnerInvitationSubmit = async (formData: FormData) => {
  "use server";

  const aanvrager = formData.get("aanvrager") as string;
  const partner = formData.get("partner") as string;
  if (aanvrager && aanvrager !== null) {
    redirect(aanvrager);
  } else {
    redirect(partner);
  }
};

export default async function MultistepForm1({ params: { locale } }: Params) {
  const { t } = await useTranslation(locale, ["huwelijksplanner-step-5", "form"]);
  const data = { ...exampleState };

  return (
    <form action={onPartnerInvitationSubmit}>
      <HeadingGroup>
        <Heading1>{t("heading-1")}</Heading1>
        {/*TODO: Previous button */}
        {/*TODO: Step indicator component */}
        <Paragraph lead>Stap 3 — Meld je voorgenomen huwelijk</Paragraph>
      </HeadingGroup>
      {/*TODO: Banner / card */}
      {data["reservation"] ? <ReservationCard reservation={data["reservation"]} locale={locale || "en"} /> : ""}
      <SpotlightSection type="info">
        <Heading2>
          We wachten op <DataNoTranslate>{data.partnerInvitation?.["name"]}</DataNoTranslate>
        </Heading2>
        <Paragraph>
          We bewaren deze reservering 2 uur. Als <DataNoTranslate>{data.partnerInvitation?.["name"]}</DataNoTranslate>{" "}
          niet voor die tijd heeft ingelogd, vervalt de reservering van deze datum en tijd.
        </Paragraph>
        <Paragraph>
          Let op: u krijgt een e-mail als uw partner is ingelogd, dan kunt u doorgaan met uw huwelijksaanvraag.
        </Paragraph>
      </SpotlightSection>
      <ButtonGroup>
        <Button
          type="submit"
          appearance="primary-action-button"
          name="aanvrager"
          value="/voorgenomen-huwelijk/partner/aanvrager-email"
        >
          Bekijk e-mail voor aanvrager
        </Button>
        <Button
          type="submit"
          appearance="primary-action-button"
          name="partner"
          value="/voorgenomen-huwelijk/partner/invitation-email-partner"
        >
          Bekijk e-mail voor partner
        </Button>
      </ButtonGroup>
      <PartnerInvitation
        title="Verstuur uitnodiging opnieuw"
        body="Komt de uitnodiging niet aan? Controleer of je een foutje hebt gemaakt in het e-mailadres en verstuur de uitnodiging opnieuw."
        partnerName={{
          value: (data.partnerInvitation && data.partnerInvitation["name"]) ?? "",
          label: t("name"),
        }}
        partnerEmail={{
          value: (data.partnerInvitation && data.partnerInvitation["email"]) ?? "",
          label: t("email"),
        }}
      />
    </form>
  );
}
