# payload-color-swatch-field

A color swatch field for Payload 3

## Installation

```bash
npm i @modernaut/payload-color-swatch-field
```

NOTE: At the time of writing this, you may experience package conflicts with Payload Beta. You may need to use `npm i` with `--force`

## Usage

```js
import type { CollectionConfig } from 'payload'
import ColorSwatchField from '@modernaut/payload-color-swatch-field'

const Lorem: CollectionConfig = {
  slug: 'lorem',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    colorSwatchField,
  ],
}

export default Lorem
```

## Credit

- "Custom Color Picker" field article -- https://payloadcms.com/blog/building-a-custom-field
- innovixx, Payload Color Picker Field -- https://github.com/innovixx
