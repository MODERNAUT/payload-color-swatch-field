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
      defaultColors: ['#000000', '#777', '#ffffff', 'bg-amber-500', 'bg-teal-500', 'bg-violet-500', 'text-amber-700', 'text-teal-700', 'text-violet-700'],
      overrides: {
        required: true,
      },
    }),
  ],
};

export default Lorem;
```

## Options

- `defaultColors`: Provide an array of color options (supports hex and Tailwind colors)
- `lockDefaultColors`: Enable to ensure default color options can't be removed by users (_default: true_)
- `allowNull`: Adds a null option to default colors (_default: true_)
- `allowUserPreferences`: Enable to allow users to remove and add colors and build their own palette (_default: true_)
- `useGlobalPreferences`: Disabling this will allow custom user color options on a per-field basis (_default: true_)
- `allowTailwindColors`: Enable to allow Tailwind color options (_default: true_)
- `tailwindColorWhitelist`: Provide a list of Tailwind color options. NOTE: You must specify the full color class (e.g. 'text-amber-700' vs 'amber-500') in order for Tailwind to detect/generate the proper colors in its CSS. Otherwise, you'll need to safelist the full class in your tailwind config file. See https://tailwindcss.com/docs/content-configuration#safelisting-classes for more details (_default: all bg and text Tailwind colors are allowed_)
- `allowHexColors`: Enable to allow hex colors (_default: true_)
- `overrides`: Any Payload field type overrides

## To Do

- Special color options: Gradients, transparency etc.
- Programmatically loading tailwind utilities vs hardcoded tailwind css
- Cell support: Adding swatch styles to column sorting UI
- Restricting hex options in the 'Add' prompt

## Credit

- "Custom Color Picker" field article -- https://payloadcms.com/blog/building-a-custom-field
- innovixx, Payload Color Picker Field -- https://github.com/innovixx
- Payload SEO Plugin for Payload v3
