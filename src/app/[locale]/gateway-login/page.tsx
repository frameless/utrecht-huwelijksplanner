import { Button, FormField, FormLabel, Textbox } from "@utrecht/component-library-react";
import { redirect } from "next/navigation";
import { IngeschrevenpersoonService, OpenAPI } from "../../../generated";
import { request as __request } from "../../../generated/core/request";
import { authenticate, getBsnFromJWT, unauthenticate } from "../../../openapi/authentication";

const GatewayLogin = async ({ params: { locale }, searchParams }: any) => {
  const onLoginSubmit = async (formData: FormData) => {
    "use server";
    unauthenticate();

    const email = formData.get("email");
    const password = formData.get("password");

    const body = {
      username: email,
      password,
    };

    if (email && email !== null && password && password !== null) {
      const res: any = await __request(OpenAPI, {
        method: "POST",
        url: "/users/login",
        body,
        mediaType: "application/json",
      });
      authenticate(res?.jwtToken);
      const JWT = getBsnFromJWT();
      const response = await IngeschrevenpersoonService.ingeschrevenpersoonGetCollection({
        burgerservicenummer: JWT as string,
      });

      redirect(`/persoonsgegevens/${(response.results[0] as any)._id}`);
    }
  };

  // TODO align if there is a `assentId` param
  // TODO Find a nice way to validate the form inputs
  return (
    <div className="example-login">
      <form action={onLoginSubmit}>
        <FormField>
          <p className="utrecht-form-field__label">
            <FormLabel htmlFor="username">Email</FormLabel>
          </p>
          <Textbox
            // disabled={isLoading}
            className="utrecht-form-field__input"
            id="username"
            type="email"
            name="email"
            autoComplete="email"
            // {...register("username", { required: true })}
          />
        </FormField>

        <FormField>
          <p className="utrecht-form-field__label">
            <FormLabel htmlFor="password">Password</FormLabel>
          </p>
          <Textbox
            // disabled={isLoading}

            className="utrecht-form-field__input"
            id="password"
            name="password"
            type="password"
            autoComplete="password"
            // {...register("password", { required: true })}
          />
        </FormField>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default GatewayLogin;
