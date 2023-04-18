import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MollieService } from "../../../src/generated";

const Betalen = () => {
  const { push, query } = useRouter();
  const { paymentId } = query;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!paymentId) return;

    setIsLoading(true);

    MollieService.mollieGetItem(paymentId as string).then((res) => {
      if (res.status === "paid") {
        setIsLoading(false);
        setTimeout(() => push("/voorgenomen-huwelijk/betalen/succes"), 2000);
      }
    });
  }, [paymentId, push]);

  if (isLoading) return <>Verifying payment, please wait...</>;

  return <>Payment succesful, redirecting, please wait...</>;
};

export default Betalen;
