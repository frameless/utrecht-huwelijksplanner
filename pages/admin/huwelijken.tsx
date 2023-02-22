import { Button } from "@utrecht/component-library-react";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import {
  ButtonGroup,
  Heading1,
  Page,
  PageContent,
  Paragraph,
  Table,
  TableBody,
  TableCell,
  TableHeaderCell,
  TableRow,
} from "../../src/components";
import type { Huwelijk } from "../../src/openapi/index";
import { HuwelijksplannerAPI } from "../../src/openapi/index";

const MarriageOverview: NextPage = () => {
  const [results, setResults] = useState<Huwelijk[]>([]);

  useEffect(() => {
    HuwelijksplannerAPI.getHuwelijken().then((data) => {
      setResults(data);
    });
  }, []);

  const deleteHuwelijk = (huwelijkData: Huwelijk) => {
    deleteHuwelijk(huwelijkData);
  };

  return (
    <Page>
      <PageContent>
        <div>
          <Heading1>Overzicht huwelijken</Heading1>
          {!(results?.length >= 1) && <Paragraph>Er zijn geen huwelijken in de database.</Paragraph>}
          {results?.length >= 1 && (
            <Table>
              <TableBody>
                {results.map((item) => (
                  <TableRow key={item.id}>
                    <TableHeaderCell>
                      <code>{item.id}</code>
                    </TableHeaderCell>
                    <TableCell>Bar</TableCell>
                    <TableCell>
                      <ButtonGroup>
                        <Button appearance="secondary-action-button" hint="danger" onClick={() => deleteHuwelijk(item)}>
                          Annuleer huwelijk
                        </Button>
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

export default MarriageOverview;
