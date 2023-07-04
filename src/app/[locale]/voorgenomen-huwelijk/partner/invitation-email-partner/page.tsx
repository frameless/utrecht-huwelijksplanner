import type { Metadata } from "next";
import {
  Address,
  ButtonLink,
  DataNoTranslate,
  Email,
  Heading1,
  Paragraph,
  URLValue,
  UtrechtDigidButton,
  UtrechtIconArrow,
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
  const { t } = await useTranslation(locale, "huwelijksplanner-cancel");
  return {
    title: `Melding Voorgenomen Huwelijk`, // Todo make an i18n json file for this page
  };
}

export default async function ApplicantEmail({ params: { locale } }: Params) {
  const { t } = await useTranslation(locale, ["huwelijksplanner-step-0"]);

  const partner = exampleState.partners[1];

  return (
    <Email>
      <Heading1>Melding Voorgenomen Huwelijk</Heading1>
      <Paragraph>
        Beste <DataNoTranslate>{partner["given-name"]}</DataNoTranslate>,
      </Paragraph>
      <Paragraph>
        Uw partner heeft u uitgenodigd om te loggen met DigiD. Zo bevestigt u met uw partner dat jullie het huwelijk
        willen regelen.
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
    </Email>
  );
}
