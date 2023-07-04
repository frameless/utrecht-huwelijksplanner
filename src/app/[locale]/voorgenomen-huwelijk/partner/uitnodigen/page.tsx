import { Heading1, HeadingGroup, Paragraph } from "@utrecht/component-library-react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { BackLink, PartnerInvitation, ReservationCard } from "../../../../../components";
import { exampleState } from "../../../../../data/huwelijksplanner-state";
import { useTranslation } from "../../../../i18n";

type Params = {
  params: {
    locale: string;
  };
};

export async function generateMetadata({ params: { locale } }: Params): Promise<Metadata> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(locale, ["common", "huwelijksplanner-cancel"]);
  return {
    title: `${t("step-n", { n: 3 })}: ${t("title")}`,
  };
}

const onPartnerInvitationSubmit = async () => {
  "use server";
  redirect("/voorgenomen-huwelijk/partner/succes");
};

export default async function MultistepForm1({ params: { locale } }: Params) {
  const { t } = await useTranslation(locale, ["common", "huwelijksplanner-step-5", "form"]);
  const data = { ...exampleState };

  return (
    <>
      <BackLink href="/voorgenomen-huwelijk/partner">← Terug</BackLink>
      <form action={onPartnerInvitationSubmit}>
        <HeadingGroup>
          <Heading1>{t("heading-1")}</Heading1>
          {/*TODO: Previous button */}
          {/*TODO: Step indicator component */}
          <Paragraph lead>{t("step-n-of-m", { n: 3, m: 5 })} — Meld je voorgenomen huwelijk</Paragraph>
        </HeadingGroup>
        {/*TODO: Banner / card */}
        {data["reservation"] ? <ReservationCard reservation={data["reservation"]} locale={locale || "en"} /> : ""}
        <PartnerInvitation
          title="Nodig je partner uit"
          body="Je kunt nu je partner uitnodigen om ook in te loggen met DigID. Zo bevestigt je partner dat jullie het huwelijk willen regelen."
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
    </>
  );
}
