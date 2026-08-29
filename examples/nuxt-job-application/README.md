# Nuxt Job Application Form

A professional Job Application form built with **Nuxt JS** and Vue. It submits applicant information and a resume directly to a SmartFormify endpoint using Nuxt `$fetch` and `FormData`.

## Folder Structure

```text
nuxt-job-application/
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
- Position
- Experience
- Portfolio / LinkedIn URL
- Cover Letter
- Resume / CV
- Application consent
- Submit Application button

## Resume Upload

Accepted resume formats:

```text
PDF
DOC
DOCX
```

Maximum resume size: **10 MB**.

Because the form contains a file, Nuxt submits it using `FormData` and a `POST` request.

The request uses `multipart/form-data` automatically through `fetch`/`$fetch`. Do not manually set the `Content-Type` header because the browser must generate the multipart boundary.

## SmartFormify Setup

Configure the endpoint through a Nuxt environment variable.

Create a `.env` file:

```env
NUXT_PUBLIC_SMART_FORMIFY_ENDPOINT=https://api.smartformify.com/fe/YOUR_ENDPOINT_KEY
```

Replace `YOUR_ENDPOINT_KEY` with your actual SmartFormify endpoint URL.

Nuxt exposes the endpoint through:

```ts
runtimeConfig: {
  public: {
    smartFormifyEndpoint:
      process.env.NUXT_PUBLIC_SMART_FORMIFY_ENDPOINT || ''
  }
}
```

## Submission Payload

The form uses `FormData` so the resume can be submitted together with the other fields.

Conceptually, the submitted data follows:

```text
data[first_name]
data[last_name]
data[email]
data[phone]
data[position]
data[experience]
data[portfolio_url]
data[cover_letter]
data[consent]
data[notes_hqse]
data[resume]
```

The `notes_hqse` field is the SmartFormify silent bot-check field. Keep it present and empty. Do not validate it as a normal user field.

## Submission Flow

```text
Nuxt Job Application Form
           ↓
Nuxt FormData + $fetch POST
           ↓
SmartFormify Endpoint
           ↓
Submission Processing
           ↓
Email / Notifications / Response
```

If SmartFormify returns a redirect action with a `redirect_url`, Nuxt redirects the applicant to that URL.

If SmartFormify returns `thank_you_content`, it is displayed after successful submission.

## File Validation

Client-side validation checks:

- A resume is selected.
- File type is PDF, DOC, or DOCX.
- File size does not exceed 10 MB.

This validation improves the form experience but does not replace server-side validation.

## CSS

All visual styling is contained in:

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

1. Configure the SmartFormify endpoint URL in `.env`.
2. Start the Nuxt development server.
3. Open the Job Application page.
4. Complete the required personal information.
5. Select a position and experience level.
6. Enter the cover letter.
7. Upload a PDF, DOC, or DOCX resume.
8. Confirm the resume is no larger than 10 MB.
9. Accept the application consent.
10. Click **Submit Application**.
11. Verify the submission in SmartFormify.

## Customization

Edit `pages/index.vue` to change:

- Form fields
- Position options
- Experience options
- Accepted resume file types
- File size limit
- Labels
- Placeholders
- Button text
- Consent text
- SmartFormify endpoint handling
- Success and error messages

Edit `assets/style.css` to change:

- Colors
- Typography
- Spacing
- Card layout
- Portfolio or resume URL field
- File upload styling
- Button styling
- Responsive behavior

## Astro to Nuxt Conversion

This is a complete conversion of the original Astro Job Application form into Nuxt JS.

Astro-specific implementation has been replaced with:

- `job_application.astro` → `pages/index.vue`
- Astro endpoint constant → Nuxt `runtimeConfig`
- HTML form submission → Vue `@submit.prevent`
- `multipart/form-data` form submission → `FormData` + Nuxt `$fetch`
- Astro stylesheet link → Nuxt global CSS configuration
- Astro page/head → Vue SFC + Nuxt `useHead`
- Static form state → Vue `reactive()` state
- Astro setup commands → Nuxt setup and commands

The original form fields, resume requirements, 10 MB limit, consent requirement, SmartFormify integration, hidden bot-check field, and visual styling are retained.

> Note: This form provides the job application UI and endpoint submission. It does not evaluate candidates, make hiring decisions, store resumes independently, or provide an applicant tracking system unless those workflows are configured through the connected endpoint.
