import { endOfMonth, startOfMonth } from "date-fns";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Form } from "./Form";
import { BackLink, PageContentMain } from "../../../../components";
import { resolveEmbedded } from "../../../../embedded";
import { HuwelijkService, SdgproductService } from "../../../../generated";
import { useTranslation } from "../../../i18n";

type Params = {
  params: {
    locale: string;
    slug: string;
  };
};

export async function generateMetadata({ params: { locale } }: Params): Promise<Metadata> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(locale, "huwelijksplanner-step-2");
  return {
    title: `${t("step-n", { n: 2 })}: ${t("title")}`,
  };
}

// const mapToCeremonyData = (products: SDGProduct): CeremonyData[] => {
//   return products.gerelateerdeProducten.map((ceremony: SDGProduct) => ({
//     id: ceremony.id as string,
//     type: ceremony.upnLabel as string,
//     locationId: ceremony.gerelateerdeProducten[0].id,
//     ambtenaarId: ceremony.gerelateerdeProducten[0].gerelateerdeProducten[0].id,
//   }));
// };

const onActionHandler = async (formData: FormData) => {
  "use server";
  const event = formData.get("event");
  const response = await SdgproductService.sdgproductGetItem({ id: event as string });
  const mappedResult = resolveEmbedded(response);

  cookies().set({
    name: "marriage-options",
    value: JSON.stringify({
      ambtenaar: mappedResult.id,
      reservation: {
        "ceremony-id": mappedResult.id,
        "ceremony-type": mappedResult.upnLabel,
        "ceremony-location": mappedResult.gerelateerdeProducten[0].id,
        "ceremony-start": startOfMonth(Date.now()),
        "ceremony-end": endOfMonth(Date.now()),
      },
    }),
  });

  redirect("/voorgenomen-huwelijk");
};

const PlanningFormPage = async ({ params: { locale, slug } }: Params) => {
  const { t } = await useTranslation(locale, ["huwelijksplanner-step-4", "form", "common"]);
  const result = await SdgproductService.sdgproductGetCollection({ upnLabel: slug });
  const productId = result.results[0].id as string;

  return (
    <>
      <BackLink href="/trouw-opties/">← Terug</BackLink>
      <PageContentMain>
        <Form onActionHandler={onActionHandler} locale={locale} productId={productId} />
      </PageContentMain>
    </>
  );
};

export default PlanningFormPage;
