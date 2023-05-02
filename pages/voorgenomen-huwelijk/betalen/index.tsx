import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { MarriageOptionsContext } from "../../../src/context/MarriageOptionsContext";
import { MollieService } from "../../../src/generated";

const Betalen: NextPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { push } = useRouter();

  const [marriageOptions] = useContext(MarriageOptionsContext);

  const handleBetalenClick = () => {
    setIsLoading(true);

    MollieService.mollieGetCollection(
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      marriageOptions.huwelijk.id
    ).then((res: any) => {
      const path = new URL(res.redirectUrl).pathname;

      push(`${path}?paymentId=${res.paymentId}`);
    });
  };

  if (isLoading) return <>Redirecting to payment provider...</>;

  return (
    <Image
      onClick={handleBetalenClick}
      src="/img/ideal-scherm.png"
      alt=""
      width={870}
      height={1205}
      style={{
        boxShadow: "0 0 6px 0 rgba(0,0,0,0.16)",
      }}
    />
  );
};

export default Betalen;
