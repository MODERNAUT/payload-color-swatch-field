import type { TextField } from "payload";

type ColorSwatchFieldType = (overrides?: Partial<TextField>) => TextField;

// TO DO: Add Cell support for column sorting by color
export const colorSwatchField: ColorSwatchFieldType = (overrides = {}) => {
  // Expect ts error here because of typescript mismatching Partial<TextField> with TextField
  // @ts-expect-error
  const colorSwatchField: TextField = {
    name: "color",
    type: "text",
    index: true,
    label: "Color Swatch",
    required: false,
    validate: (value) =>
      value == null ||
      value?.match(/^#(?:[0-9a-fA-F]{3}){1,2}$/)?.length === 1 ||
      "This field is required",
    ...(overrides || {}),
    admin: {
      position: "sidebar",
      ...(overrides?.admin || {}),
      components: {
        Field: {
          path: "@modernaut/payload-color-swatch-field/ColorSwatchComponent#ColorSwatchComponent",
          // path: '@/fields/colorswatch/ColorSwatchComponent#ColorSwatchComponent', // Replace above with this line if you'd rather place this source in /fields directory of your app
        },
      },
    },
  };

  return colorSwatchField;
};
