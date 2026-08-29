# Nuxt Newsletter Signup Form

A professional newsletter signup form built with **Nuxt JS** and Vue using an external CSS file.

The form submits subscriber information directly to a SmartFormify endpoint using Nuxt `$fetch`.

## Folder Structure

```text
nuxt-newsletter/
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

The newsletter form includes:

- Email Address
- Name
- Newsletter consent checkbox
- Subscribe to Newsletter button

Required fields:

- Email Address
- Newsletter consent

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

The page also contains this placeholder fallback:

```text
https://api.smartformify.com/fe/YOUR_ENDPOINT_KEY
```

## Submission

The form uses Nuxt `$fetch` with:

```js
method: 'POST'
```

The submitted data follows the SmartFormify structure:

```json
{
  "data": {
    "email": "user@example.com",
    "name": "User Name",
    "consent": "accepted",
    "notes_hqse": ""
  }
}
```

The submission flow is:

```text
Nuxt Newsletter Form
          ↓
Nuxt $fetch POST
          ↓
SmartFormify Endpoint
          ↓
Submission Processing
          ↓
Email / Notifications / Response
```

> Note: This form provides the newsletter signup UI. It does not itself store subscribers, send newsletters, or connect to a mailing-list service. Those workflows must be handled by the configured backend/endpoint.

## SmartFormify Response

If SmartFormify returns a redirect action with a `redirect_url`, Nuxt redirects the user to that URL.

If SmartFormify returns `thank_you_content`, the content is displayed after successful submission.

If no custom response is returned, the form displays a default success message.

## Hidden Field

The form includes the SmartFormify silent bot-check field:

```html
<input name="notes_hqse" ...>
```

Keep this field present and empty.

Do not validate it as a normal user field.

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

1. Configure your SmartFormify endpoint URL.
2. Start the Nuxt development server.
3. Open the newsletter page.
4. Enter an email address.
5. Optionally enter a name.
6. Accept the newsletter consent.
7. Click **Subscribe to Newsletter**.
8. Verify the submission in your SmartFormify workflow.

## Customization

Edit `pages/index.vue` to change:

- Form fields
- Labels
- Placeholders
- Button text
- Consent text
- Privacy note
- SmartFormify endpoint
- Success and error messages

Edit `assets/style.css` to change:

- Colors
- Typography
- Spacing
- Card layout
- Button styling
- Responsive behavior

## Astro to Nuxt Conversion

This is a complete conversion of the original Astro Newsletter Signup Form into Nuxt JS.

Astro-specific implementation has been replaced with:

- `newsletter.astro` → `pages/index.vue`
- Astro endpoint constant → Nuxt `runtimeConfig`
- HTML form submission → Vue `@submit.prevent`
- POST submission → Nuxt `$fetch`
- Astro stylesheet link → Nuxt global CSS configuration
- Astro document/head → Nuxt `useHead`
- Static form values → Vue `reactive()` state
- Astro setup commands → Nuxt setup and commands

The original form fields, required validation, consent behavior, SmartFormify integration, hidden bot-check field, privacy note, and visual styling are retained.
