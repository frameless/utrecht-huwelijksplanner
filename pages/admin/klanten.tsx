import { NextPage } from "next";
import { useEffect, useState } from "react";
import {
  DataNoTranslate,
  Heading1,
  Link,
  NumberValue,
  Page,
  PageContent,
  Paragraph,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  URLValue,
} from "../../src/components";
import { HuwelijksplannerAPI } from "../../src/openapi/index";
import type { Klant } from "../../src/openapi/index";

const normalizeWhitespace = (str: string): string => str.trim().replace(/^\s\s+/, " ");

const formatNaam = (item: Klant) =>
  normalizeWhitespace(`${item.voornaam || ""} ${item.voorvoegselAchternaam || ""} ${item.achternaam || ""}`);

interface Adres {
  huisletter?: string;
  huisnummer?: number | string | null;
  huisnummertoevoeging?: string;
  postcode?: string;
  straatnaam?: string;
  woonplaatsnaam?: string;
}

const formatAdres = (adres: Adres) =>
  normalizeWhitespace(`${adres.straatnaam || ""} ${adres.huisnummer || ""}${adres.huisletter || ""}${
    adres.huisnummertoevoeging || ""
  }
${adres.postcode || ""} ${adres.woonplaatsnaam || ""}`);

const KlantOverview: NextPage = () => {
  const [results, setResults] = useState<Klant[]>([]);

  useEffect(() => {
    HuwelijksplannerAPI.getKlanten().then((data) => {
      setResults(data);
    });
  }, [42]);

  return (
    <Page>
      <PageContent>
        <style>{`tr:target { background-color: papayawhip; }`}</style>
        <div>
          <Heading1>Overzicht klanten</Heading1>
          {!(results?.length >= 1) && <Paragraph>Er zijn geen producten in de database.</Paragraph>}
          {results?.length >= 1 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell scope="col">id</TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((item) => (
                  <TableRow key={item.url} id={item.url} tabIndex={-1}>
                    <TableHeaderCell>
                      <code>{item.url}</code>
                    </TableHeaderCell>
                    <TableCell>
                      <Link href={item.url} target="_blank">
                        <DataNoTranslate>{formatNaam(item)}</DataNoTranslate>
                      </Link>
                    </TableCell>
                    <TableCell style={{ whiteSpace: "pre-line" }}>
                      {item.adressen?.map((adres, index) => (
                        <div key={index}>
                          <DataNoTranslate>{formatAdres(adres)}</DataNoTranslate>
                        </div>
                      ))}
                    </TableCell>
                    <TableCell>
                      {item.emails?.map((email) => (
                        <div key={email.email}>
                          <URLValue>{email.email}</URLValue>
                        </div>
                      ))}
                    </TableCell>
                    <TableCell>
                      {item.telefoonnummers?.map((item) => (
                        <div key={item.telefoonnummer}>
                          <NumberValue>{item.telefoonnummer}</NumberValue>
                        </div>
                      ))}
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

export default KlantOverview;
