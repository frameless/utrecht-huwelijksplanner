import React, { useEffect, useState } from "react";
import { CeremonyType, RegistrationType } from "../data/huwelijksplanner-state";
import {AvailabilitycheckService, SDGProduct, SdgproductService} from "../generated";
import { resolveEmbedded } from "../embedded";
import { ApiError } from "../openapi/core/ApiError";
import {CeremonyData} from "./useSdgProductGetItem";
import {format} from "date-fns";
import _ from "lodash";

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
}

const dateFormat = "yyyy-MM-dd";

export const useAvailabilitycheckGetCollection = (input: AvailabilitycheckGetCollectionInput) => {
  const [data, setData] = useState<Availabilities>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError>();

  useEffect(() => {
    if(input.ceremonyData.length == 0)
      return;

    console.log(input)

    setLoading(true);
    AvailabilitycheckService.availabilitycheckGetCollection({
      resourcesCould: input.ceremonyData.map((ceremony) => ceremony.id),
      interval: input.interval,
      start: format(input.start, dateFormat),
      stop: format(input.stop, dateFormat),})
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
