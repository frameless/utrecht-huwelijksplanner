import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import Skeleton from "react-loading-skeleton";
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
    ).then((res) => {
      // @ts-ignore
      const json = JSON.parse(res);

      const path = new URL(json.redirectUrl).pathname;
      push(path);
    });


  };

  if (isLoading) return <Skeleton height="200px" />;

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
