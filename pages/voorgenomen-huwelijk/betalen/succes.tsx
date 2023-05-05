/* eslint-disable no-alert */

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
  Page,
  PageContent,
  PageContentMain,
  PageFooter,
  PageHeader,
  Paragraph,
  PreHeading,
  ReservationCard,
  Surface,
  Textbox,
  TimeValue,
  URLValue,
} from "../../../src/components";
import { PageFooterTemplate } from "../../../src/components/huwelijksplanner/PageFooterTemplate";
import { PageHeaderTemplate } from "../../../src/components/huwelijksplanner/PageHeaderTemplate";
import { MarriageOptionsContext } from "../../../src/context/MarriageOptionsContext";
import { HuwelijksplannerPartner, Invitee } from "../../../src/data/huwelijksplanner-state";
import { Assent, AssentService, Huwelijk, HuwelijkService } from "../../../src/generated";

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["huwelijksplanner-step-0", "huwelijksplanner", "form", "common"])),
  },
});

export default function HuwelijksplannerStep0() {
  const { t } = useTranslation(["huwelijksplanner-step-0", "huwelijksplanner", "form", "common"]);
  const locale = useRouter().locale || "en";

  const [huwelijk, setHuwelijk] = useState<Huwelijk | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [todos, setTodos] = useState<any[]>([]);

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

  useEffect(() => {
    if (!huwelijk) return;

    const {
      // @ts-ignore
      embedded: {
        checklist: { embedded: items },
      },
    } = huwelijk;

    setTodos(Object.values(items).filter((item: any) => !item.result));
  }, [huwelijk]);

  const handleVoorgenomenHuwelijkMelden = () => {
    HuwelijkService.huwelijkPatchItem(marriageOptions.huwelijk.id, { melding: true }).then(() => {
      // melding is nu true
    });
  };

  // const isValidMinWitnesses = (data: HuwelijksplannerState) => {
  //   // Return `true` for valid when every partner has reached the minimum amount of witnesses
  //   return data.witnesses.length >= data.minWitnessPerPartner * 2;
  // };

  const handleHuwelijkAnnuleren = () => {
    const confirmHuwelijkAnnuleren = confirm("Are you sure you want to cancel the ceremony?");

    if (confirmHuwelijkAnnuleren) {
      setIsLoading(true);

      HuwelijkService.huwelijkPatchItem(marriageOptions.huwelijk.id, { status: Huwelijk.status.CANCELLED })
        .then((res) => setHuwelijk(res))
        .finally(() => setIsLoading(false));
    }
  };

  // const MarriageProcessSteps = ({ data }: { data: HuwelijksplannerState; locale: string }) => (
  //   <ProcessSteps
  //     steps={[
  //       {
  //         id: "cc18f54d-aadd-498f-b518-2fc74ce8e9b6",
  //         marker: 1,
  //         status: isValidMinWitnesses(data) ? "checked" : undefined,
  //         title: "Getuigen wijzigen of meer getuigen uitnodigen",
  //         meta: data.canInviteWitnesses ? (
  //           <div>
  //             <Paragraph>
  //               tussen vandaag en{" "}
  //               {data["inviteWitnessEndDate"] ? (
  //                 <DateValue dateTime={marriageOptions.date ?? ""} locale={locale} />
  //               ) : (
  //                 ""
  //               )}{" "}
  //               <UtrechtBadgeStatus status="neutral">niet verplicht</UtrechtBadgeStatus>
  //             </Paragraph>
  //           </div>
  //         ) : (
  //           ""
  //         ),
  //         // steps: [
  //         //   {
  //         //     id: "dc18f54d-aadd-498f-b518-2fc74ce8e9b6",
  //         //     status: undefined,
  //         //     title: `tussen vandaag en ${data["inviteWitnessEndDate"]}`,
  //         //   },
  //         // ],
  //       },
  //       {
  //         id: "12ca94b2-7179-4ae8-9032-dad49c294ff2",
  //         marker: 2,
  //         title: "Getuigen zijn definitief en bevestigingen van getuigen ontvangen",
  //       },
  //       {
  //         id: "e51f2b4c-d62f-4347-8dc1-c83a9be0afc2",
  //         marker: 3,
  //         title: "Eventuele extra’s bestellen",
  //       },
  //       {
  //         id: "1fc162c6-f1ab-4d1b-9007-d891cbd5614b",
  //         title: "Trouwdag",
  //         marker: 4,
  //         date: data.reservation
  //           ? ((<DateValue dateTime={marriageOptions.huwelijk["ceremony-start"]} locale={locale} />) as any)
  //           : "",
  //         meta:
  //           data.reservation && data.reservation["ceremony-location"] === "Locatie Stadskantoor" ? (
  //             <Paragraph>Jullie gaan trouwen op de vierde verdieping van het Stadskantoor Utrecht.</Paragraph>
  //           ) : (
  //             ""
  //           ),
  //       },
  //     ]}
  //   />
  // );

  const PartnerDataList = ({ partner }: { partner: HuwelijksplannerPartner }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [phoneNumber, setPhoneNumber] = useState<string | undefined>(partner.tel);
    const [email, setEmail] = useState<string | undefined>(partner.email);

    const handleUpdateEmail = () => {
      setIsLoading(true);
      AssentService.assentPatchItem(
        partner.id as string,
        { contact: { emails: [{ naam: email, email: email }] } } as any
      ).finally(() => setIsLoading(false));
    };

    const handleUpdatePhoneNumber = () => {
      setIsLoading(true);
      AssentService.assentPatchItem(
        partner.id as string,
        { contact: { telefoonnummers: [{ naam: phoneNumber, telefoonnummer: phoneNumber }] } } as any
      ).finally(() => setIsLoading(false));
    };

    return (
      <DataList className="utrecht-data-list--grid">
        <DataListItem>
          <DataListKey>{t("form:name")}</DataListKey>
          <DataListValue>{partner.name}</DataListValue>
        </DataListItem>
        <DataListItem>
          <DataListKey>{t("form:tel")}</DataListKey>
          <DataListValue>
            <Textbox value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          </DataListValue>
          <DataListActions>
            <Button disabled={isLoading || !phoneNumber} onClick={handleUpdatePhoneNumber}>
              Update phone number
            </Button>
          </DataListActions>
        </DataListItem>
        <DataListItem>
          <DataListKey>{t("form:email")}</DataListKey>
          <DataListValue>
            <Textbox value={email} onChange={(e) => setEmail(e.target.value)} />
          </DataListValue>
          <DataListActions>
            <Button disabled={isLoading || !email} onClick={handleUpdateEmail}>
              Update email
            </Button>
          </DataListActions>
        </DataListItem>
      </DataList>
    );
  };

  const WitnessDataList = ({ witness }: { witness: Invitee; locale: string }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [name, setName] = useState<string>(witness.name);
    const [email, setEmail] = useState<string>(witness.email);

    const handleNameChange = () => {
      setIsLoading(true);

      // @ts-ignore
      AssentService.assentPatchItem(witness.id, {
        contact: { voornaam: name },
      } as Assent).finally(() => setIsLoading(false));
    };

    const handleEmailChange = () => {
      setIsLoading(true);

      // @ts-ignore
      AssentService.assentPatchItem(witness.id, {
        contact: {
          emails: [{ naam: email, email: email }],
        },
      } as Assent).finally(() => setIsLoading(false));
    };

    const removeWitness = () => {
      setIsLoading(true);

      // @ts-ignore
      AssentService.assentPatchItem(witness.id, {
        huwelijk: null,
      } as Assent)
        .then(() =>
          HuwelijkService.huwelijkGetItem(marriageOptions.huwelijk.id).then((res) => {
            setHuwelijk(res);
          })
        )
        .finally(() => setIsLoading(false));
    };

    return (
      <DataList className="utrecht-data-list--grid">
        <DataListItem>
          <DataListKey>{t("form:name")}</DataListKey>
          <DataListValue>
            <Textbox value={name} onChange={(e) => setName(e.target.value)} />
          </DataListValue>
          <DataListActions>
            <Button disabled={isLoading || !name} onClick={handleNameChange}>
              Update name
            </Button>
            <Button disabled={isLoading} onClick={removeWitness}>
              Remove
            </Button>
          </DataListActions>
        </DataListItem>
        <DataListItem>
          <DataListKey>{t("form:email")}</DataListKey>
          <DataListValue>
            <URLValue>
              <Textbox value={email} onChange={(e) => setEmail(e.target.value)} />
            </URLValue>
          </DataListValue>
          <DataListActions>
            <Button disabled={isLoading || !email} onClick={handleEmailChange}>
              Update email
            </Button>
          </DataListActions>
        </DataListItem>
      </DataList>
    );
  };

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
                  {huwelijk.status === Huwelijk.status.CANCELLED && (
                    <Alert type="error">
                      <HeadingGroup>
                        <Heading2>This ceremony has been cancelled.</Heading2>
                      </HeadingGroup>
                    </Alert>
                  )}

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
                    <ul>
                      {todos.map((todo, idx) => (
                        <li key={idx}>{todo.display}</li>
                      ))}
                    </ul>
                    {/* <MarriageProcessSteps data={data} locale={locale} /> */}
                  </section>

                  <section>
                    <Heading2>Dit hebben jullie doorgegeven</Heading2>
                    <DataList className="utrecht-data-list--grid">
                      <DataListItem>
                        <DataListKey>{t("huwelijksplanner:ceremony-type")}</DataListKey>
                        <DataListValue>{marriageOptions.huwelijk["ceremony-type"]}</DataListValue>
                        {huwelijk.status !== Huwelijk.status.CANCELLED && (
                          <DataListActions>
                            <Button disabled={isLoading} onClick={handleHuwelijkAnnuleren}>
                              {!isLoading ? "Cancel ceremony" : "Loading..."}
                            </Button>
                          </DataListActions>
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
                            id: partner._self.id,
                            name: `${partner?.embedded?.contact?.voornaam} ${partner?.embedded?.contact?.achternaam}`,
                            tel: partner?.embedded?.contact?.embedded?.telefoonnummers?.length
                              ? partner?.embedded?.contact?.embedded?.telefoonnummers[0]?.telefoonnummer
                              : "",
                            email: partner?.embedded?.contact?.embedded?.emails?.length
                              ? partner?.embedded?.contact?.embedded?.emails[0]?.email
                              : "",
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
                            // @ts-ignore
                            id: getuige?._self.id,
                            name: getuige?.embedded?.contact?.voornaam,
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
                </>
              )}

              <Button onClick={handleVoorgenomenHuwelijkMelden}>Voorgenomen huwelijk melden</Button>

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
