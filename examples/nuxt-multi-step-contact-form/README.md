# Nuxt Multi-Step Contact Form

A basic multi-step contact form built with **Nuxt JS** and Vue, submitting the completed form directly to a **SmartFormify endpoint**.

## Folder Structure

```text
nuxt-multi-step-contact-form/
├── README.md
├── package.json
├── nuxt.config.ts
├── .env.example
├── pages/
│   └── index.vue
└── assets/
    └── style.css
```

## How It Works

The form has three steps:

1. **Personal Information** — Name, Email
2. **Contact Details** — Phone, Subject
3. **Message** — Message

Vue and Nuxt control the step navigation and validation.

The flow is:

```text
Step 1 → Step 2 → Step 3 → Submit → SmartFormify
```

## SmartFormify Setup

Configure the endpoint with a Nuxt environment variable.

Create a `.env` file:

```env
NUXT_PUBLIC_SMART_FORMIFY_ENDPOINT=https://api.smartformify.com/fe/YOUR_ENDPOINT_KEY
```

Replace the placeholder with your actual SmartFormify endpoint.

Nuxt reads the value through `runtimeConfig.public`.

The page also contains the placeholder fallback:

```text
https://api.smartformify.com/fe/YOUR_ENDPOINT_KEY
```

The completed form is submitted using Nuxt `$fetch` with:

```js
method: 'POST'
```

## Hidden Field

The form includes the SmartFormify silent bot-check field:

```html
<input name="notes_hqse" ...>
```

Keep this field present and empty.

Do not validate it as a normal form field.

## Submission

The form sends the following data structure:

```json
{
  "data": {
    "name": "User Name",
    "email": "user@example.com",
    "phone": "1234567890",
    "subject": "Subject",
    "message": "Message",
    "notes_hqse": ""
  }
}
```

If SmartFormify returns a redirect action with a `redirect_url`, Nuxt redirects the user to that URL.

If SmartFormify returns `thank_you_content`, it is displayed after successful submission.

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
- JavaScript
- SmartFormify endpoint URL
- No additional packages

## Testing

1. Configure the SmartFormify endpoint.
2. Open the multi-step contact form.
3. Complete Step 1.
4. Continue to Step 2.
5. Complete Step 2.
6. Continue to Step 3.
7. Enter the message.
8. Submit the completed form.
9. Verify the submission in your SmartFormify workflow.

## Customization

Edit `pages/index.vue` to customize:

- Step titles
- Form fields
- Labels
- Placeholders
- Navigation buttons
- Validation
- SmartFormify endpoint
- Success and error messages

Edit `assets/style.css` to customize:

- Colors
- Typography
- Spacing
- Form width
- Step indicator
- Input styles
- Button styles
- Responsive behavior

## Astro to Nuxt Conversion

This is a complete conversion of the original Astro Multi-Step Contact Form into Nuxt JS.

Astro-specific implementation has been replaced with:

- `multi_step_form.astro` → `pages/index.vue`
- Astro frontmatter endpoint → Nuxt `runtimeConfig`
- HTML form submission → Vue `@submit.prevent`
- Direct POST → Nuxt `$fetch`
- Astro JavaScript functions → Vue functions inside `<script setup>`
- DOM-based step state → Vue `ref()` reactive state
- Astro stylesheet link → Nuxt global CSS configuration
- Astro page/head → Nuxt `useHead`

The original three-step structure, fields, validation flow, SmartFormify integration, hidden bot-check field, and CSS styling are retained.
