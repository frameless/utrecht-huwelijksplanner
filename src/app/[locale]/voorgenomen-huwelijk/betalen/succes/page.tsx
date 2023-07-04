import merge from "lodash.merge";
import type { Metadata } from "next";
import {
  Alert,
  Aside,
  DataList,
  DataListActions,
  DataListItem,
  DataListKey,
  DataListValue,
  DateValue,
  Heading1,
  Heading2,
  Heading3,
  HeadingGroup,
  Link,
  NumberValue,
  Paragraph,
  PreHeading,
  ReservationCard,
  Status,
  TimeValue,
  URLValue,
  UtrechtBadgeStatus,
} from "../../../../../components";
import {
  exampleState,
  HuwelijksplannerPartner,
  HuwelijksplannerState,
  Invitee,
  Reservation,
} from "../../../../../data/huwelijksplanner-state";
import { HuwelijksplannerAPI } from "../../../../../openapi/index";
import { useTranslation } from "../../../../i18n";

const isValidMinWitnesses = (data: HuwelijksplannerState) => {
  // Return `true` for valid when every partner has reached the minimum amount of witnesses
  return data.witnesses.length >= data.minWitnessPerPartner * 2;
};

const MarriageProcessSteps = ({ data, locale }: { data: HuwelijksplannerState; locale: string }) => (
  <Status
    steps={[
      {
        id: "cc18f54d-aadd-498f-b518-2fc74ce8e9b6",
        marker: 1,
        status: isValidMinWitnesses(data) ? "checked" : undefined,
        title: "Getuigen wijzigen of meer getuigen uitnodigen",
        meta: data.canInviteWitnesses ? (
          <div>
            <Paragraph>
              tussen vandaag en{" "}
              {data["inviteWitnessEndDate"] ? (
                <DateValue dateTime={data["inviteWitnessEndDate"]} locale={locale} />
              ) : (
                ""
              )}{" "}
              <UtrechtBadgeStatus status="neutral">niet verplicht</UtrechtBadgeStatus>
            </Paragraph>
          </div>
        ) : (
          ""
        ),
        steps: [
          {
            id: "dc18f54d-aadd-498f-b518-2fc74ce8e9b6",
            status: isValidMinWitnesses(data) ? "checked" : undefined,
            title: `tussen vandaag en ${data["inviteWitnessEndDate"]}`,
          },
        ],
      },
      {
        id: "12ca94b2-7179-4ae8-9032-dad49c294ff2",
        marker: 2,
        title: "Getuigen zijn definitief en bevestigingen van getuigen ontvangen",
      },
      {
        id: "e51f2b4c-d62f-4347-8dc1-c83a9be0afc2",
        marker: 3,
        title: "Eventuele extra’s bestellen",
      },
      {
        id: "1fc162c6-f1ab-4d1b-9007-d891cbd5614b",
        title: "Trouwdag",
        marker: 4,
        date: data.reservation
          ? ((<DateValue dateTime={data.reservation["ceremony-start"]} locale={locale} />) as any)
          : "",
        meta:
          data.reservation && data.reservation["ceremony-location"] === "Locatie Stadskantoor" ? (
            <Paragraph>
              Jullie gaan trouwen op de vierde verdieping van het{" "}
              <Link href="https://www.utrecht.nl/contact/stadskantoor">Stadskantoor Utrecht</Link>.
            </Paragraph>
          ) : (
            ""
          ),
      },
    ]}
  />
);

type Params = {
  params: {
    locale: string;
  };
};
// TODO create huwelijksplanner-payment-success.json
export async function generateMetadata({ params: { locale } }: Params): Promise<Metadata> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(locale, [
    "huwelijksplanner-payment-success",
    "huwelijksplanner",
    "form",
    "common",
  ]);
  return {
    title: t("title"),
  };
}

const fetchData = async (huwelijkId: string) => {
  try {
    const res = await HuwelijksplannerAPI.getHuwelijk(huwelijkId);

    return res;
  } catch (error) {
    // throw new Error("Server Error!");
    return false;
  }
};

