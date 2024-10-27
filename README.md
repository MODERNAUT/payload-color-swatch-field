# payload-color-swatch-field

A color swatch field for Payload 3

## Installation

```bash
npm i @modernaut/payload-color-swatch-field
```

NOTE: At the time of writing this, you may experience package conflicts with Payload Beta. You may need to use `npm i` with `--force`

## Usage

```js
import type { CollectionConfig } from "payload";
import { colorSwatchField } from "@modernaut/payload-color-swatch-field";

const Lorem: CollectionConfig = {
  slug: "lorem",
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    colorSwatchField({
      defaultColors: ['#000000', '#777', '#ffffff', 'amber-500', 'teal-500', 'violet-500'],
      lockDefaultColors: true,
      allowNull: true,
      allowUserPreferences: true,
      useGlobalPreferences: true,
      allowTailwindColors: true,
      // tailwindColorWhitelist: ['amber-500', 'teal-500', 'violet-500', 'lime-700', 'sky-700'],
      allowHexColors: true,
      overrides: {
        required: false,
      },
    }),
  ],
};

export default Lorem;
```

- `defaultColors`: Provide an array of color options (supports hex and Tailwind colors)
- `lockDefaultColors`: Setting true ensures default color options can't be removed by users
- `allowNull`: Adds a null option to default colors
- `allowUserPreferences`: Enable to allow users to remove and add colors and build their own palette
- `useGlobalPreferences`: Disabling this will allow custom user color options on a per-field basis
- `allowTailwindColors`: Enable to allow Tailwind color options
- `tailwindColorWhitelist`: Provide a list of Tailwind color options. By default, all Tailwind colors are allowed.
- `allowHexColors`: Enable to allow hex colors
- `overrides`: Any Payload field type overrides

## TO DO

- Cell support: Adding swatch styles to column sorting UI
- Restricting hex options in the 'Add' prompt

## Credit

- "Custom Color Picker" field article -- https://payloadcms.com/blog/building-a-custom-field
- innovixx, Payload Color Picker Field -- https://github.com/innovixx
- Payload SEO Plugin for Payload v3
