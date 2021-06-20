import { NextPage } from "next";
import { useEffect, useState } from "react";
import {
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
  UnorderedList,
  UnorderedListItem,
  URLValue,
} from "../../src/components";
import { HuwelijksplannerAPI } from "../../src/openapi/index";
import type { Product } from "../../src/openapi/index";

const ProductOverview: NextPage = () => {
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    HuwelijksplannerAPI.getProducten().then((data) => {
      setResults(data);
    });
  }, [42]);

  return (
    <Page>
      <PageContent>
        <style>{`tr:target { background-color: papayawhip; }`}</style>
        <div>
          <Heading1>Overzicht producten</Heading1>
          {!(results?.length >= 1) && <Paragraph>Er zijn geen producten in de database.</Paragraph>}
          {results?.length >= 1 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell scope="col">id</TableHeaderCell>
                  <TableHeaderCell scope="col">label</TableHeaderCell>
                  <TableHeaderCell scope="col">bevoegde organisatie</TableHeaderCell>
                  <TableHeaderCell scope="col">verantwoordelijke organisatie</TableHeaderCell>
                  <TableHeaderCell scope="col">aantal locaties</TableHeaderCell>
                  <TableHeaderCell scope="col">aantal gerelateerde producten</TableHeaderCell>
                  <TableHeaderCell scope="col">gerelateerde producten</TableHeaderCell>
                  <TableHeaderCell scope="col">Universele Productnaam</TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((item) => (
                  <TableRow key={item.uuid} id={item.uuid} tabIndex={-1}>
                    <TableHeaderCell>
                      <code>{item.uuid}</code>
                    </TableHeaderCell>
                    <TableCell>
                      <Link href={item.upnUri} target="_blank">
                        {item.upnLabel}
                      </Link>
                    </TableCell>
                    <TableCell>
                      {item.bevoegdeOrganisatie && (
                        <>
                          <Link href={item.bevoegdeOrganisatie.owmsIdentifier} external target="_blank">
                            {item.bevoegdeOrganisatie.owmsPrefLabel}
                          </Link>{" "}
                          <Link href={`#${item.uuid}`}>#</Link>
                        </>
                      )}
                    </TableCell>
                    <TableCell>
                      {item.verantwoordelijkeOrganisatie && (
                        <Link href={item.verantwoordelijkeOrganisatie.owmsIdentifier} external target="_blank">
                          {item.verantwoordelijkeOrganisatie.owmsPrefLabel}
                        </Link>
                      )}
                    </TableCell>
                    <TableCell>{item.locaties ? item.locaties.length : 0}</TableCell>
                    <TableCell>{item.gerelateerdeProducten ? item.gerelateerdeProducten.length : 0}</TableCell>
                    <TableCell>
                      {item.gerelateerdeProducten && (
                        <UnorderedList>
                          {item.gerelateerdeProducten.map((item) => (
                            <UnorderedListItem key={item.uuid}>
                              <Link href={item.upnUri} external target="_blank">
                                {item.upnLabel}
                              </Link>{" "}
                              <Link href={`#${item.uuid}`}>#</Link>
                            </UnorderedListItem>
                          ))}
                        </UnorderedList>
                      )}
                    </TableCell>
                    <TableCell>
                      {item.upnUri && (
                        <Link href={item.upnUri} external target="_blank">
                          {item.upnLabel || <URLValue>{item.upnUri}</URLValue>}
                        </Link>
                      )}
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

export default ProductOverview;
