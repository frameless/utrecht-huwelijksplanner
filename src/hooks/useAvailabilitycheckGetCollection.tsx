import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { CeremonyData } from "./useSdgProductGetItem";
import { AvailabilitycheckService } from "../generated";
import { ApiError } from "../openapi/core/ApiError";

export type AvailabilitySlot = {
  resources: string[];
  start: string;
  stop: string;
};

export type Availabilities = {
  [key: string]: Array<AvailabilitySlot>;
};

export type AvailabilitycheckGetCollectionInput = {
  ceremonyData: CeremonyData[];
  interval: string;
  stop: Date;
  start: Date;
};

const dateFormat = "yyyy-MM-dd";

export const useAvailabilitycheckGetCollection = (input: AvailabilitycheckGetCollectionInput) => {
  const [data, setData] = useState<Availabilities>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError>();

  useEffect(() => {
    if (input.ceremonyData.length === 0) return;

    setLoading(true);
    AvailabilitycheckService.availabilitycheckGetCollection({
      resourcesCould: input.ceremonyData.map((ceremony) => ceremony.id),
      interval: input.interval,
      start: format(input.start, dateFormat),
      stop: format(input.stop, dateFormat),
    })
      .then(
        (response) => {
          const availabilityResults: Availabilities = response as any;
          setData(availabilityResults);
        },
        (error) => {
          setError(error);
        }
      )
      .finally(() => {
        setLoading(false);
      });
  }, [input.ceremonyData, input.start.toISOString()]);

  return [data, loading, error] as const;
};
