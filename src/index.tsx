import type { TextField } from "payload";

interface FieldFunctionProps {
  overrides?: Partial<TextField>;
}

type FieldFunction = ({ overrides }: FieldFunctionProps) => TextField;

// TO DO: Add Cell support for column sorting by color
export const colorSwatchField: FieldFunction = (overrides = {}) => {
  return {
    name: "color",
    type: "text",
    index: true,
    label: "Color",
    required: false,
    validate: (value) =>
      value == null ||
      value?.match(/^#(?:[0-9a-fA-F]{3}){1,2}$/)?.length === 1 ||
      "This field is required",
    ...((overrides as unknown as TextField) ?? {}),
    admin: {
      position: "sidebar",
      ...("admin" in overrides ? (overrides.admin as Object) : {}),
      components: {
        Field: {
          path: "@modernaut/payload-color-swatch-field/client#ColorSwatchComponent",
        },
      },
    },
  };
};
