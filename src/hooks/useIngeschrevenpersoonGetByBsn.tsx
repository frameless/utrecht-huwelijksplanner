import { useEffect, useState } from "react";
import { resolveEmbedded } from "../embedded";
import { IngeschrevenPersoon, IngeschrevenpersoonService } from "../generated";
import { ApiError } from "../openapi/core/ApiError";

export const useIngeschrevenpersoonGetByBsn = (bsn: string) => {
  const [data, setData] = useState<IngeschrevenPersoon>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError>();

  useEffect(() => {
    if (!bsn || bsn.length === 0) return;

    setLoading(true);

    IngeschrevenpersoonService.ingeschrevenpersoonGetCollection({ burgerservicenummer: bsn })
      .then(
        (response) => {
          setData(resolveEmbedded(response.results[0]));
        },
        (error) => {
          setError(error);
        }
      )
      .finally(() => {
        setLoading(false);
      });
  }, [bsn]);

  return [data, loading, error] as const;
};