export default async function HuwelijksplannerStep0({ params: { locale } }: Params) {
  const { t } = await useTranslation(locale, ["huwelijksplanner", "form", "common"]);

  const huwelijkId = "6e69d32c-afdb-4aef-85cc-fd5ff743a84b";
  const huwelijk: any = await fetchData(huwelijkId);

  const data = huwelijk
    ? merge(
        { ...exampleState },
        {
          "ceremony-start": huwelijk.moment,
          reservation: {
            "ceremony-start": huwelijk.moment,
          },
        }
      )
    : { ...exampleState };

  const PartnerDataList = ({ partner }: { partner: HuwelijksplannerPartner }) => (
    <DataList className="utrecht-data-list--grid">
      <DataListItem>
        <DataListKey>{t("name")}</DataListKey>
        <DataListValue>{partner.name}</DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListKey>{t("tel")}</DataListKey>
        <DataListValue>
          <NumberValue>{partner.tel}</NumberValue>
        </DataListValue>
        <DataListActions>
          <Link href="/huwelijksplanner-edit#tel" title={t("data-list-actions-edit-subject", { subject: t("tel") })}>
            {t("data-list-actions-edit")}
          </Link>
        </DataListActions>
      </DataListItem>
      <DataListItem>
        <DataListKey>{t("email")}</DataListKey>
        <DataListValue>
          <URLValue>{partner.email}</URLValue>
        </DataListValue>
        <DataListActions>
          <Link
            href="/huwelijksplanner-edit#email"
            title={t("data-list-actions-edit-subject", { subject: t("email") })}
          >
            {t("data-list-actions-edit")}
          </Link>
        </DataListActions>
      </DataListItem>
    </DataList>
  );

  const WitnessDataList = ({ witness }: { witness: Invitee; locale: string }) => (
    <DataList className="utrecht-data-list--grid">
      <DataListItem>
        <DataListKey>{t("name")}</DataListKey>
        <DataListValue>{witness.name}</DataListValue>
        <DataListActions>
          <Link
            href="/huwelijksplanner-witness-edit#name"
            title={t("data-list-actions-edit-subject", { subject: t("name") })}
          >
            {t("data-list-actions-edit")}
          </Link>
        </DataListActions>
      </DataListItem>
      <DataListItem>
        <DataListKey>{t("email")}</DataListKey>
        <DataListValue>
          <URLValue>{witness.email}</URLValue>
        </DataListValue>
        <DataListActions>
          <Link
            href="/huwelijksplanner-witness-edit#email"
            title={t("data-list-actions-edit-subject", { subject: t("email") })}
          >
            {t("data-list-actions-edit")}
          </Link>
        </DataListActions>
      </DataListItem>
    </DataList>
  );

  const CeremonyDataList = ({
    data,
    reservation,
  }: {
    data: HuwelijksplannerState;
    reservation: Reservation;
    locale: string;
  }) => (
    <DataList className="utrecht-data-list--grid">
      <DataListItem>
        <DataListKey>{t("ceremony-type")}</DataListKey>
        <DataListValue>{reservation["ceremony-type"]}</DataListValue>
        {data.cancelable ? (
          <DataListActions>
            <Link href="/huwelijksplanner-cancel">{t("cancel-ceremony-link", { context: "eenvoudig-huwelijk" })}</Link>
          </DataListActions>
        ) : (
          ""
        )}
      </DataListItem>
      <DataListItem>
        <DataListKey>{t("ceremony-date")}</DataListKey>
        <DataListValue>
          <DateValue dateTime={reservation["ceremony-start"]} locale={locale} />
        </DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListKey>{t("ceremony-time")}</DataListKey>
        <DataListValue>
          <TimeValue dateTime={reservation["ceremony-start"]} locale={locale} />
          {" \u2013 "}
          <TimeValue dateTime={reservation["ceremony-end"]} locale={locale} />
        </DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListKey>{t("ceremony-location")}</DataListKey>
        <DataListValue>{reservation["ceremony-location"]}</DataListValue>
      </DataListItem>
    </DataList>
  );

  return (
    <>
      <Heading1>Melding Voorgenomen Huwelijk</Heading1>
      <Paragraph>Stap 5 van 5 – Je huwelijksdatum is geregeld</Paragraph>
      <Alert type="ok">
        <HeadingGroup>
          <Heading2>Betaling ontvangen</Heading2>
          <PreHeading>Gelukt</PreHeading>
        </HeadingGroup>
      </Alert>
      {data["reservation"] ? <ReservationCard reservation={data["reservation"]} locale={locale} /> : ""}
      <Paragraph>
        Jullie reservering is geslaagd en we hebben de melding van het voorgenomen huwelijk ontvangen.
      </Paragraph>
      <Paragraph>
        Je krijgt van ons een e-mail met daarin een link naar deze pagina. Zo kunnen jullie de gegevens later wijzigen
        of aanvullen.
      </Paragraph>
      <section>
        <Heading2>Nog te doen</Heading2>
        <MarriageProcessSteps data={data} locale={locale} />
      </section>
      <section>
        <Heading2>Dit hebben jullie doorgegeven</Heading2>
        {data.reservation ? <CeremonyDataList data={data} reservation={data.reservation} locale={locale} /> : ""}
        <section>
          <Heading3>Partners</Heading3>
          {data.partners.map((partner: any, index: number) => (
            <PartnerDataList key={index} partner={partner} />
          ))}
        </section>
        <section>
          <Heading3>Getuigen</Heading3>
          {data.witnesses.map((witness: any, index: number) => (
            <WitnessDataList key={index} locale={locale} witness={witness} />
          ))}
        </section>
      </section>
      <Aside>
        <Heading2>Deze pagina is automatisch bewaard</Heading2>
        <Paragraph>
          We hebben een e-mail naar jullie gestuurd met daarin een link naar deze pagina. Je kunt veilig de pagina
          verlaten.
        </Paragraph>
      </Aside>
    </>
  );
}
