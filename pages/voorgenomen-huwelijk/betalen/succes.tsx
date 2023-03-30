import { UtrechtBadgeStatus } from "@utrecht/web-component-library-react";
import merge from "lodash.merge";
import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useState } from "react";
import {
  Alert,
  Aside,
  DataList,
  DataListActions,
  DataListItem,
  DataListKey,
  DataListValue,
  DateValue,
  Document,
  Heading1,
  Heading2,
  Heading3,
  HeadingGroup,
  Link,
  NumberValue,
  Page,
  PageContent,
  PageContentMain,
  PageFooter,
  PageHeader,
  Paragraph,
  PreHeading,
  ProcessSteps,
  ReservationCard,
  Surface,
  TimeValue,
  URLValue,
} from "../../../src/components";
import { PageFooterTemplate } from "../../../src/components/huwelijksplanner/PageFooterTemplate";
import { PageHeaderTemplate } from "../../../src/components/huwelijksplanner/PageHeaderTemplate";
import {
  exampleState,
  HuwelijksplannerPartner,
  HuwelijksplannerState,
  Invitee,
  Reservation,
} from "../../../src/data/huwelijksplanner-state";
import { HuwelijksplannerAPI } from "../../../src/openapi/index";

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["huwelijksplanner-step-0", "huwelijksplanner", "form", "common"])),
  },
});

