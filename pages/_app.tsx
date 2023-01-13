import clsx from "clsx";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import "@utrecht/design-tokens/dist/index.css";
import "@utrecht/component-library-css/dist/index.css";
import "@utrecht/component-library-css/dist/html.css";

import "../styles/globals.scss";
import "../styles/utrecht-theme.css";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <div className={clsx("example-debugging-disabled", "utrecht-theme", "utrecht-theme--media-query-color-scheme")}>
    <Component {...pageProps} />
  </div>
);

export default appWithTranslation(MyApp);
