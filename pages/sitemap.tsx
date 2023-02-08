import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import {
  Document,
  Heading1,
  Link,
  Page,
  PageContent,
  PageContentMain,
  PageFooter,
  PageHeader,
  ProcessSteps,
  Surface,
} from "../src/components";
import { PageFooterTemplate } from "../src/components/huwelijksplanner/PageFooterTemplate";
import { PageHeaderTemplate } from "../src/components/huwelijksplanner/PageHeaderTemplate";

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["huwelijksplanner-step-0", "common"])),
  },
});

export default function HuwelijksplannerStep0() {
  const { t } = useTranslation("huwelijksplanner-step-0");

  return (
    <Surface>
      <Document>
        <Head>
          <title>{`${t("huwelijksplanner-step-0:title")} - ${t("common:website-name")}`}</title>
        </Head>
        <Page>
          <PageHeader>
            <PageHeaderTemplate />
          </PageHeader>
          <PageContent>
            <PageContentMain>
              <Heading1>Huwelijksplanner sitemap voor development</Heading1>
              <ProcessSteps
                collapsible={false}
                steps={[
                  {
                    id: "eb18814b-eb1e-4295-866c-145f632f1c2d",
                    marker: " ",
                    status: "checked",
                    title: (
                      <Link href="/">Digitaal loket: Regel je huwelijk of geregistreerd partnerschap</Link>
                    ) as any,
                    meta: (
                      <Link
                        href="https://frameless.github.io/utrecht-huwelijksplanner-eend/"
                        target="huwelijksplanner-design"
                      >
                        design
                      </Link>
                    ),
                  },
                  {
                    id: "cd6ac94e-76a0-4862-a523-895f8dc2f87b",
                    marker: "1",
                    status: "current",
                    title: (<Link href="/trouw-opties">Stap 1: Kies wat je wil</Link>) as any,
                    meta: (
                      <Link
                        href="https://frameless.github.io/utrecht-huwelijksplanner-eend/01-trouwen-of-partnerschap.html"
                        target="huwelijksplanner-design"
                      >
                        design
                      </Link>
                    ),
                  },
                  {
                    id: "72ebd58e-f5f4-46eb-8ff8-79bcf245eca8",
                    marker: "2",
                    title: (<Link href="/trouw-opties/huwelijk">Stap 2: Kies datum en tijd</Link>) as any,
                    meta: (
                      <Link
                        href="https://frameless.github.io/utrecht-huwelijksplanner-eend/02-filter-trouwen-plannen.html"
                        target="huwelijksplanner-design"
                      >
                        design
                      </Link>
                    ),
                  },
                  {
                    id: "3ef8876f-1ad8-44b4-a5f0-ce118c54f209",
                    marker: "3",
                    title: "Stap 3: Inloggen en gegevens controleren",
                    meta: (
                      <Link
                        href="https://frameless.github.io/utrecht-huwelijksplanner-eend/03-inloggen-digid.html"
                        target="huwelijksplanner-design"
                      >
                        design
                      </Link>
                    ),
                    steps: [
                      {
                        id: "3ef8876f-1ad8-44b4-a5f0-ce118c54f210",
                        title: (<Link href="/voorgenomen-huwelijk">Call to action: Inloggen</Link>) as any,
                        meta: (
                          <Link
                            href="https://frameless.github.io/utrecht-huwelijksplanner-eend/03-inloggen-digid.html"
                            target="huwelijksplanner-design"
                          >
                            design
                          </Link>
                        ),
                      },
                      {
                        id: "3ef8876f-1ad8-44b4-a5f0-ce118c54f309",
                        title: (
                          <Link
                            href="/login"
                            aria-label="Stap 4: Inloggen en gegevens controleren — Inloggen met DigiD"
                          >
                            Inloggen met DigiD
                          </Link>
                        ) as any,
                        meta: (
                          <Link
                            href="https://frameless.github.io/utrecht-huwelijksplanner-eend/03b-inloggen-digid.html"
                            target="huwelijksplanner-design"
                          >
                            design
                          </Link>
                        ),
                      },
                      {
                        id: "3ef8876f-1ad8-44b4-a5f0-ce118c55f209",
                        title: (
                          <Link href="/persoonsgegevens/EC4D6AEF-0E23-4686-8778-71D2C02D7A38">
                            Aanvullen persoonsgegevens
                          </Link>
                        ) as any,
                        meta: (
                          <Link
                            href="https://frameless.github.io/utrecht-huwelijksplanner-eend/04-melding-voorgenomen-huwelijk-anne.html"
                            target="huwelijksplanner-design"
                          >
                            design
                          </Link>
                        ),
                      },
                    ],
                  },
                  {
                    id: "cadfeb8d-0408-4efb-8c16-425c7e45eb47",
                    marker: "4",
                    title: "Stap 4: Partner gaat inloggen en gegevens controleren",
                    // (
                    //   <Link href="/voorgenomen-huwelijk/partner/uitnodigen">
                    //     Stap 4: Partner gaat inloggen en gegevens controleren
                    //   </Link>
                    // ) as any,
                    meta: (
                      <Link
                        href="https://frameless.github.io/utrecht-huwelijksplanner-eend/05-vraag-sanne.html"
                        target="huwelijksplanner-design"
                      >
                        design
                      </Link>
                    ),
                    steps: [
                      {
                        id: "cadfeb8d-0408-5efb-8c16-425c7e45eb47",
                        title: (
                          <>
                            {"Partner logt in op zelfde device: "}
                            <Link
                              href="/voorgenomen-huwelijk/partner"
                              aria-label="Stap 4: Inloggen en gegevens controleren — Nodig je partner uit"
                            >
                              Partner inloggen met DigiD
                            </Link>
                          </>
                        ) as any,
                        meta: (
                          <Link
                            href="https://frameless.github.io/utrecht-huwelijksplanner-eend/05a-vraag-sanne.html"
                            target="huwelijksplanner-design"
                          >
                            design
                          </Link>
                        ),
                      },
                      {
                        id: "cbdfeb8d-0408-4efb-8c16-425c7e45eb47",

                        title: (
                          <>
                            {"Alternatief: "}
                            <Link
                              href="/voorgenomen-huwelijk/partner/uitnodigen"
                              aria-label=" Stap 4: Partner gaat inloggen en gegevens controleren — uitnodigen"
                            >
                              Partner uitnodigen
                            </Link>
                          </>
                        ) as any,
                        meta: (
                          <Link
                            href="https://frameless.github.io/utrecht-huwelijksplanner-eend/05-vraag-sanne.html"
                            target="huwelijksplanner-design"
                          >
                            design
                          </Link>
                        ),
                      },
                      {
                        id: "cadfeb8d-0408-4efb-8c16-425c7e66eb47",

                        title: (
                          <>
                            Partner krijgt e-mail:{" "}
                            <Link
                              href="/voorgenomen-huwelijk/partner/invitation-email-partner"
                              aria-label="Stap 4: Inloggen en gegevens controleren — Bekijk e-mail voor partner"
                            >
                              Bekijk e-mail voor partner
                            </Link>
                          </>
                        ) as any,
                      },

                      {
                        id: "cadfeb8d-0408-4aab-8c16-425c7e45eb47",

                        title: (
                          <Link
                            href="/voorgenomen-huwelijk/partner/succes"
                            aria-label="Stap 4: Partner gaat inloggen en gegevens controleren — wachten op bevestiging"
                          >
                            Wachten op bevestiging van partner
                          </Link>
                        ) as any,
                        meta: (
                          <Link
                            href="https://frameless.github.io/utrecht-huwelijksplanner-eend/06-wacht-op-sanne.html"
                            target="huwelijksplanner-design"
                          >
                            design
                          </Link>
                        ),
                      },
                      {
                        id: "cadaeb8d-0408-4efb-8c16-425c7e45eb47",

                        title: (
                          <Link
                            href="/persoonsgegevens/67EEFC1C-A28A-43E7-8950-76C289E905C7"
                            aria-label="Stap 4: Inloggen en gegevens controleren — Gegevens controleren van partner"
                          >
                            Gegevens controleren van partner
                          </Link>
                        ) as any,
                        meta: (
                          <Link
                            href="https://frameless.github.io/utrecht-huwelijksplanner-eend/sanne-a-melding-voorgenomen-huwelijk.html"
                            target="huwelijksplanner-design"
                          >
                            design
                          </Link>
                        ),
                      },
                      {
                        id: "cadfeb4d-0408-4efb-8c16-425c7e45eb47",

                        title: (
                          <Link
                            href="/persoonsgegevens/succes"
                            aria-label="Stap 4: Inloggen en gegevens controleren — Gegevens controleren van partner gelukt"
                          >
                            Gegevens controleren van partner gelukt
                          </Link>
                        ) as any,
                        meta: (
                          <Link
                            href="https://frameless.github.io/utrecht-huwelijksplanner-eend/sanne-a-klaar.html"
                            target="huwelijksplanner-design"
                          >
                            design
                          </Link>
                        ),
                      },
                      {
                        id: "cadfeb8d-0608-4efb-8c16-425c7e45eb47",

                        title: (
                          <>
                            Uitnodiger krijgt e-mail als partner heeft bevestigd:{" "}
                            <Link
                              href="/voorgenomen-huwelijk/partner/aanvrager-email"
                              aria-label="Stap 4: Inloggen en gegevens controleren — Bekijk e-mail voor aanvrager"
                            >
                              Bekijk e-mail voor aanvrager
                            </Link>
                          </>
                        ) as any,
                      },
                    ],
                  },
                  {
                    id: "8ffdfe08-cce4-47d4-9e09-66003be91b63",
                    marker: "5",
                    title: (<Link href="/voorgenomen-huwelijk/getuigen">Stap 5: Getuigen uitnodigen</Link>) as any,
                    meta: (
                      <Link
                        href="https://frameless.github.io/utrecht-huwelijksplanner-eend/07a-getuigen.html"
                        target="huwelijksplanner-design"
                      >
                        design
                      </Link>
                    ),
                    steps: [
                      {
                        id: "8fadfe08-cce4-47d4-9e09-66003be91b63",

                        title: (
                          <Link href="/voorgenomen-huwelijk/getuigen/succes">
                            Gelukt! - Gemeente Gaat Checken - Je kunt daarna betalen
                          </Link>
                        ) as any,
                        meta: (
                          <Link
                            href="https://frameless.github.io/utrecht-huwelijksplanner-eend/07a-anne-en-sanne.html"
                            target="huwelijksplanner-design"
                          >
                            design
                          </Link>
                        ),
                      },
                    ],
                  },
                  {
                    id: "38d590d4-563d-4e5e-b822-d2eb598014c3",
                    marker: "6",
                    title: (
                      <Link href="/voorgenomen-huwelijk/checken">Stap 6: Gemeente Utrecht controleert</Link>
                    ) as any,
                    meta: (
                      <Link
                        href="https://frameless.github.io/utrecht-huwelijksplanner-eend/08-check.html"
                        target="huwelijksplanner-design"
                      >
                        design
                      </Link>
                    ),
                  },
                  {
                    id: "580e1369-ab6b-4fb0-bee8-73a5f3ecebd3",
                    marker: "7",
                    // <Link href="/voorgenomen-huwelijk/betalen">
                    title:
                      //   Stap 7: Betalen
                      // </Link>
                      "Stap 7: Betalen" as any,
                    meta: (
                      <Link
                        href="https://frameless.github.io/utrecht-huwelijksplanner-eend/09-betaal.html"
                        target="huwelijksplanner-design"
                      >
                        design
                      </Link>
                    ),
                    steps: [
                      {
                        id: "480e1369-ab6b-4fb0-bee8-73a5f3ecebd3",

                        title: (
                          <>
                            {"Call to action: "}
                            <Link href="/voorgenomen-huwelijk/checken">Ga betalen</Link>
                            {" (bij bevestiging Stap 6)"}
                          </>
                        ) as any,
                        meta: (
                          <Link
                            href="https://frameless.github.io/utrecht-huwelijksplanner-eend/08-check.html"
                            target="huwelijksplanner-design"
                          >
                            design
                          </Link>
                        ),
                      },
                      {
                        id: "580e1379-ab6b-4fb0-bee8-73a5f3ecebd3",

                        title: (<Link href="/voorgenomen-huwelijk/betalen">Betalen — iDEAL</Link>) as any,
                        meta: (
                          <Link
                            href="https://frameless.github.io/utrecht-huwelijksplanner-eend/09-betaal.html"
                            target="huwelijksplanner-design"
                          >
                            design
                          </Link>
                        ),
                      },
                      {
                        id: "580e1269-ab6b-4fb0-bee8-73a5f3ecebd3",

                        title: (
                          <>
                            {"Feedback: "}
                            <Link href="/voorgenomen-huwelijk/betalen/succes">
                              na Stap 7: Je datum is geregeld! — Betaling geslaagd - Overzicht
                            </Link>
                          </>
                        ) as any,
                        meta: (
                          <Link
                            href="https://frameless.github.io/utrecht-huwelijksplanner-eend/10-betaling-geslaagd.html"
                            target="huwelijksplanner-design"
                          >
                            design
                          </Link>
                        ),
                      },
                      {
                        id: "580e1369-bb6b-4fb0-bee8-73a5f3ecebd3",

                        title: (
                          <Link href="/voorgenomen-huwelijk/betalen/succes">
                            na Stap 7: Je datum is geregeld! — Betaling geslaagd - Overzicht
                          </Link>
                        ) as any,
                        meta: (
                          <Link
                            href="https://frameless.github.io/utrecht-huwelijksplanner-eend/10-betaling-geslaagd.html"
                            target="huwelijksplanner-design"
                          >
                            design
                          </Link>
                        ),
                      },
                      {
                        id: "580e1369-abeb-4fb0-bee8-73a5f3ecebd3",

                        title: (
                          <Link href="/email-reservation-success">
                            E-mail aan alle partners: Melding voorgenomen huwelijk geslaagd
                          </Link>
                        ) as any,
                        meta: (
                          <Link
                            href="https://frameless.github.io/utrecht-huwelijksplanner-eend/mail-ambtenaar.html"
                            target="huwelijksplanner-design"
                          >
                            design
                          </Link>
                        ),
                      },
                      {
                        id: "591e1369-ab6b-4fb0-bee8-73a5f3ecebd3",

                        title: (
                          <Link href="/email-data-summary">
                            E-mail aan de buitengewoon ambtenaar van de burgerlijke stand (BABS): Melding voorgenomen
                            huwelijk geslaagd
                          </Link>
                        ) as any,
                        meta: (
                          <Link
                            href="https://frameless.github.io/utrecht-huwelijksplanner-eend/mail-echtpaar.html"
                            target="huwelijksplanner-design"
                          >
                            design
                          </Link>
                        ),
                      },
                    ],
                  },
                  {
                    id: "21e36a43-2927-4c28-b650-4fa0bf293e9e",
                    marker: " ",
                    title: (<Link href="/voorgenomen-huwelijk/betalen/succes">Trouwdatum is geregeld</Link>) as any,
                    meta: (
                      <Link
                        href="https://frameless.github.io/utrecht-huwelijksplanner-eend/07c-extra.html"
                        target="huwelijksplanner-design"
                      >
                        design
                      </Link>
                    ),
                  },
                  {
                    id: "84e45eb2-418c-4a15-9f6a-37bde0b78be5",
                    marker: "8",
                    title: (<Link href="/extra">Stap 8: Kies je extra's</Link>) as any,
                    meta: (
                      <Link
                        href="https://frameless.github.io/utrecht-huwelijksplanner-eend/07c-extra.html"
                        target="huwelijksplanner-design"
                      >
                        design
                      </Link>
                    ),
                  },
                  {
                    id: "415d2c3b-26da-4cfd-a225-2107ac84c6bc",
                    marker: " ",
                    title: (<Link href="/huwelijksplanner-cancel">Huwelijk annuleren</Link>) as any,
                    status: "warning",
                    steps: [
                      {
                        id: "615d2c3b-26da-4cfd-a225-2107ac84c6bc",

                        title: (<Link href="/huwelijksplanner-cancelled">Feedback: Huwelijk geannuleerd</Link>) as any,
                        status: "error",
                      },
                    ],
                  },
                ]}
              ></ProcessSteps>
            </PageContentMain>
          </PageContent>
          <PageFooter>
            <div className="todo-page-footer__content">
              <PageFooterTemplate />
            </div>
          </PageFooter>
        </Page>
      </Document>
    </Surface>
  );
}
