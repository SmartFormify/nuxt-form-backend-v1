# Nuxt Franchise Enquiry Form

A basic Franchise Enquiry form converted from the original Astro implementation to Nuxt JS. It submits the form directly to a SmartFormify endpoint using a client-side `POST` request.

## Folder Structure

```text
franchise-enquiry-form/
├── README.md
├── package.json
├── nuxt.config.ts
├── pages/
│   └── index.vue
└── assets/
    └── style.css
```

## Form Fields

- Full Name
- Email
- Phone
- Company Name
- Preferred Location
- Investment Range
- Business Experience
- Enquiry / Message

The form also contains the SmartFormify silent bot-check field `notes_hqse`, which remains empty.

## SmartFormify Setup

The endpoint can be configured in `pages/index.vue` using:

```js
const endpointUrl = ref(
  config.public.smartFormifyEndpoint ||
  'https://api.smartformify.com/fe/YOUR_ENDPOINT_KEY'
)
```

For a Nuxt deployment, a better approach is to configure the endpoint through an environment variable.

Create `.env`:

```env
NUXT_PUBLIC_SMART_FORMIFY_ENDPOINT=https://api.smartformify.com/fe/YOUR_ENDPOINT_KEY
```

Nuxt exposes this value through `runtimeConfig.public.smartFormifyEndpoint`.

The form submits the data with `POST` in the SmartFormify data structure:

```json
{
  "data": {
    "name": "User Name",
    "email": "user@example.com",
    "phone": "1234567890",
    "company": "Company Name",
    "location": "Preferred Location",
    "investment": "25k_50k",
    "experience": "Business experience",
    "message": "Franchise enquiry message",
    "notes_hqse": ""
  }
}
```

## Submission Flow

```text
Nuxt Franchise Enquiry Form
           ↓
Client-side $fetch POST
           ↓
SmartFormify Endpoint
           ↓
Submission Processing
           ↓
Email / Notifications / Response
```

If SmartFormify returns a redirect action with a `redirect_url`, the page redirects to that URL.

## CSS

All original form styling is preserved in:

```text
assets/style.css
```

Nuxt loads it globally through `nuxt.config.ts`:

```ts
css: ['~/assets/style.css']
```

No `<link rel="stylesheet">` tag is required in the page component.

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
- No additional form packages

## Testing

1. Configure the SmartFormify endpoint.
2. Start the Nuxt development server.
3. Open the Franchise Enquiry page.
4. Enter the contact information.
5. Enter the company name.
6. Enter the preferred location.
7. Select the investment range.
8. Provide business experience.
9. Add the enquiry or message.
10. Submit the form.
11. Verify the submission in SmartFormify.

## Customization

Edit `pages/index.vue` to customize:

- Form fields
- Labels
- Placeholders
- Investment ranges
- Button text
- Submission behavior
- SmartFormify response handling

Edit `assets/style.css` to customize:

- Colors
- Typography
- Spacing
- Form width
- Input styles
- Button styles
- Responsive behavior

## Astro to Nuxt Changes

The original Astro page used Astro frontmatter and a normal HTML form action. This Nuxt version replaces those Astro-specific parts with:

- Vue Single File Component syntax
- Nuxt `useHead`
- Nuxt `useRuntimeConfig`
- Vue `reactive` state
- Nuxt `$fetch` for endpoint submission
- Vue form event handling
- Nuxt global CSS configuration

The original field names, labels, investment options, and visual styling are retained.
