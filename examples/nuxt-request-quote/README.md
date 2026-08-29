# Nuxt Request a Quote Form

A professional Request a Quote form built with **Nuxt JS** and Vue using an external CSS file.

The form submits quote-request information directly to a SmartFormify endpoint.

## Folder Structure

```text
nuxt-request-quote/
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

- First Name
- Last Name
- Email Address
- Phone Number
- Service
- Estimated Budget
- Expected Timeline
- Project Name
- Project Description
- Additional Notes
- Consent Checkbox
- Request a Quote button

## Required Fields

- First Name
- Last Name
- Email Address
- Service
- Project Description
- Consent

Native HTML `required` validation is used.

## SmartFormify Setup

Configure the endpoint through a Nuxt environment variable.

Create a `.env` file:

```env
NUXT_PUBLIC_SMART_FORMIFY_ENDPOINT=https://api.smartformify.com/fe/YOUR_ENDPOINT_KEY
```

Replace `YOUR_ENDPOINT_KEY` with your actual SmartFormify endpoint URL.

Nuxt reads the endpoint through:

```ts
runtimeConfig: {
  public: {
    smartFormifyEndpoint:
      process.env.NUXT_PUBLIC_SMART_FORMIFY_ENDPOINT || ''
  }
}
```

## Submission

The form submits directly using Nuxt `$fetch` with a `POST` request:

```text
Nuxt Request a Quote Form
          ↓
Nuxt $fetch POST
          ↓
SmartFormify Endpoint
          ↓
Submission Processing
          ↓
Email / Notifications / Response
```

The submitted data uses the SmartFormify `data` structure.

If SmartFormify returns a redirect action with a `redirect_url`, Nuxt redirects the user to that URL.

If SmartFormify returns `thank_you_content`, it is displayed after successful submission.

## Hidden Field

Keep this SmartFormify silent bot-check field present and empty:

```html
<input name="notes_hqse" ...>
```

Do not validate `notes_hqse` as a normal user field.

## CSS

All styling is contained in:

```text
assets/style.css
```

Nuxt loads it globally through `nuxt.config.ts`:

```ts
css: ['~/assets/style.css']
```

## Setup

Install dependencies:

```bash
npm install
```

Start the development server:

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
- SmartFormify Endpoint URL
- No additional packages

## Testing

1. Configure the SmartFormify endpoint.
2. Open the Request a Quote page.
3. Enter the contact information.
4. Select a service.
5. Optionally select a budget and timeline.
6. Enter the project description.
7. Add additional notes if needed.
8. Accept the consent checkbox.
9. Click **Request a Quote**.
10. Verify the submission in your SmartFormify workflow.

> Note: This form provides the quote-request UI and endpoint submission. It does not calculate quotes, store requests, send emails, or provide quote management unless those workflows are configured through the connected endpoint.

## Customization

Edit `pages/index.vue` to customize:

- Service options
- Budget ranges
- Timeline options
- Form fields
- Labels
- Placeholders
- Consent text
- Button text
- SmartFormify endpoint
- Success and error messages

Edit `assets/style.css` to customize:

- Colors
- Typography
- Spacing
- Layout
- Form controls
- Buttons
- Responsive behavior

## Astro to Nuxt Conversion

This is a complete conversion of the original Astro Request a Quote Form into Nuxt JS.

Astro-specific implementation has been replaced with:

- `request_quote.astro` → `pages/index.vue`
- Astro endpoint constant → Nuxt `runtimeConfig`
- HTML form submission → Vue `@submit.prevent`
- POST submission → Nuxt `$fetch`
- Astro stylesheet link → Nuxt global CSS configuration
- Astro page/head → Nuxt `useHead`
- Form state → Vue `reactive()` state
- Astro setup commands → Nuxt setup and commands

The original form purpose, fields, required validation, SmartFormify integration, hidden bot-check field, and visual styling are retained.
