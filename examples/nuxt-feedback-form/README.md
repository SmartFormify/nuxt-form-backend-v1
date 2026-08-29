# Nuxt Feedback Form

A professional feedback form built with **Nuxt JS** and Vue. It submits feedback directly to a SmartFormify endpoint using Nuxt `$fetch`.

## Folder Structure

```text
nuxt-feedback-form/
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

The feedback form includes:

- Full Name
- Email Address
- Feedback Type
- Experience Rating
- Feedback Message
- Recommendation
- Contact Permission
- Submit Feedback button

Required fields:

- Feedback Type
- Experience Rating
- Feedback Message

Native HTML `required` validation is used.

## SmartFormify Setup

Configure the endpoint through a Nuxt environment variable.

Create a `.env` file:

```env
NUXT_PUBLIC_SMART_FORMIFY_ENDPOINT=https://api.smartformify.com/fe/YOUR_ENDPOINT_KEY
```

Replace `YOUR_ENDPOINT_KEY` with your actual SmartFormify endpoint key.

The Nuxt application reads this value through:

```ts
runtimeConfig: {
  public: {
    smartFormifyEndpoint:
      process.env.NUXT_PUBLIC_SMART_FORMIFY_ENDPOINT || ''
  }
}
```

The fallback endpoint in `pages/index.vue` is:

```text
https://api.smartformify.com/fe/YOUR_ENDPOINT_KEY
```

## Submission

The form uses Nuxt `$fetch` with a `POST` request.

The submitted payload follows the SmartFormify structure:

```json
{
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "feedback_type": "product",
    "rating": "5",
    "message": "Great experience.",
    "recommendation": "yes",
    "contact_permission": "yes",
    "notes_hqse": ""
  }
}
```

The `notes_hqse` field is the SmartFormify silent bot-check field. Keep it present and empty. It should not be used as a normal form field or validated as user input.

## SmartFormify Response

If SmartFormify returns a redirect action with a `redirect_url`, Nuxt redirects the user to that URL.

If SmartFormify returns thank-you content, that content is displayed after successful submission.

If no custom response is returned, the form displays a default success message.

## Submission Flow

```text
Nuxt Feedback Form
        ↓
Nuxt $fetch POST
        ↓
SmartFormify Endpoint
        ↓
Submission Processing
        ↓
Email / Notifications / Response
```

## CSS

All visual styling is contained in:

```text
assets/style.css
```

The stylesheet is registered globally in `nuxt.config.ts`:

```ts
css: ['~/assets/style.css']
```

No Astro `<link>` tag is required.

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

Generate a static site:

```bash
npm run generate
```

Preview the production build:

```bash
npm run preview
```

## Requirements

- Node.js
- Nuxt JS
- SmartFormify endpoint URL
- No additional form packages

## Testing

1. Configure the SmartFormify endpoint in `.env`.
2. Start the Nuxt development server.
3. Open the feedback page.
4. Select a feedback type.
5. Select an experience rating.
6. Enter the required feedback message.
7. Optionally provide your name, email, recommendation, and contact permission.
8. Click **Submit Feedback**.
9. Verify the submission in SmartFormify.
10. Confirm the configured SmartFormify response or redirect behavior.

## Customization

Edit:

```text
pages/index.vue
```

to change:

- Form fields
- Feedback type options
- Rating options
- Recommendation options
- Labels
- Placeholders
- Button text
- Consent text
- SmartFormify endpoint handling
- Success and error messages

Edit:

```text
assets/style.css
```

to change:

- Colors
- Typography
- Spacing
- Card layout
- Rating controls
- Button styling
- Responsive behavior

## Astro to Nuxt Conversion

This version is a complete Nuxt conversion of the original Astro implementation.

Astro-specific items were replaced with Nuxt/Vue equivalents:

- `.astro` page → `pages/index.vue`
- Astro frontmatter endpoint → Nuxt `runtimeConfig`
- Static HTML form submission → Vue `@submit.prevent`
- HTML `action` submission → Nuxt `$fetch`
- Astro stylesheet `<link>` → Nuxt global CSS configuration
- Astro page `<head>` → Nuxt `useHead`
- Static form state → Vue `reactive()` state
- Astro project setup → Nuxt project structure

The original feedback fields, labels, options, required validation, consent wording, visual design, and SmartFormify submission purpose are retained.
