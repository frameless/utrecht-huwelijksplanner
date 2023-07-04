import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Metadata } from "next/types";
import {
  Aside,
  BackLink,
  Button,
  Heading1,
  Heading2,
  HeadingGroup,
  Paragraph,
  UtrechtIconArrow,
  Link as UtrechtLink,
} from "../../../components";
import { useTranslation } from "../../i18n";
type Params = {
  params: {
    locale: string;
  };
};

export async function generateMetadata({ params: { locale } }: Params): Promise<Metadata> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(locale, ["common", "huwelijksplanner-step-1"]);
  return {
    title: `${t("step-n", { n: 1 })}: ${t("title")}`,
  };
}
const onMarriageOptionSubmit = async (formData: FormData) => {
  "use server";
  const weddingType = formData.get("type");
  redirect(`/trouw-opties/${weddingType}`);
};

export default async function MultistepForm1({ params: { locale } }: Params) {
  const { t } = await useTranslation(locale, ["common", "huwelijksplanner-step-1"]);

  return (
    <div>
      <BackLink href="/">← Terug</BackLink>
      <HeadingGroup>
        <Heading1>{t("huwelijksplanner-step-1:heading-1")}</Heading1>
        {/*TODO: Step indicator component */}
        <Paragraph lead>{t("step-n-of-m", { n: 1, m: 5 })} — Kies wat je wil</Paragraph>
      </HeadingGroup>
      <>
        <Heading2>Wij willen trouwen</Heading2>
        <form action={onMarriageOptionSubmit}>
          <Button name="type" value="huwelijk" type="submit" appearance="primary-action-button">
            Trouwen plannen <UtrechtIconArrow />
          </Button>
          <Heading2>Wij willen een geregistreerd partnerschap</Heading2>
          <Button name="type" value="partnerschap" type="submit" appearance="primary-action-button">
            Geregistreerd partnerschap plannen
            <UtrechtIconArrow />
          </Button>
        </form>
      </>
      <Aside>
        <Heading2>Meer informatie</Heading2>
        <Paragraph>
          <UtrechtLink href="/" external>
            Wat zijn de verschillen tussen een huwelijk, geregistreerd partnerschap en een samenlevingscontract?
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
    </div>
  );
}
