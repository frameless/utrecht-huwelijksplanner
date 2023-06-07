import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

const Betalen: NextPage = () => {
  return (
    <Link
      href="/voorgenomen-huwelijk/betalen/succes"
      style={{
        backgroundColor: "#fbfbfb",
        textAlign: "center",
        height: "100%",
        width: "100%",
        position: "absolute",
      }}
    >
      <Image
        src="/img/ideal-scherm.png"
        alt=""
        width={870}
        height={1205}
        style={{
          boxShadow: "0 0 6px 0 rgba(0,0,0,0.16)",
        }}
      />
    </Link>
  );
};

export default Betalen;
