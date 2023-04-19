import clsx from "clsx";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import "@utrecht/design-tokens/dist/index.css";
import "@utrecht/component-library-css/dist/index.css";
import "@utrecht/component-library-css/dist/html.css";
import "../styles/globals.scss";
import "../styles/utrecht-theme.css";
import { useEffect } from "react";
import { MarriageOptionsProvider } from "../src/context/MarriageOptionsContext";
import { matomo } from "../src/matomo";

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_MATOMO_URL) {
      matomo({
        url: process.env.NEXT_PUBLIC_MATOMO_URL,
        siteId: process.env.NEXT_PUBLIC_MATOMO_SITE_ID,
      });
    }
  }, []);

  return (
    <div className={clsx("example-debugging-disabled", "utrecht-theme", "utrecht-theme--media-query-color-scheme")}>
      <MarriageOptionsProvider>
        <Component {...pageProps} />
      </MarriageOptionsProvider>
    </div>
  );
};

export default appWithTranslation(MyApp);
