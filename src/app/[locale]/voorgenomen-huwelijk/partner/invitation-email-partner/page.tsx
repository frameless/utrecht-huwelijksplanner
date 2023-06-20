// import { ButtonLink, Heading1 } from "@utrecht/component-library-react";
// import { UtrechtDigidButton, UtrechtIconArrow } from "@utrecht/web-component-library-react";
// import { NextPage } from "next";
// import Link from "next/link";

// // This is a temporarily page to show the email
// const InvitationEmailPartner: NextPage = () => {
//   return (
//     <div>
//       <Heading1>Eenvoudig trouwen</Heading1>
//       <Link passHref href="/login">
//         <UtrechtDigidButton>
//           <ButtonLink appearance="primary-action-button">
//             Inloggen met DigiD <UtrechtIconArrow />
//           </ButtonLink>
//         </UtrechtDigidButton>
//       </Link>
//     </div>
//   );
// };

// export default InvitationEmailPartner;

import { UtrechtDigidButton, UtrechtIconArrow } from "@utrecht/web-component-library-react";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {
  Address,
  ButtonLink,
  DataNoTranslate,
  Document,
  Email,
  Heading1,
  Page,
  PageContent,
  PageContentMain,
  Paragraph,
  URLValue,
  UtrechtLogo,
} from "../../../../../components";
import { exampleState } from "../../../../../data/huwelijksplanner-state";

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["huwelijksplanner-step-0", "common"])),
  },
});

export default function ApplicantEmail() {
  const { t } = useTranslation("huwelijksplanner-step-0");

  const partner = exampleState.partners[1];

  return (
    <Email>
      <Document>
        <Head>
          <title>{`Melding Voorgenomen Huwelijk - ${t("common:website-name")}`}</title>
        </Head>
        <Page>
          <PageContent>
            <PageContentMain>
              <Heading1>Melding Voorgenomen Huwelijk</Heading1>
              <Paragraph>
                Beste <DataNoTranslate>{partner["given-name"]}</DataNoTranslate>,
              </Paragraph>
              <Paragraph>
                Uw partner heeft u uitgenodigd om te loggen met DigiD. Zo bevestigt u met uw partner dat jullie het
                huwelijk willen regelen.
              </Paragraph>
              <UtrechtDigidButton>
                <ButtonLink appearance="primary-action-button" href="/login">
                  Inloggen met DigiD <UtrechtIconArrow />
                </ButtonLink>
              </UtrechtDigidButton>
              <Paragraph>Of kopieer het adres hieronder en open het in je browser:</Paragraph>
              <Paragraph>
                <URLValue>https://utrecht.nl/reservering</URLValue>
              </Paragraph>
              <Paragraph>Met vriendelijke groet,</Paragraph>
              <Address translate="no">
                Gemeente Utrecht
                <br />
                Publiekszaken
                <br />
                Burgerzaken
                <br />
                Stadsplateau 1, 3521 AZ Utrecht
              </Address>
              <Paragraph>
                <UtrechtLogo />
              </Paragraph>
            </PageContentMain>
          </PageContent>
        </Page>
      </Document>
    </Email>
  );
}
