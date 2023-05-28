import { useEffect, useState } from "react";
import { resolveEmbedded } from "../embedded";
import { SDGProduct, SdgproductService } from "../generated";
import { ApiError } from "../openapi/core/ApiError";

export const useSdgProductGetCollection = (productType: string) => {
  const [data, setData] = useState<SDGProduct>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError>();

  useEffect(() => {
    if (!productType) {
      return;
    }

    setLoading(true);
    SdgproductService.sdgproductGetCollection({
      upnLabel: productType,
    })
      .then(
        (response) => {
          const result = resolveEmbedded(response.results[0]);
          setData(result);
        },
        (error) => {
          setError(error);
        }
      )
      .finally(() => {
        setLoading(false);
      });
  }, [productType]);

  return [data, loading, error] as const;
};
