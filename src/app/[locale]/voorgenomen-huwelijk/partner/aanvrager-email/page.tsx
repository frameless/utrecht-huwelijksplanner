import type { Metadata } from "next";
import {
  Address,
  ButtonGroup,
  ButtonLink,
  DataNoTranslate,
  Email,
  Heading1,
  Paragraph,
  URLValue,
  UtrechtLogo,
} from "../../../../../components";
import { exampleState } from "../../../../../data/huwelijksplanner-state";
import { useTranslation } from "../../../../i18n";

type Params = {
  params: {
    locale: string;
  };
};

export async function generateMetadata({ params: { locale } }: Params): Promise<Metadata> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(locale, "common");
  return {
    title: "Melding Voorgenomen Huwelijk", // Todo make a i18n json file for this page
  };
}

export default async function ApplicantEmail({ params: { locale } }: Params) {
  const { t } = await useTranslation(locale, ["common"]);

  const partner = exampleState.partners[0];

  return (
    <Email>
      <Heading1>Melding Voorgenomen Huwelijk</Heading1>
      <Paragraph>
        Beste <DataNoTranslate>{partner["given-name"]}</DataNoTranslate>,
      </Paragraph>
      <Paragraph>
        Uw partner heeft zojuist succesvol ingelogd met DigiD. Om door te gaan met uw huwelijksaanvraag, klikt u op de
        onderstaande knop:
      </Paragraph>
      <ButtonGroup>
        <ButtonLink appearance="primary-action-button" href="/voorgenomen-huwelijk/getuigen">
          Doorgaan huwelijksaanvraag
        </ButtonLink>
      </ButtonGroup>
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
    </Email>
  );
}
