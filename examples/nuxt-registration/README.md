# Nuxt Event Registration Form

An event-registration template built with **Nuxt JS** and Vue that submits a normal HTML `POST` request to a hosted SmartFormify endpoint.

It intentionally does not create accounts or collect passwords or other credentials.

## Folder Structure

```text
nuxt-event-registration/
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

- First name
- Last name
- Email address
- Event
- Accessibility or dietary notes
- Optional event updates checkbox
- Register for event button

Required fields:

- First name
- Last name
- Email address
- Event

Native HTML `required` validation is used.

## SmartFormify Setup

Configure the SmartFormify endpoint through a Nuxt environment variable.

Create a `.env` file:

```env
NUXT_PUBLIC_SMART_FORMIFY_ENDPOINT=https://api.smartformify.com/fe/YOUR_ENDPOINT_KEY
```

Replace `YOUR_ENDPOINT_KEY` with your actual SmartFormify Endpoint URL.

Nuxt exposes the endpoint through:

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

## How It Works

The form intentionally keeps the original normal HTML POST behavior:

```text
Nuxt Event Registration Form
          ↓
HTTP POST
          ↓
SmartFormify Endpoint
          ↓
Submission Processing
          ↓
Email / Notifications / Response
```

The form does not create an account or collect credentials.

## Submission

The Nuxt page binds the configured endpoint to the form's `action`:

```vue
<form
  :action="endpointUrl"
  method="POST"
>
```

No custom API route is required.

No additional client-side submission package is required.

## CSS

All visual styling is contained in:

```text
assets/style.css
```

Nuxt loads the stylesheet globally through `nuxt.config.ts`:

```ts
css: ['~/assets/style.css']
```

The original Astro stylesheet-link approach has been replaced with Nuxt's global CSS configuration.

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
- SmartFormify Endpoint URL
- No additional packages

## Testing

1. Configure the SmartFormify endpoint URL.
2. Open the Event Registration page.
3. Enter a first name.
4. Enter a last name.
5. Enter an email address.
6. Select an event.
7. Optionally enter accessibility or dietary notes.
8. Optionally enable event updates.
9. Click **Register for event**.
10. Verify the submission in your SmartFormify workflow.

> Note: This form provides the event-registration UI and endpoint submission. It does not create accounts, collect credentials, manage event capacity, process payments, or provide event-management functionality unless those workflows are configured through the connected endpoint.

## Customization

Edit `pages/index.vue` to change:

- Event options
- Form fields
- Labels
- Placeholders
- Button text
- SmartFormify endpoint configuration
- Optional updates checkbox

Edit `assets/style.css` to customize:

- Colors
- Typography
- Spacing
- Card layout
- Form controls
- Button styling
- Responsive behavior

## Astro to Nuxt Conversion

This is a complete conversion of the original Astro Event Registration form into Nuxt JS.

Astro-specific implementation has been replaced with:

- `registration.astro` → `pages/index.vue`
- Astro endpoint constant → Nuxt `runtimeConfig`
- Astro document structure → Nuxt page template
- Astro stylesheet link → Nuxt global CSS configuration
- Astro page title → Nuxt `useHead`
- Astro project setup → Nuxt project setup

The original event fields, event options, required validation, normal HTML POST behavior, SmartFormify endpoint, and visual styling are retained.
