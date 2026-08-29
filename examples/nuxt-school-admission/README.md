# Nuxt School Admission Form

A basic School Admission form built with **Nuxt JS** and Vue that submits form data directly to a SmartFormify endpoint.

## Folder Structure

```text
nuxt-school-admission/
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

- Student Name
- Date of Birth
- Gender
- Applying for Class
- Parent / Guardian Name
- Parent / Guardian Email
- Parent / Guardian Phone
- Address
- Previous School
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

The submission flow is:

```text
Nuxt School Admission Form
           ↓
Nuxt $fetch POST
           ↓
SmartFormify Endpoint
           ↓
Submission Processing
           ↓
Email / Notifications / Response
```

The payload uses the SmartFormify `data` structure and includes all admission fields plus the `notes_hqse` field.

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
2. Open the School Admission page.
3. Enter the student information.
4. Select gender and the applying class.
5. Enter the parent / guardian information.
6. Enter the address and previous school.
7. Add additional information if required.
8. Submit the form.
9. Verify the submission in your SmartFormify workflow.

> Note: This form provides the school admission UI and endpoint submission. It does not process admissions, verify documents, manage student records, or provide an admission management system unless those workflows are configured through the connected endpoint.

## Customization

Edit `pages/index.vue` to customize:

- Gender options
- Class options
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

This is a complete conversion of the original Astro School Admission Form into Nuxt JS.

Astro-specific implementation has been replaced with:

- `school_admission.astro` → `pages/index.vue`
- Astro endpoint constant → Nuxt `runtimeConfig`
- HTML form submission → Vue `@submit.prevent`
- POST submission → Nuxt `$fetch`
- Astro stylesheet link → Nuxt global CSS configuration
- Astro page/head → Nuxt `useHead`
- Static form state → Vue `reactive()` state
- Astro setup commands → Nuxt setup and commands

The original form fields, gender/class selections, SmartFormify integration, hidden bot-check field, and visual styling are retained.
