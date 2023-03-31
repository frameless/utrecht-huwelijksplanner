import { Button, FormField, FormLabel, Textbox } from "@utrecht/component-library-react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { OpenAPI } from "../../src/generated/core/OpenAPI";
import { request as __request } from "../../src/generated/core/request";
import { authenticate, unauthenticate } from "../../src/services/authentication";

const GatewayLogin: NextPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const { push, query } = useRouter();
  const { redirectUrl } = query;

  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    setError(false);
    setIsLoading(true);

    unauthenticate();

    __request(OpenAPI, {
      method: "POST",
      url: "/users/login",
      body: data,
      mediaType: "application/json",
    })
      .then((res: any) => {
        authenticate(res.jwtToken);

        push(redirectUrl as string);

        setIsLoading(false);
      })
      .catch(() => {
        setError(true), setIsLoading(false);
      });
  };

  return (
    <div className="example-login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField>
          <p className="utrecht-form-field__label">
            <FormLabel htmlFor="username">Email</FormLabel>
          </p>
          <Textbox
            disabled={isLoading}
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
            disabled={isLoading}
            className="utrecht-form-field__input"
            id="password"
            type="password"
            {...register("password", { required: true })}
          />
        </FormField>

        <Button disabled={isLoading} type="submit">
          {isLoading ? "Loading..." : "Submit"}
        </Button>

        {error && <span className="example-error">Something went wrong.</span>}
      </form>
    </div>
  );
};

export default GatewayLogin;
