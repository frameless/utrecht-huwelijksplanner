import { NextPage } from "next";
import { useEffect, useState } from "react";
import {
  ButtonGroup,
  ButtonLink,
  Heading1,
  Page,
  PageContent,
  Paragraph,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "../../src/components";
import type { Accomodation } from "../../src/openapi/index";
import { HuwelijksplannerAPI } from "../../src/openapi/index";

const AccomodationOverview: NextPage = () => {
  const [results, setResults] = useState<Accomodation[]>([]);

  useEffect(() => {
    HuwelijksplannerAPI.getAccommodations().then((data) => {
      setResults(data);
    });
  }, []);

  return (
    <Page>
      <PageContent>
        <div>
          <Heading1>Overzicht accomodaties</Heading1>
          {!(results?.length >= 1) && <Paragraph>Er zijn geen accomodaties in de database.</Paragraph>}
          {results?.length >= 1 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell scope="col">name</TableHeaderCell>
                  <TableHeaderCell scope="col">description</TableHeaderCell>
                  <TableHeaderCell scope="col"></TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((item) => (
                  <TableRow key={item.id}>
                    <TableHeaderCell scope="row">
                      <code>{item.name}</code>
                    </TableHeaderCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>
                      <ButtonGroup>
                        <ButtonLink href={`/admin/accomodatie/${item.id}`}>Bekijk accomodatie</ButtonLink>
                        <ButtonLink href={`/admin/products/${item.product}`}>Bekijk product</ButtonLink>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </PageContent>
    </Page>
  );
};

export default AccomodationOverview;
