/* eslint-disable no-console */
import { UtrechtBadgeStatus } from "@utrecht/web-component-library-react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useContext, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import {
  Alert,
  Aside,
  Button,
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
import { MarriageOptionsContext } from "../../../src/context/MarriageOptionsContext";
import {
  exampleState,
  HuwelijksplannerPartner,
  HuwelijksplannerState,
  Invitee,
} from "../../../src/data/huwelijksplanner-state";
import { Huwelijk, HuwelijkService } from "../../../src/generated";

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["huwelijksplanner-step-0", "huwelijksplanner", "form", "common"])),
  },
});

export default function HuwelijksplannerStep0() {
  const { t } = useTranslation(["huwelijksplanner-step-0", "huwelijksplanner", "form", "common"]);
  const [data] = useState({ ...exampleState });
  const locale = useRouter().locale || "en";

  const [huwelijk, setHuwelijk] = useState<Huwelijk | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [marriageOptions] = useContext(MarriageOptionsContext);

  useEffect(() => {
    if (huwelijk) return;

    setIsLoading(true);

    HuwelijkService.huwelijkGetItem(marriageOptions.huwelijk.id)
      .then((res) => {
        setIsLoading(true);
        setHuwelijk(res);
      })
      .finally(() => setIsLoading(false));
  }, [huwelijk, marriageOptions.huwelijk?.id]);

  const isValidMinWitnesses = (data: HuwelijksplannerState) => {
    // Return `true` for valid when every partner has reached the minimum amount of witnesses
    return data.witnesses.length >= data.minWitnessPerPartner * 2;
  };

  const handleVoorgenomenHuwelijkBevesitigen = () => {
    HuwelijkService.huwelijkPatchItem(marriageOptions.huwelijk.id, {
      // @ts-ignore
      melding: true,
    })
  }

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
                  <DateValue dateTime={marriageOptions.date ?? ""} locale={locale} />
                ) : (
                  ""
                )}{" "}
                <UtrechtBadgeStatus status="neutral">niet verplicht</UtrechtBadgeStatus>
              </Paragraph>
            </div>
          ) : (
            ""
          ),
          // steps: [
          //   {
          //     id: "dc18f54d-aadd-498f-b518-2fc74ce8e9b6",
          //     status: undefined,
          //     title: `tussen vandaag en ${data["inviteWitnessEndDate"]}`,
          //   },
          // ],
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
            ? ((<DateValue dateTime={marriageOptions.huwelijk["ceremony-start"]} locale={locale} />) as any)
            : "",
          meta:
            data.reservation && data.reservation["ceremony-location"] === "Locatie Stadskantoor" ? (
              <Paragraph>Jullie gaan trouwen op de vierde verdieping van het Stadskantoor Utrecht.</Paragraph>
            ) : (
              ""
            ),
        },
      ]}
    />
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
          <NumberValue>-</NumberValue>
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
          <URLValue>-</URLValue>
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

              {huwelijk && (
                <>
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
                    Je krijgt van ons een e-mail met daarin een link naar deze pagina. Zo kunnen jullie de gegevens
                    later wijzigen of aanvullen.
                  </Paragraph>
                  <section>
                    <Heading2>Nog te doen</Heading2>
                    <MarriageProcessSteps data={data} locale={locale} />
                  </section>

                  <section>
                    <Heading2>Dit hebben jullie doorgegeven</Heading2>
                    <DataList className="utrecht-data-list--grid">
                      <DataListItem>
                        <DataListKey>{t("huwelijksplanner:ceremony-type")}</DataListKey>
                        <DataListValue>{marriageOptions.huwelijk["ceremony-type"]}</DataListValue>
                        {data.cancelable ? (
                          <DataListActions>
                            <Link href="#">
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
                          <DateValue dateTime={marriageOptions.huwelijk["ceremony-start"]} locale={locale} />
                        </DataListValue>
                      </DataListItem>
                      <DataListItem>
                        <DataListKey>{t("huwelijksplanner:ceremony-time")}</DataListKey>
                        <DataListValue>
                          <TimeValue dateTime={marriageOptions.huwelijk["ceremony-start"]} locale={locale} />
                          {" \u2013 "}
                          <TimeValue dateTime={marriageOptions.huwelijk["ceremony-end"]} locale={locale} />
                        </DataListValue>
                      </DataListItem>
                      <DataListItem>
                        <DataListKey>{t("huwelijksplanner:ceremony-location")}</DataListKey>
                        <DataListValue>{marriageOptions.huwelijk["ceremony-location"]}</DataListValue>
                      </DataListItem>
                    </DataList>
                    <section>
                      <Heading3>Partners</Heading3>
                      {/* @ts-ignore */}
                      {huwelijk.embedded?.partners?.map((partner, index) => (
                        <PartnerDataList
                          key={index}
                          partner={{
                            name: `${partner?.embedded?.contact?.voornaam} ${partner?.embedded?.contact?.achternaam}`,
                          }}
                        />
                      ))}
                    </section>

                    <section>
                      <Heading3>Getuigen</Heading3>
                      {/* @ts-ignore */}
                      {huwelijk.embedded?.getuigen?.map((getuige, index) => (
                        <WitnessDataList
                          key={index}
                          locale={locale}
                          witness={{
                            name: getuige?.embedded?.contact?.embedded?.emails[0]?.naam,
                            email: getuige?.embedded?.contact?.embedded?.emails[0]?.email,
                          }}
                        />
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

                  <Heading2>Melding voorgenomen huwelijk afronden</Heading2>
                  <Button onClick={handleVoorgenomenHuwelijkBevesitigen} appearance="primary-action-button">
                    Voorgenomen huwelijk bevestigen
                  </Button>
                </>
              )}

              {!huwelijk && isLoading && <Skeleton height="300px" />}
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
