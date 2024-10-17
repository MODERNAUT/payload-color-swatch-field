// TO DO: Add Cell support for column sorting by color
export const colorSwatchField = {
  name: "color",
  type: "text",
  validate: (value) =>
    value == null ||
    value?.match(/^#(?:[0-9a-fA-F]{3}){1,2}$/)?.length === 1 ||
    "This field is required",
  required: false,
  admin: {
    position: "sidebar",
    components: {
      Field: {
        path: "@modernaut/payload-color-swatch-field/ColorSwatchComponent#ColorSwatchComponent",
        // path: '@/fields/colorswatch/ColorSwatchComponent#ColorSwatchComponent',  // Comment out above if you'd rather place this in /fields directory of your app
      },
    },
  },
};
