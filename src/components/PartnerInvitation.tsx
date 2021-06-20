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
  partnerName: FieldTypes;
  partnerEmail: FieldTypes;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

export const PartnerInvitation = ({
  title,
  body,
  legend,
  partnerEmail,
  partnerName,
  onChange,
}: PartnerInvitationProps) => {
  const partnerNameId = useId();
  const partnerEmailId = useId();
  return (
    <section>
      <Heading2>{title}</Heading2>
      <Paragraph>{body}</Paragraph>
      <Fieldset>
        {legend && <FieldsetLegend>{legend}</FieldsetLegend>}
        <FormField>
          <p className="utrecht-form-field__label">
            <FormLabel htmlFor={partnerNameId}>{partnerName.label}</FormLabel>
          </p>
          <Textbox
            className="utrecht-form-field__input"
            id={partnerNameId}
            autoComplete="section-partner name"
            onChange={onChange}
            type="text"
            defaultValue={partnerName.value}
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
      </Fieldset>
      <Button type="submit" name="type" appearance="primary-action-button">
        Verstuur uitnodiging
      </Button>
    </section>
  );
};
