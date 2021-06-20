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
  Surface,
  UnorderedList,
  UnorderedListItem,
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
              <UnorderedList>
                <UnorderedListItem>
                  <Link href="/" target="huwelijksplanner">
                    Stap 0: Regel je huwelijk of geregistreerd partnerschap
                  </Link>{" "}
                  (
                  <Link
                    href="https://frameless.github.io/utrecht-huwelijksplanner-eend/"
                    target="huwelijksplanner-design"
                  >
                    design
                  </Link>
                  )
                </UnorderedListItem>
                <UnorderedListItem>
                  <Link href="/trouw-opties" target="huwelijksplanner">
                    Stap 1: Trouwen of geregistreerd partnerschap
                  </Link>{" "}
                  (
                  <Link
                    href="https://frameless.github.io/utrecht-huwelijksplanner-eend/01-trouwen-of-partnerschap.html"
                    target="huwelijksplanner-design"
                  >
                    design
                  </Link>
                  )
                </UnorderedListItem>
                <UnorderedListItem>
                  <Link href="/trouw-opties/huwelijk" target="huwelijksplanner">
                    Stap 2: Wanneer en hoe
                  </Link>{" "}
                  (
                  <Link
                    href="https://frameless.github.io/utrecht-huwelijksplanner-eend/02-filter-trouwen-plannen.html"
                    target="huwelijksplanner-design"
                  >
                    design
                  </Link>
                  )
                </UnorderedListItem>
                <UnorderedListItem>
                  <Link href="/voorgenomen-huwelijk" target="huwelijksplanner">
                    Stap 3: Controleren en inloggen met DigiD
                  </Link>{" "}
                  (
                  <Link
                    href="https://frameless.github.io/utrecht-huwelijksplanner-eend/03-inloggen-digid.html"
                    target="huwelijksplanner-design"
                  >
                    design
                  </Link>
                  )
                </UnorderedListItem>
                <UnorderedListItem>
                  <Link href="/voorgenomen-huwelijk/partner/uitnodigen" target="huwelijksplanner">
                    Stap 3: Nodig je partner uit (via e-mail)
                  </Link>{" "}
                  (
                  <Link
                    href="https://frameless.github.io/utrecht-huwelijksplanner-eend/05-vraag-sanne.html"
                    target="huwelijksplanner-design"
                  >
                    design
                  </Link>
                  )
                </UnorderedListItem>
                <UnorderedListItem>
                  <Link href="/voorgenomen-huwelijk/partner/succes" target="huwelijksplanner">
                    Stap 3: Wachten op partner na uitnodiging via e-mail
                  </Link>{" "}
                  (
                  <Link
                    href="https://frameless.github.io/utrecht-huwelijksplanner-eend/06-wacht-op-sanne.html"
                    target="huwelijksplanner-design"
                  >
                    design
                  </Link>
                  )
                </UnorderedListItem>
                <UnorderedListItem>
                  <Link href="/voorgenomen-huwelijk/partner/invitation-email-partner" target="huwelijksplanner">
                    Stap 3: Bekijk e-mail voor partner
                  </Link>
                </UnorderedListItem>
                <UnorderedListItem>
                  <Link href="/login" target="huwelijksplanner">
                    Inloggen met DigiD
                  </Link>{" "}
                  (
                  <Link
                    href="https://frameless.github.io/utrecht-huwelijksplanner-eend/03b-inloggen-digid.html"
                    target="huwelijksplanner-design"
                  >
                    design
                  </Link>
                  )
                </UnorderedListItem>
                <UnorderedListItem>
                  <Link href="/persoonsgegevens/EC4D6AEF-0E23-4686-8778-71D2C02D7A38" target="huwelijksplanner">
                    Stap 4: Aanvullen persoonsgegevens
                  </Link>{" "}
                  (
                  <Link
                    href="https://frameless.github.io/utrecht-huwelijksplanner-eend/04-melding-voorgenomen-huwelijk-anne.html"
                    target="huwelijksplanner-design"
                  >
                    design
                  </Link>
                  )
                </UnorderedListItem>
                <UnorderedListItem>
                  <Link href="/voorgenomen-huwelijk/partner" target="huwelijksplanner">
                    Stap 5: Nodig je partner uit
                  </Link>{" "}
                  (
                  <Link
                    href="https://frameless.github.io/utrecht-huwelijksplanner-eend/05a-vraag-sanne.html"
                    target="huwelijksplanner-design"
                  >
                    design
                  </Link>
                  )
                </UnorderedListItem>
                <UnorderedListItem>
                  <Link href="/persoonsgegevens/67EEFC1C-A28A-43E7-8950-76C289E905C7" target="huwelijksplanner">
                    Stap X: Gegevens controleren van partner
                  </Link>{" "}
                  (
                  <Link
                    href="https://frameless.github.io/utrecht-huwelijksplanner-eend/sanne-a-melding-voorgenomen-huwelijk.html"
                    target="huwelijksplanner-design"
                  >
                    design
                  </Link>
                  )
                </UnorderedListItem>
                <UnorderedListItem>
                  <Link href="/persoonsgegevens/succes" target="huwelijksplanner">
                    Stap X: Gegevens controleren van partner gelukt
                  </Link>{" "}
                  (
                  <Link
                    href="https://frameless.github.io/utrecht-huwelijksplanner-eend/sanne-a-klaar.html"
                    target="huwelijksplanner-design"
                  >
                    design
                  </Link>
                  )
                </UnorderedListItem>
                <UnorderedListItem>
                  <Link href="/voorgenomen-huwelijk/partner/aanvrager-email" target="huwelijksplanner">
                    Stap X: Bekijk e-mail voor aanvrager
                  </Link>
                </UnorderedListItem>
                <UnorderedListItem>
                  <Link href="/voorgenomen-huwelijk/getuigen" target="huwelijksplanner">
                    Stap 7a: Nodig je getuigen uit
                  </Link>{" "}
                  (
                  <Link
                    href="https://frameless.github.io/utrecht-huwelijksplanner-eend/07a-getuigen.html"
                    target="huwelijksplanner-design"
                  >
                    design
                  </Link>
                  )
                </UnorderedListItem>
                <UnorderedListItem>
                  <Link href="/voorgenomen-huwelijk/getuigen/succes" target="huwelijksplanner">
                    Stap 7a: Nodig je getuigen uit — Gelukt! - Gemeente Gaat Checken - Je kunt daarna betalen
                  </Link>{" "}
                  (
                  <Link
                    href="https://frameless.github.io/utrecht-huwelijksplanner-eend/07a-anne-en-sanne.html"
                    target="huwelijksplanner-design"
                  >
                    design
                  </Link>
                  )
                </UnorderedListItem>
                <UnorderedListItem>
                  <Link href="/voorgenomen-huwelijk/checken" target="huwelijksplanner">
                    Stap 8: Wij checken
                  </Link>{" "}
                  (
                  <Link
                    href="https://frameless.github.io/utrecht-huwelijksplanner-eend/08-check.html"
                    target="huwelijksplanner-design"
                  >
                    design
                  </Link>
                  )
                </UnorderedListItem>
                <UnorderedListItem>
                  <Link href="/voorgenomen-huwelijk/betalen" target="huwelijksplanner">
                    Stap 9: Betalen
                  </Link>{" "}
                  (
                  <Link
                    href="https://frameless.github.io/utrecht-huwelijksplanner-eend/09-betaal.html"
                    target="huwelijksplanner-design"
                  >
                    design
                  </Link>
                  )
                </UnorderedListItem>
                <UnorderedListItem>
                  <Link href="/voorgenomen-huwelijk/betalen/succes" target="huwelijksplanner">
                    Stap 10: Betaling geslaagd - Overzicht
                  </Link>{" "}
                  (
                  <Link
                    href="https://frameless.github.io/utrecht-huwelijksplanner-eend/10-betaling-geslaagd.html"
                    target="huwelijksplanner-design"
                  >
                    design
                  </Link>
                  )
                </UnorderedListItem>
                <UnorderedListItem>
                  <Link href="/extra" target="huwelijksplanner">
                    Stap 7c: Kies je extra's
                  </Link>{" "}
                  (
                  <Link
                    href="https://frameless.github.io/utrecht-huwelijksplanner-eend/07c-extra.html"
                    target="huwelijksplanner-design"
                  >
                    design
                  </Link>
                  )
                </UnorderedListItem>
                <UnorderedListItem>
                  <Link href="/email-reservation-success" target="huwelijksplanner">
                    E-mail aan alle partners: Melding voorgenomen huwelijk geslaagd
                  </Link>{" "}
                  (
                  <Link
                    href="https://frameless.github.io/utrecht-huwelijksplanner-eend/mail-ambtenaar.html"
                    target="huwelijksplanner-design"
                  >
                    design
                  </Link>
                  )
                </UnorderedListItem>
                <UnorderedListItem>
                  <Link href="/email-data-summary" target="huwelijksplanner">
                    E-mail aan de buitengewoon ambtenaar van de burgerlijke stand (BABS): Melding voorgenomen huwelijk
                    geslaagd
                  </Link>{" "}
                  (
                  <Link
                    href="https://frameless.github.io/utrecht-huwelijksplanner-eend/mail-echtpaar.html"
                    target="huwelijksplanner-design"
                  >
                    design
                  </Link>
                  )
                </UnorderedListItem>
                <UnorderedListItem>
                  <Link href="/huwelijksplanner-cancel" target="huwelijksplanner">
                    Huwelijk annuleren
                  </Link>
                </UnorderedListItem>
                <UnorderedListItem>
                  <Link href="/huwelijksplanner-cancelled" target="huwelijksplanner">
                    Feedback: Huwelijk geannuleerd
                  </Link>
                </UnorderedListItem>
                <UnorderedListItem>
                  <Link href="/huwelijksplanner-payment-success" target="huwelijksplanner">
                    Feedback: Betaling ontvangen
                  </Link>{" "}
                  (
                  <Link
                    href="https://frameless.github.io/utrecht-huwelijksplanner-eend/10-betaling-geslaagd.html"
                    target="huwelijksplanner-design"
                  >
                    design
                  </Link>
                  )
                </UnorderedListItem>
              </UnorderedList>
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