export default function HuwelijksplannerStep0() {
  const { t } = useTranslation(["huwelijksplanner-step-0", "huwelijksplanner", "form", "common"]);
  const [data, setData] = useState({ ...exampleState });
  const locale = useRouter().locale || "en";

  useEffect(() => {
    const huwelijkId = "6e69d32c-afdb-4aef-85cc-fd5ff743a84b";

    HuwelijksplannerAPI.getHuwelijk(huwelijkId).then((huwelijk) => {
      setData(
        merge(data, {
          "ceremony-start": huwelijk.moment,
          reservation: {
            "ceremony-start": huwelijk.moment,
          },
        })
      );
    });
  }, [data]);

  const isValidMinWitnesses = (data: HuwelijksplannerState) => {
    // Return `true` for valid when every partner has reached the minimum amount of witnesses
    return data.witnesses.length >= data.minWitnessPerPartner * 2;
  };

  const MarriageProcessSteps = ({ data }: { data: HuwelijksplannerState; locale: string }) => (
    <ProcessSteps
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
    /*(
                <>
                  tussen vandaag en{" "}
                  {data["inviteWitnessEndDate"] ? (
                    <DateValue dateTime={data["inviteWitnessEndDate"]} locale={locale} />
                  ) : (
                    ""
                  )}{" "}
                  <UtrechtBadgeStatus status="neutral">niet verplicht</UtrechtBadgeStatus>
                </>
              ),*/
    /*, {
      id: "5cec92c5-73d1-485b-bf49-549472e211dc",
      marker: 2,
      status: "current",
      steps: [{
        status: "checked",
        title: "Afspraak meten geluidsoverlast gemaakt"
      }, {
        status: "checked",
        title: "Geluidsoverlast gemeten"
      }, {
        status: "checked",
        title: "Onderzoek resultaten verwerkt"
      }],
      title: "Onderzoek naar geluidsoverlast"
    }, {
      id: "41ed3247-830e-408a-b2e0-5666a47a3631",
      marker: 3,
      title: "Uitvoeren van maatregelen"
    }, {
      id: "8ff216a2-9ccd-4ada-a1b2-00eb824b1e9b",
      marker: 4,
      title: "Maatregelen zijn uitgevoerd"
    }]} />*/
    /*
    <ProcessSteps.StepList>
      <ProcessSteps.Step checked={}>
        <ProcessSteps.StepSection>
          <ProcessSteps.StepHeader>
            <ProcessSteps.StepMarker>
              <div>1</div>
            </ProcessSteps.StepMarker>
            <ProcessSteps.StepHeading>


            </ProcessSteps.StepHeading>
            <ProcessSteps.StepExpandedIcon />
          </ProcessSteps.StepHeader>

        </ProcessSteps.StepSection>
      </ProcessSteps.Step>
      <ProcessSteps.Step>
        <ProcessSteps.StepSection>
          <ProcessSteps.StepHeader>
            <ProcessSteps.StepMarker>
              <div>2</div>
            </ProcessSteps.StepMarker>
            <ProcessSteps.StepHeading>
              {data["acceptWitnessEndDate"] ? (
                <DateValue dateTime={data["acceptWitnessEndDate"]} locale={locale} />
              ) : (
                ""
              )}{" "}
              <UtrechtBadgeStatus status="warning">regel het vóór deze datum</UtrechtBadgeStatus>
            </ProcessSteps.StepHeading>
            <ProcessSteps.StepExpandedIcon />
          </ProcessSteps.StepHeader>
          <div>
            <Paragraph>
              <Link href="/huwelijksplanner-step-invite-witness">
                Getuigen zijn definitief en bevestigingen van getuigen ontvangen
              </Link>
            </Paragraph>
          </div>
        </ProcessSteps.StepSection>
      </ProcessSteps.Step>
      <ProcessSteps.Step>
        <ProcessSteps.StepSection>
          <ProcessSteps.StepHeader>
            <ProcessSteps.StepMarker>3</ProcessSteps.StepMarker>
            <ProcessSteps.StepHeading>
              vóór{" "}
              {data["orderProductEndDate"] ? <DateValue dateTime={data["orderProductEndDate"]} locale={locale} /> : ""}
            </ProcessSteps.StepHeading>
          </ProcessSteps.StepHeader>
          {data.canOrderProducts ? (
            <div>
              <Paragraph>
                <Link href="/huwelijksplanner-step-products">Eventuele extra’s bestellen</Link>
                <UtrechtBadgeStatus status="neutral">niet verplicht</UtrechtBadgeStatus>
              </Paragraph>
            </div>
          ) : (
            ""
          )}
        </ProcessSteps.StepSection>
      </ProcessSteps.Step>
      <ProcessSteps.Step>
        <ProcessSteps.StepSection>
          <ProcessSteps.StepHeader>
            <ProcessSteps.StepMarker>4</ProcessSteps.StepMarker>
            <ProcessSteps.StepHeading>
              {data.reservation ? <DateValue dateTime={data.reservation["ceremony-start"]} locale={locale} /> : ""}
            </ProcessSteps.StepHeading>
          </ProcessSteps.StepHeader>
          {data.reservation && data.reservation["ceremony-location"] === "Locatie Stadskantoor" ? (
            <div>
              <Paragraph>
                Jullie gaan trouwen op de vierde verdieping van het{" "}
                <Link href="https://www.utrecht.nl/contact/stadskantoor">Stadskantoor Utrecht</Link>.
              </Paragraph>
            </div>
          ) : (
            ""
          )}
        </ProcessSteps.StepSection>
      </ProcessSteps.Step>
    </ProcessSteps.StepList>
    */
  );

  const PartnerDataList = ({ partner }: { partner: HuwelijksplannerPartner }) => (
    <DataList className="utrecht-data-list--grid">
      <DataListItem>
        <DataListKey>{t("form:name")}</DataListKey>
        <DataListValue>{partner.name}</DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListKey>{t("form:tel")}</DataListKey>
        <DataListValue>
          <NumberValue>{partner.tel}</NumberValue>
        </DataListValue>
        <DataListActions>
          <Link
            href="/huwelijksplanner-edit#tel"
            title={t("form:data-list-actions-edit-subject", { subject: t("form:tel") })}
          >
            {t("form:data-list-actions-edit")}
          </Link>
        </DataListActions>
      </DataListItem>
      <DataListItem>
        <DataListKey>{t("form:email")}</DataListKey>
        <DataListValue>
          <URLValue>{partner.email}</URLValue>
        </DataListValue>
        <DataListActions>
          <Link
            href="/huwelijksplanner-edit#email"
            title={t("form:data-list-actions-edit-subject", { subject: t("form:email") })}
          >
            {t("form:data-list-actions-edit")}
          </Link>
        </DataListActions>
      </DataListItem>
    </DataList>
  );

  const WitnessDataList = ({ witness }: { witness: Invitee; locale: string }) => (
    <DataList className="utrecht-data-list--grid">
      <DataListItem>
        <DataListKey>{t("form:name")}</DataListKey>
        <DataListValue>{witness.name}</DataListValue>
        <DataListActions>
          <Link
            href="/huwelijksplanner-witness-edit#name"
            title={t("form:data-list-actions-edit-subject", { subject: t("form:name") })}
          >
            {t("form:data-list-actions-edit")}
          </Link>
        </DataListActions>
      </DataListItem>
      <DataListItem>
        <DataListKey>{t("form:email")}</DataListKey>
        <DataListValue>
          <URLValue>{witness.email}</URLValue>
        </DataListValue>
        <DataListActions>
          <Link
            href="/huwelijksplanner-witness-edit#email"
            title={t("form:data-list-actions-edit-subject", { subject: t("form:email") })}
          >
            {t("form:data-list-actions-edit")}
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
        <DataListKey>{t("huwelijksplanner:ceremony-type")}</DataListKey>
        <DataListValue>{reservation["ceremony-type"]}</DataListValue>
        {data.cancelable ? (
          <DataListActions>
            <Link href="/huwelijksplanner-cancel">
              {t("huwelijksplanner:cancel-ceremony-link", { context: "eenvoudig-huwelijk" })}
            </Link>
          </DataListActions>
        ) : (
          ""
        )}
      </DataListItem>
      <DataListItem>
        <DataListKey>{t("huwelijksplanner:ceremony-date")}</DataListKey>
        <DataListValue>
          <DateValue dateTime={reservation["ceremony-start"]} locale={locale} />
        </DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListKey>{t("huwelijksplanner:ceremony-time")}</DataListKey>
        <DataListValue>
          <TimeValue dateTime={reservation["ceremony-start"]} locale={locale} />
          {" \u2013 "}
          <TimeValue dateTime={reservation["ceremony-end"]} locale={locale} />
        </DataListValue>
      </DataListItem>
      <DataListItem>
        <DataListKey>{t("huwelijksplanner:ceremony-location")}</DataListKey>
        <DataListValue>{reservation["ceremony-location"]}</DataListValue>
      </DataListItem>
    </DataList>
  );

  return (
    <Surface>
      <Document>
        <Head>
          <title>{`${t("huwelijksplanner-payment-success:title")} - ${t("common:website-name")}`}</title>
        </Head>
        <Page>
          <PageHeader>
            <PageHeaderTemplate />
          </PageHeader>
          <PageContent>
            <PageContentMain>
              <Heading1>Melding Voorgenomen Huwelijk</Heading1>
              <Paragraph>Stap 5 van 5 – Je huwelijksdatum is geregeld</Paragraph>
              <Alert type="ok">
                <HeadingGroup>
                  <Heading2>Betaling ontvangen</Heading2>
                  <PreHeading>Gelukt</PreHeading>
                </HeadingGroup>
              </Alert>
              <ReservationCard locale={locale} />
              <Paragraph>
                Jullie reservering is geslaagd en we hebben de melding van het voorgenomen huwelijk ontvangen.
              </Paragraph>
              <Paragraph>
                Je krijgt van ons een e-mail met daarin een link naar deze pagina. Zo kunnen jullie de gegevens later
                wijzigen of aanvullen.
              </Paragraph>
              <section>
                <Heading2>Nog te doen</Heading2>
                <MarriageProcessSteps data={data} locale={locale} />
              </section>
              <section>
                <Heading2>Dit hebben jullie doorgegeven</Heading2>
                {data.reservation ? (
                  <CeremonyDataList data={data} reservation={data.reservation} locale={locale} />
                ) : (
                  ""
                )}
                <section>
                  <Heading3>Partners</Heading3>
                  {data.partners.map((partner, index) => (
                    <PartnerDataList key={index} partner={partner} />
                  ))}
                </section>
                <section>
                  <Heading3>Getuigen</Heading3>
                  {data.witnesses.map((witness, index) => (
                    <WitnessDataList key={index} locale={locale} witness={witness} />
                  ))}
                </section>
              </section>
              <Aside>
                <Heading2>Deze pagina is automatisch bewaard</Heading2>
                <Paragraph>
                  We hebben een e-mail naar jullie gestuurd met daarin een link naar deze pagina. Je kunt veilig de
                  pagina verlaten.
                </Paragraph>
              </Aside>
            </PageContentMain>
          </PageContent>
          <PageFooter>
            <PageFooterTemplate />
          </PageFooter>
        </Page>
      </Document>
    </Surface>
  );
}
