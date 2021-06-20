import { Button } from "@utrecht/component-library-react";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import {
  ButtonGroup,
  Heading1,
  Link,
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
import type { Assent } from "../../src/openapi/index";
import { HuwelijksplannerAPI } from "../../src/openapi/index";

const AssentOverview: NextPage = () => {
  const [results, setResults] = useState<Assent[]>([]);
  const [deleteBusy, setDeleteBusy] = useState(false);

  useEffect(() => {
    HuwelijksplannerAPI.getAssents().then((data) => {
      setResults(data);
    });
  }, [42]);

  const deleteAssentAction = (assent: Assent) => {
    setDeleteBusy(true);
    HuwelijksplannerAPI.deleteAssent(assent).then(
      () => {
        setDeleteBusy(false);
      },
      () => {
        setDeleteBusy(false);
      }
    );
  };

  return (
    <Page>
      <PageContent>
        <div>
          <Heading1>
            Overzicht <i lang="en">assents</i>
          </Heading1>
          {!(results?.length >= 1) && (
            <Paragraph>
              Er zijn geen <i lang="en">assents</i> in de database.
            </Paragraph>
          )}
          {results?.length >= 1 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell scope="col">id</TableHeaderCell>
                  <TableHeaderCell scope="col">description</TableHeaderCell>
                  <TableHeaderCell scope="col">status</TableHeaderCell>
                  <TableHeaderCell scope="col">actions</TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((item) => (
                  <TableRow key={item.id}>
                    <TableHeaderCell scope="row">
                      <Link href={`/admin/assents/${item.id}`}>
                        <code>{item.id}</code>
                      </Link>
                    </TableHeaderCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell>
                      <ButtonGroup>
                        <Button
                          type="submit"
                          appearance="subtle-button"
                          hint="danger"
                          aria-label={`Delete ${item.id}`}
                          onClick={() => deleteAssentAction(item)}
                          busy={deleteBusy}
                          disabled={deleteBusy}
                        >
                          Delete
                        </Button>
                        <Button
                          type="submit"
                          appearance="primary-action-button"
                          aria-label={`Accept ${item.id}`}
                          onClick={() => HuwelijksplannerAPI.grantAssent(item)}
                        >
                          Accept
                        </Button>
                        <Button
                          type="submit"
                          appearance="secondary-action-button"
                          aria-label={`Decline ${item.id}`}
                          onClick={() => HuwelijksplannerAPI.declineAssent(item)}
                        >
                          Decline
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

export default AssentOverview;
