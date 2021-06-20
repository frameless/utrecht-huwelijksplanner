import { Button } from "@utrecht/component-library-react";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { FormEvent } from "react";
import { ButtonGroup, DataNoTranslate } from "../../src/components";
import { exampleState } from "../../src/data/huwelijksplanner-state";

const BlogPost: NextPage = () => {
  const { push } = useRouter();
  const onLoginPartnerSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const partnerId = ((event.nativeEvent as any).submitter as HTMLButtonElement)?.value;

    if (partnerId) {
      push(`/persoonsgegevens/${partnerId}`);
    }
  };

  // const onPartnerLoginClick = (event: any) => {};

  return (
    <div
      style={{
        backgroundColor: "#fbfbfb",
        textAlign: "center",
        height: "100%",
        width: "100%",
        position: "absolute",
      }}
    >
      <form onSubmit={onLoginPartnerSubmit} style={{ display: "flex", justifyContent: "center", paddingBlock: "20px" }}>
        <ButtonGroup>
          {exampleState.partners.map(({ id, name }, index) => (
            <Button key={id} value={id} type="submit" appearance="primary-action-button">
              Inloggen als <DataNoTranslate>{name}</DataNoTranslate> (partner {index + 1})
            </Button>
          ))}
        </ButtonGroup>
      </form>
      <Image
        src="/img/digid.png"
        alt=""
        width={862 / 2}
        height={1396 / 2}
        style={{
          boxShadow: "0 0 6px 0 rgba(0,0,0,0.16)",
        }}
      />
    </div>
  );
};

export default BlogPost;
