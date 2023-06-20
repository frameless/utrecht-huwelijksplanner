import { Button } from "@utrecht/component-library-react";
import Image from "next/image";
import { login } from "./actions";
import digidImage from "../../../../public/img/digid.png";
import { ButtonGroup, DataNoTranslate } from "../../../components";
import { exampleState } from "../../../data/huwelijksplanner-state";

const BlogPost = async () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
      <form action={login} style={{ display: "flex", justifyContent: "center", paddingBlock: "20px" }}>
        <ButtonGroup>
          {exampleState.partners.map(({ id, name }, index) => (
            <Button key={id} value={id} type="submit" appearance="primary-action-button" name="partnerId">
              Inloggen als <DataNoTranslate>{name}</DataNoTranslate> (partner {index + 1})
            </Button>
          ))}
        </ButtonGroup>
      </form>

      <Image
        alt="DigiD image"
        src={digidImage}
        width={862 / 2}
        height={1396 / 2}
        sizes="100vw"
        style={{
          boxShadow: "0 0 6px 0 rgba(0,0,0,0.16)",
        }}
      />
    </div>
  );
};

export default BlogPost;
