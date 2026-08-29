# Nuxt Survey Form

A professional customer survey form built with **Nuxt JS** and Vue using an external CSS file.

The form submits survey responses directly to a SmartFormify endpoint.

## Folder Structure

```text
nuxt-survey-form/
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

The survey includes:

- Full Name
- Email Address
- Overall Satisfaction Rating
- Product Usage Frequency
- Ease of Use Rating
- Favorite Product Feature
- Improvement Suggestions
- Recommendation Score
- Additional Comments
- Contact Permission
- Submit Survey button

## Required Fields

The following fields are required:

- Overall Satisfaction Rating
- Product Usage Frequency
- Ease of Use Rating
- Recommendation Score

The form uses native HTML `required` validation.

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

The page also includes this placeholder fallback:

```text
https://api.smartformify.com/fe/YOUR_ENDPOINT_KEY
```

## Submission

The form submits using Nuxt `$fetch` with a `POST` request.

The submission flow is:

```text
Nuxt Survey Form
       ↓
Nuxt $fetch POST
       ↓
SmartFormify Endpoint
       ↓
Submission Processing
       ↓
Email / Notifications / Response
```

The payload uses the SmartFormify `data` structure and includes the survey fields plus `notes_hqse`.

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

If no custom response is returned, the form displays a default success message.

## Testing

1. Configure your SmartFormify endpoint URL.
2. Open the survey page.
3. Select an overall satisfaction rating.
4. Select product usage frequency.
5. Select an ease-of-use rating.
6. Select a recommendation score.
7. Optionally enter comments and contact information.
8. Click **Submit Survey**.
9. Verify the response in your SmartFormify workflow.

> Note: This example provides the survey UI and endpoint submission. It does not store responses, calculate survey results, generate reports, or provide survey analytics unless those workflows are configured through the connected endpoint.

## CSS

All styling is contained in:

```text
assets/style.css
```

Nuxt loads the stylesheet globally through `nuxt.config.ts`:

```ts
css: ['~/assets/style.css']
```

The Astro stylesheet link approach is not used.

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

## Customization

Edit `pages/index.vue` to customize:

- Survey questions
- Satisfaction rating options
- Product usage options
- Ease-of-use options
- Recommendation options
- Labels
- Placeholders
- Button text
- Contact permission text
- SmartFormify endpoint
- Success and error messages

Edit `assets/style.css` to customize:

- Colors
- Typography
- Spacing
- Card layout
- Rating controls
- Radio controls
- Button styling
- Responsive behavior

## Astro to Nuxt Conversion

This is a complete conversion of the original Astro Survey Form into Nuxt JS.

Astro-specific implementation has been replaced with:

- `survey.astro` → `pages/index.vue`
- Astro endpoint constant → Nuxt `runtimeConfig`
- HTML form submission → Vue `@submit.prevent`
- POST submission → Nuxt `$fetch`
- Astro stylesheet link → Nuxt global CSS configuration
- Astro page/head → Nuxt `useHead`
- Static form state → Vue `reactive()` state
- Native Astro page markup → Vue template
- Astro setup commands → Nuxt setup and commands

The original survey questions, required fields, rating controls, radio controls, contact permission, SmartFormify integration, hidden bot-check field, and visual styling are retained.
