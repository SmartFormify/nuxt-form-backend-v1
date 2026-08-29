# Nuxt Contact Form with File Upload

A responsive contact form with file upload built with **Nuxt JS** and Vue.

The form submits contact information and an optional attachment directly to a SmartFormify endpoint using `multipart/form-data`.

## Folder Structure

```text
nuxt-contact-form-with-file-upload/
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
- Subject
- Message
- Attachment
- Consent Checkbox
- Send Message button

## File Upload

The attachment field accepts:

- PDF
- DOC
- DOCX
- JPG
- JPEG
- PNG

Maximum file size:

```text
10 MB
```

The Nuxt page validates the file type and file size on the client before submission.

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

Because this form supports file uploads, the Nuxt page uses `FormData` and sends a `multipart/form-data` request with `$fetch`.

The submission flow is:

```text
Nuxt Contact Form
        ↓
FormData
        ↓
Nuxt $fetch POST
        ↓
SmartFormify Endpoint
        ↓
Submission Processing
        ↓
Email / Notifications / Response
```

The form data is submitted using the SmartFormify `data` structure, and the attachment is included as a multipart file.

The browser automatically sets the correct multipart boundary. No manual `Content-Type` header is added.

## Hidden Field

The form includes the SmartFormify silent bot-check field:

```html
<input name="notes_hqse" ...>
```

Keep this field present and empty.

Do not validate `notes_hqse` as a normal user field.

## SmartFormify Response

If SmartFormify returns:

```text
next_action = redirect
```

and provides a `redirect_url`, Nuxt redirects the user to that URL.

If SmartFormify returns `thank_you_content`, the content is displayed after successful submission.

Otherwise, the form displays a default success message.

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
2. Open the Contact Form page.
3. Enter the required contact information.
4. Enter a subject and message.
5. Optionally select a supported attachment.
6. Verify that the selected file is no larger than 10 MB.
7. Accept the consent checkbox.
8. Click **Send Message**.
9. Verify the submission and attachment in your SmartFormify workflow.

## Customization

Edit `pages/index.vue` to customize:

- Contact information
- Form fields
- Labels
- Placeholders
- Accepted file types
- Maximum file size
- Button text
- SmartFormify endpoint
- Success and error messages

Edit `assets/style.css` to customize:

- Colors
- Typography
- Spacing
- Card layout
- Input styles
- File upload area
- Button styles
- Responsive behavior

## Laravel to Nuxt Conversion

This is a complete conversion of the original Laravel Blade Contact Form with File Upload into Nuxt JS.

Laravel-specific implementation has been replaced with:

- `contact_form_with_file_upload.blade.php` → `pages/index.vue`
- Blade syntax → Vue template syntax
- Laravel route → Nuxt page routing
- Laravel/PHP setup → Nuxt setup
- Blade form → Vue form
- File upload JavaScript → Vue event handling
- Laravel form submission → Nuxt `$fetch` + `FormData`
- Laravel public CSS reference → Nuxt global CSS configuration
- Laravel instructions → Nuxt instructions

The original contact fields, attachment types, 10 MB file limit, consent requirement, responsive styling, and SmartFormify submission workflow are retained.

## Important

This example does not require a Laravel controller, PHP route, database, or mail service.

SmartFormify handles the configured submission workflow after the form sends the data to the endpoint.
