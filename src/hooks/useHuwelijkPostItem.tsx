import { useEffect, useRef, useState } from "react";
import { HuwelijkWithId, Reservation } from "../data/huwelijksplanner-state";
import { resolveEmbedded } from "../embedded";
import { HuwelijkService } from "../generated";
import { ApiError } from "../openapi/core/ApiError";

export const useHuwelijkPostItem = (reservation?: Reservation, ambtenaar?: string, productId?: string) => {
  const [data, setData] = useState<HuwelijkWithId>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError>();
  const lastId = useRef<string>();

  useEffect(() => {
    if (loading || !reservation || lastId.current === reservation["ceremony-id"]) return;

    setLoading(true);
    lastId.current = reservation["ceremony-id"];

    const postBody = {
      requestBody: {
        type: productId,
        ceremonie: reservation["ceremony-id"],
        moment: reservation["ceremony-start"],
        ambtenaar: ambtenaar,
        locatie: reservation["ceremony-location"],
      },
    };

    HuwelijkService.huwelijkPostItem(postBody)
      .then(
        (response) => {
          setData(resolveEmbedded(response) as HuwelijkWithId);
        },
        (error) => {
          setError(error);
        }
      )
      .finally(() => {
        setLoading(false);
      });
  }, [ambtenaar, loading, productId, reservation]);

  return [data, loading, error] as const;
};
