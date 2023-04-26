import React, { useEffect, useState } from "react";
import { CeremonyType, RegistrationType } from "../data/huwelijksplanner-state";
import { SDGProduct, SdgproductService } from "../generated";
import { resolveEmbedded } from "../embedded";
import { ApiError } from "../openapi/core/ApiError";

export type CeremonyData = {
  type: CeremonyType;
  id: string;
  locationId: string;
  ambtenaarId: string;
};

const mapToCeremonyData = (products: SDGProduct): CeremonyData[] => {
  return products.gerelateerdeProducten.map((ceremony: SDGProduct) => ({
    id: ceremony.id as string,
    type: ceremony.upnLabel as CeremonyType,
    locationId: ceremony.gerelateerdeProducten[0].id,
    ambtenaarId: ceremony.gerelateerdeProducten[0].gerelateerdeProducten[0].id,
  }));
};

export const useSdgProductGetItem = (id: string | undefined)=> {
  const [data, setData] = useState<CeremonyData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError>();

  useEffect(() => {
    if (id == undefined) return;

    setLoading(true);
    SdgproductService.sdgproductGetItem({ id: id })
      .then(
        (response) => {
          const mappedResult = mapToCeremonyData(resolveEmbedded(response));
          setData(mappedResult);
        },
        (error) => {
          setError(error);
        }
      )
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return [data, loading, error] as const;
};
