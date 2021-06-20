import { NextPage } from "next";
import { Heading1, Link, Page, PageContent, UnorderedList, UnorderedListItem } from "../../src/components";

const AccomodationOverview: NextPage = () => {
  return (
    <Page>
      <PageContent>
        <Heading1>Beheer</Heading1>
        <UnorderedList>
          <UnorderedListItem>
            <Link href="/admin/huwelijken">Overzicht huwelijken</Link>
          </UnorderedListItem>
          <UnorderedListItem>
            <Link href="/admin/accomodations">Overzicht accomodaties</Link>
          </UnorderedListItem>
          <UnorderedListItem>
            <Link href="/admin/assents">Overzicht assents</Link>
          </UnorderedListItem>
          <UnorderedListItem>
            <Link href="/admin/producten">Overzicht producten</Link>
          </UnorderedListItem>
          <UnorderedListItem>
            <Link href="/admin/klanten">Overzicht klanten</Link>
          </UnorderedListItem>
        </UnorderedList>
      </PageContent>
    </Page>
  );
};

export default AccomodationOverview;
