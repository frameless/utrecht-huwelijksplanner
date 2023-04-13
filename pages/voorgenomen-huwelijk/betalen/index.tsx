import { NextPage } from "next";
import Image from "next/image";
import { useContext } from "react";
import { MarriageOptionsContext } from "../../../src/context/MarriageOptionsContext";
import { MollieService } from "../../../src/generated";

const Betalen: NextPage = () => {
  const [marriageOptions] = useContext(MarriageOptionsContext);

  const handlePaymentClick = () => {
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
    // eslint-disable-next-line no-console
    ).then((res) => console.log({ res }));
  };

  return (
    <Image
      onClick={handlePaymentClick}
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
