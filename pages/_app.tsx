import clsx from "clsx";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import "@utrecht/design-tokens/dist/index.css";
import "@utrecht/component-library-css/dist/index.css";
import "@utrecht/component-library-css/dist/html.css";
import { useEffect } from "react";
import { matomo } from "../src/matomo";
import "../styles/globals.scss";
import "../styles/utrecht-theme.css";

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
      <Component {...pageProps} />
    </div>
  );
};

export default appWithTranslation(MyApp);
