# Nuxt Lead Generation Form

A professional lead generation form built with **Nuxt JS** and Vue using an external CSS file.

The form submits lead information directly to a SmartFormify endpoint using Nuxt `$fetch`.

## Folder Structure

```text
nuxt-lead-generation/
├── README.md
├── package.json
├── nuxt.config.ts
├── .env.example
├── pages/
│   └── index.vue
└── assets/
    └── style.css
```

## Form Fields

The form includes:

- First Name
- Last Name
- Work Email
- Phone Number
- Company Name
- Company Size
- Industry
- Primary Interest
- Additional Message
- Consent Checkbox
- Get Started button

## Required Fields

The following fields are required:

- First Name
- Last Name
- Work Email
- Company Name
- Primary Interest
- Consent

The form uses native HTML `required` validation.

## SmartFormify Setup

Configure the endpoint through a Nuxt environment variable.

Create a `.env` file:

```env
NUXT_PUBLIC_SMART_FORMIFY_ENDPOINT=https://api.smartformify.com/fe/YOUR_ENDPOINT_KEY
```

Replace `YOUR_ENDPOINT_KEY` with your actual SmartFormify endpoint URL.

Nuxt reads this value through:

```ts
runtimeConfig: {
  public: {
    smartFormifyEndpoint:
      process.env.NUXT_PUBLIC_SMART_FORMIFY_ENDPOINT || ''
  }
}
```

The page also contains the placeholder fallback:

```text
https://api.smartformify.com/fe/YOUR_ENDPOINT_KEY
```

## Submission

The form submits using Nuxt `$fetch`:

```js
await $fetch(endpointUrl, {
  method: 'POST',
  body: {
    data: {
      // form fields
    }
  }
})
```

The submission flow is:

```text
Nuxt Lead Generation Form
           ↓
Nuxt $fetch POST
           ↓
SmartFormify Endpoint
           ↓
Submission Processing
           ↓
Email / Notifications / Response
```

## Hidden Field

The form includes the SmartFormify silent bot-check field:

```html
<input name="notes_hqse" ...>
```

Keep this field present and empty.

Do not validate `notes_hqse` as a normal user field.

## SmartFormify Response

If SmartFormify returns:

```text
next_action = redirect
```

and provides a `redirect_url`, Nuxt redirects the user to that URL.

If SmartFormify returns `thank_you_content`, the content is displayed after successful submission.

If no custom response is returned, the form displays a default success message.

## CSS

All styling is contained in:

```text
assets/style.css
```

Nuxt loads the stylesheet globally through `nuxt.config.ts`:

```ts
css: ['~/assets/style.css']
```

The Astro `<link rel="stylesheet">` approach is not used.

## Setup

Install dependencies:

```bash
npm install
```

Start the Nuxt development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Generate a static site:

```bash
npm run generate
```

## Requirements

- Node.js
- Nuxt JS
- SmartFormify endpoint URL
- No additional packages

## Testing

1. Configure your SmartFormify endpoint URL in `.env`.
2. Open the Nuxt lead generation page.
3. Complete the required fields.
4. Optionally enter phone number, company size, industry, and additional message.
5. Select the primary interest.
6. Accept the consent checkbox.
7. Click **Get Started**.
8. Verify the submission in SmartFormify.

> Note: This example provides the lead generation form UI and endpoint submission. It does not store leads, send emails, connect to a CRM, or provide lead analytics unless those workflows are configured through the connected endpoint.

## Customization

Edit `pages/index.vue` to change:

- Company size options
- Industry options
- Interest options
- Form fields
- Labels
- Placeholders
- Button text
- Consent text
- SmartFormify endpoint
- Success and error messages

Edit `assets/style.css` to change:

- Colors
- Typography
- Spacing
- Card layout
- Form controls
- Button styling
- Responsive behavior

## Astro to Nuxt Conversion

This is a complete conversion of the original Astro Lead Generation Form into Nuxt JS.

Astro-specific implementation has been replaced with:

- `lead_generation.astro` → `pages/index.vue`
- Astro endpoint constant → Nuxt `runtimeConfig`
- HTML form submission → Vue `@submit.prevent`
- POST submission → Nuxt `$fetch`
- Astro stylesheet link → Nuxt global CSS configuration
- Astro page structure → Vue Single File Component
- Static form state → Vue `reactive()` state
- Astro setup commands → Nuxt setup and commands

The original form fields, required fields, options, consent behavior, SmartFormify integration, hidden bot-check field, and visual styling are retained.
