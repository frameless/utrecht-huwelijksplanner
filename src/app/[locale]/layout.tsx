import clsx from "clsx";
import "../../styles/globals.scss";
import "../../styles/utrecht-theme.css";
import "@utrecht/component-library-css";
import "@utrecht/design-tokens/dist/index.css";
import { Metadata } from "next";
import {
  Document,
  Page,
  PageContent,
  PageContentMain,
  PageFooter,
  PageHeader,
  SkipLink,
  Surface,
} from "../../components";
import { PageFooterTemplate } from "../../components/huwelijksplanner/PageFooterTemplate";
import { PageHeaderTemplate } from "../../components/huwelijksplanner/PageHeaderTemplate";
import { MarriageOptionsProvider } from "../../context/MarriageOptionsContext";
import { useTranslation } from "../i18n";
import { defaultNS } from "../i18n/settings";

type Params = {
  params: {
    locale: string;
  };
};

export async function generateMetadata({ params: { locale } }: Params): Promise<Metadata> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(locale, defaultNS);
  return {
    title: {
      template: `%s | ${t("website-name")}`,
      default: `${t("website-name")}`,
    },
  };
}
interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export default async function RootLayout({ children, params: { locale } }: RootLayoutProps) {
  const { t } = await useTranslation(locale, defaultNS);
  return (
    <html lang="en">
      <body className={clsx("example-debugging-disabled", "utrecht-theme")}>
        <Surface>
          <Document>
            <Surface>
              <SkipLink href="#main">{t("common:skip-link-main")}</SkipLink>
              <Page>
                <PageHeader style={{ paddingInline: 0 }}>
                  <PageHeaderTemplate />
                </PageHeader>
                <PageContent>
                  <PageContentMain>
                    <MarriageOptionsProvider>{children}</MarriageOptionsProvider>
                  </PageContentMain>
                </PageContent>
                <PageFooter>
                  <div className="todo-page-footer__content">
                    <PageFooterTemplate />
                  </div>
                </PageFooter>
              </Page>
            </Surface>
          </Document>
        </Surface>
      </body>
    </html>
  );
}
