import clsx from "clsx";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import "@utrecht/design-tokens/dist/index.css";
import "@utrecht/component-library-css/dist/index.css";
import "@utrecht/component-library-css/dist/html.css";
import { useEffect, useState } from "react";
import "../styles/globals.scss";
import "../styles/utrecht-theme.css";
import { MarriageOptionsContext } from "../src/context/MarriageOptionsContext";
import { HuwelijksplannerState, initialState } from "../src/data/huwelijksplanner-state";
import { matomo } from "../src/matomo";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [marriageOptions, setMarriageOptions] = useState<HuwelijksplannerState>(initialState);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_MATOMO_URL) {
      matomo({
        url: process.env.NEXT_PUBLIC_MATOMO_URL,
        siteId: process.env.NEXT_PUBLIC_MATOMO_SITE_ID,
      });
    }
  }, []);

  return (
    <div className={clsx("example-debugging-disabled", "utrecht-theme")}>
      <MarriageOptionsContext.Provider value={[marriageOptions, setMarriageOptions]}>
        <Component {...pageProps} />
      </MarriageOptionsContext.Provider>
    </div>
  );
};

export default appWithTranslation(MyApp);
