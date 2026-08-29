# Nuxt Vendor Registration Form

A basic Vendor Registration form built with **Nuxt JS** and Vue that submits vendor information directly to a SmartFormify endpoint.

## Folder Structure

```text
nuxt-vendor-registration/
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

- Business Name
- Contact Person
- Email
- Phone
- Business Type
- Website
- Business Location
- Products / Services
- Additional Information

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

## Submission

The form submits directly using Nuxt `$fetch` with a `POST` request.

The submitted payload follows the SmartFormify structure:

```json
{
  "data": {
    "business_name": "Example Business",
    "contact_person": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "business_type": "manufacturer",
    "website": "https://example.com",
    "business_location": "New York, USA",
    "products_services": "Products and services description",
    "additional_information": "Additional details",
    "notes_hqse": ""
  }
}
```

The submission flow is:

```text
Nuxt Vendor Registration Form
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

Do not validate it as a normal form field.

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
2. Open the Vendor Registration page.
3. Enter the business name.
4. Enter the contact person and contact details.
5. Select the business type.
6. Add the website and business location.
7. Describe the products / services.
8. Add additional information if required.
9. Submit the form.
10. Verify the submission in your SmartFormify workflow.

> Note: This form provides the vendor registration UI and endpoint submission. It does not approve vendors, verify businesses, manage vendor accounts, or provide a vendor management system unless those workflows are configured through the connected endpoint.

## Customization

Edit `pages/index.vue` to customize:

- Business type options
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

This is a complete conversion of the original Astro Vendor Registration form into Nuxt JS.

Astro-specific implementation has been replaced with:

- `vendor_registration.astro` → `pages/index.vue`
- Astro endpoint constant → Nuxt `runtimeConfig`
- HTML form submission → Vue `@submit.prevent`
- POST submission → Nuxt `$fetch`
- Astro stylesheet link → Nuxt global CSS configuration
- Astro page/head → Nuxt `useHead`
- Static form state → Vue `reactive()` state
- Astro setup commands → Nuxt setup and commands

The original form purpose, field list, SmartFormify integration, hidden bot-check field, and visual styling are retained.
