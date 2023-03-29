import { Button, FormField, FormLabel, Textbox } from "@utrecht/component-library-react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { OpenAPI } from "../../src/generated/core/OpenAPI";
import { request as __request } from "../../src/generated/core/request";

const GatewayLogin: NextPage = () => {
  const { push } = useRouter();

  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    __request(OpenAPI, {
      method: "POST",
      url: "/users/login",
      body: data,
      mediaType: "application/json",
    }).then((res) => console.log({res}));
  };

  return (
    <div className="gateway-login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField>
          <p className="utrecht-form-field__label">
            <FormLabel htmlFor="username">Email</FormLabel>
          </p>
          <Textbox
            className="utrecht-form-field__input"
            id="username"
            type="email"
            {...register("username", { required: true })}
          />
        </FormField>

        <FormField>
          <p className="utrecht-form-field__label">
            <FormLabel htmlFor="password">Password</FormLabel>
          </p>
          <Textbox
            className="utrecht-form-field__input"
            id="password"
            type="password"
            {...register("password", { required: true })}
          />
        </FormField>

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default GatewayLogin;