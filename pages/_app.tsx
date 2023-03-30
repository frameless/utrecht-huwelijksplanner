import clsx from "clsx";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import "@utrecht/design-tokens/dist/index.css";
import "@utrecht/component-library-css/dist/index.css";
import "@utrecht/component-library-css/dist/html.css";
import "../styles/globals.scss";
import "../styles/utrecht-theme.css";
import { useState } from "react";
import { MarriageOptionsProps, MarriageOptionsProvider } from "../src/context/marriageOptions";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [marriageOptions, setMarriageOptions] = useState<MarriageOptionsProps>({});

  return (
    <div className={clsx("example-debugging-disabled", "utrecht-theme", "utrecht-theme--media-query-color-scheme")}>
      <MarriageOptionsProvider value={[marriageOptions, setMarriageOptions]}>
        <Component {...pageProps} />
      </MarriageOptionsProvider>
    </div>
  );
};

export default appWithTranslation(MyApp);
