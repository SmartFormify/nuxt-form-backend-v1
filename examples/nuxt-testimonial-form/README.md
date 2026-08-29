# Nuxt Testimonial Form

A basic Testimonial form built with **Nuxt JS** and Vue that submits testimonial data directly to a SmartFormify endpoint.

## Folder Structure

```text
nuxt-testimonial-form/
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

- Full Name
- Email
- Company Name
- Job Title / Role
- Rating
- Testimonial
- Publishing Permission

## SmartFormify Setup

Configure the endpoint through a Nuxt environment variable.

Create a `.env` file:

```env
NUXT_PUBLIC_SMART_FORMIFY_ENDPOINT=https://api.smartformify.com/fe/YOUR_ENDPOINT_KEY
```

Replace `YOUR_ENDPOINT_KEY` with your actual SmartFormify endpoint.

Nuxt reads the endpoint through:

```ts
runtimeConfig: {
  public: {
    smartFormifyEndpoint:
      process.env.NUXT_PUBLIC_SMART_FORMIFY_ENDPOINT || ''
  }
}
```

The page also includes this placeholder fallback:

```text
https://api.smartformify.com/fe/YOUR_ENDPOINT_KEY
```

## Submission

The form submits directly using Nuxt `$fetch` with:

```text
method: POST
```

The submitted payload follows the SmartFormify structure:

```json
{
  "data": {
    "name": "Customer Name",
    "email": "customer@example.com",
    "company_name": "Company Name",
    "job_title": "Job Title",
    "rating": "5",
    "testimonial": "Great experience.",
    "publishing_permission": "yes",
    "notes_hqse": ""
  }
}
```

The submission flow is:

```text
Nuxt Testimonial Form
         ↓
Nuxt $fetch POST
         ↓
SmartFormify Endpoint
         ↓
Submission Processing
         ↓
Email / Notifications / Response
```

If SmartFormify returns a redirect action with a `redirect_url`, Nuxt redirects the user to that URL.

If SmartFormify returns `thank_you_content`, it is displayed after successful submission.

## Hidden Field

The form includes the SmartFormify silent bot-check field:

```html
<input name="notes_hqse" ...>
```

Keep this field present and empty.

Do not validate `notes_hqse` as a normal user field.

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

1. Configure the SmartFormify endpoint.
2. Open the Testimonial page.
3. Enter the customer information.
4. Select a rating.
5. Enter the testimonial.
6. Select the publishing permission.
7. Submit the form.
8. Verify the submission in your SmartFormify workflow.

> Note: This form provides the testimonial UI and endpoint submission. It does not publish testimonials, moderate reviews, or manage a testimonial library unless those workflows are configured through the connected endpoint.

## Customization

Edit `pages/index.vue` to customize:

- Rating options
- Publishing permission options
- Form fields
- Labels
- Placeholders
- Button text
- SmartFormify endpoint
- Success and error messages

Edit `assets/style.css` to customize:

- Colors
- Typography
- Spacing
- Form width
- Input styles
- Button styles
- Responsive behavior

## Astro to Nuxt Conversion

This is a complete conversion of the original Astro Testimonial Form into Nuxt JS.

Astro-specific implementation has been replaced with:

- `testimonial_form.astro` → `pages/index.vue`
- Astro endpoint constant → Nuxt `runtimeConfig`
- HTML form submission → Vue `@submit.prevent`
- POST submission → Nuxt `$fetch`
- Astro stylesheet link → Nuxt global CSS configuration
- Astro page/head → Nuxt `useHead`
- Static form state → Vue `reactive()` state
- Astro setup commands → Nuxt setup and commands

The original form purpose, field list, rating options, publishing permission, SmartFormify integration, hidden bot-check field, and visual styling are retained.
