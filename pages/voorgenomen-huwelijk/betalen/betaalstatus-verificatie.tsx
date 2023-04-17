import { useContext, useEffect, useState } from "react";
import { HuwelijkService, MollieService } from "../../../src/generated";
import { MarriageOptionsContext } from "../../../src/context/MarriageOptionsContext";
import { useRouter } from "next/router";

const Betalen = () => {
  const {push} = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [marriageOptions] = useContext(MarriageOptionsContext);

  useEffect(() => {
    HuwelijkService.huwelijkGetItem(marriageOptions.huwelijk.id);

    push("/voorgenomen-huwelijk/betalen/succes")
  }, []);

  if (isLoading) return <>Verifying payment, please wait...</>;

  return <>Redirecting, please wait...</>;
};

export default Betalen;
