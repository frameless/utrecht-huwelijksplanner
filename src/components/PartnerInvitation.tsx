import {
  Button,
  Fieldset,
  FieldsetLegend,
  FormField,
  FormLabel,
  Heading2,
  Paragraph,
  Textbox,
} from "@utrecht/component-library-react";
import React, { useId } from "react";

type FieldTypes = {
  value?: string;
  label: string;
};

interface PartnerInvitationProps {
  title: string;
  body: string;
  legend?: string;
  partnerFirstName: FieldTypes;
  partnerLastName: FieldTypes;
  partnerEmail: FieldTypes;
  partnerPhoneNumber: FieldTypes;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

export const PartnerInvitation = ({
  title,
  body,
  legend,
  partnerEmail,
  partnerFirstName,
  partnerLastName,
  partnerPhoneNumber,
  onChange,
}: PartnerInvitationProps) => {
  const partnerFirstNameId = useId();
  const partnerLastNameId = useId();
  const partnerEmailId = useId();
  const partnerPhoneNumberId = useId();
  return (
    <section>
      <Heading2>{title}</Heading2>
      <Paragraph>{body}</Paragraph>
      <Fieldset>
        {legend && <FieldsetLegend>{legend}</FieldsetLegend>}
        <FormField>
          <p className="utrecht-form-field__label">
            <FormLabel htmlFor={partnerFirstNameId}>{partnerFirstName.label}</FormLabel>
          </p>
          <Textbox
            className="utrecht-form-field__input"
            id={partnerFirstNameId}
            autoComplete="section-partner given-name"
            onChange={onChange}
            type="text"
            defaultValue={partnerFirstName.value}
            required
          />
        </FormField>
        <FormField>
          <p className="utrecht-form-field__label">
            <FormLabel htmlFor={partnerLastNameId}>{partnerLastName.label}</FormLabel>
          </p>
          <Textbox
            className="utrecht-form-field__input"
            id={partnerLastNameId}
            autoComplete="section-partner family-name"
            onChange={onChange}
            type="text"
            defaultValue={partnerLastName.value}
            required
          />
        </FormField>
        <FormField>
          <p className="utrecht-form-field__label">
            <FormLabel htmlFor={partnerEmailId}>{partnerEmail.label}</FormLabel>
          </p>
          <Textbox
            className="utrecht-form-field__input"
            id={partnerEmailId}
            autoComplete="section-partner email"
            onChange={onChange}
            type="email"
            defaultValue={partnerEmail.value}
            required
          />
        </FormField>
        <FormField>
          <p className="utrecht-form-field__label">
            <FormLabel htmlFor={partnerPhoneNumberId}>{partnerPhoneNumber.label}</FormLabel>
          </p>
          <Textbox
            className="utrecht-form-field__input"
            id={partnerPhoneNumberId}
            autoComplete="section-partner tel"
            onChange={onChange}
            type="tel"
            defaultValue={partnerPhoneNumber.value}
            required
          />
        </FormField>
      </Fieldset>
      <Button type="submit" name="type" appearance="primary-action-button">
        Verstuur uitnodiging
      </Button>
    </section>
  );
};
