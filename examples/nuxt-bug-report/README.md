# Nuxt Bug Report Form

A basic Bug Report form built with Nuxt.js that submits form data directly to a SmartFormify endpoint.

## Folder Structure

```text
bug-report/
├── README.md
├── assets/
│   └── style.css
└── pages/
    └── bug_report.vue
```

## Form Fields

The form includes:

- Full Name
- Email
- Bug Title
- Bug Category
- Severity
- Page URL
- Bug Description
- Steps to Reproduce
- Expected Result
- Actual Result

## SmartFormify Setup

Open:

```text
pages/bug_report.vue
```

and update:

```ts
const endpointUrl =
  "https://api.smartformify.com/fe/YOUR_ENDPOINT_KEY";
```

Replace the placeholder with your actual SmartFormify endpoint.

The form submits directly using `POST`:

```html
<form :action="endpointUrl" method="POST">
```

The submission flow is:

```text
Nuxt Bug Report Form
        ↓
SmartFormify Endpoint
        ↓
Submission Processing
        ↓
Email / Notifications / Response
```

## Hidden Field

Keep this SmartFormify silent bot-check field present and empty:

```html
<input
  type="text"
  name="notes_hqse"
  value=""
  autocomplete="off"
  tabindex="-1"
  aria-hidden="true"
>
```

Do not enter a value into this field.

## CSS

All styling is in:

```text
assets/style.css
```

The Nuxt page loads it with:

```vue
<style src="~/assets/style.css"></style>
```

## Setup

Place `bug_report.vue` inside the Nuxt project's:

```text
pages/
```

directory.

Nuxt automatically creates the route from the filename.

For example:

```text
pages/bug_report.vue
```

is available at:

```text
/bug_report
```

## Requirements

- Nuxt
- Vue
- SmartFormify endpoint URL
- No additional packages

## Testing

1. Configure the SmartFormify endpoint.
2. Start your Nuxt development server.
3. Open the Bug Report page at `/bug_report`.
4. Complete the bug information.
5. Submit the form.
6. Verify the submission in your SmartFormify workflow.

## Customization

Edit `pages/bug_report.vue` to change:

- Fields
- Bug categories
- Severity options
- Labels
- Placeholders
- Button text
- SmartFormify endpoint

Edit `assets/style.css` to customize:

- Colors
- Typography
- Spacing
- Form width
- Inputs
- Buttons
- Responsive behavior

> Note: This form provides the UI and endpoint submission. It does not create a bug-tracking system or issue management workflow by itself.
