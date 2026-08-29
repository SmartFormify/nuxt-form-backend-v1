# Nuxt Contact Form

A simple contact form built with Nuxt.js using a Vue page component and an external CSS file.

## Folder Structure

```text
contact-form/
├── README.md
├── assets/
│   └── style.css
└── pages/
    └── contact_form.vue
```

## Form Fields

- Full Name
- Email Address
- Subject
- Message
- Send Message button

The form uses native HTML `required` validation.

## SmartFormify Setup

Open:

```text
pages/contact_form.vue
```

and update:

```ts
const endpointUrl = "https://api.smartformify.com/fe/YOUR_ENDPOINT_KEY";
```

Replace the placeholder with your SmartFormify endpoint URL.

The form submits directly to the endpoint:

```html
<form :action="endpointUrl" method="POST">
```

The submission flow is:

```text
Nuxt Contact Form
       ↓
SmartFormify Endpoint
       ↓
Submission Processing
```

## Hidden Field

The form includes the SmartFormify silent bot-check field:

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

Keep this field present and empty.

## CSS

All styling is contained in:

```text
assets/style.css
```

The Nuxt page references it with:

```vue
<style src="~/assets/style.css"></style>
```

## Setup

Place `contact_form.vue` inside the Nuxt project's:

```text
pages/
```

directory.

Nuxt automatically creates the route:

```text
/contact_form
```

## Requirements

- Nuxt project
- SmartFormify endpoint URL
- No additional packages

## Testing

1. Configure your SmartFormify endpoint URL.
2. Start the Nuxt development server.
3. Open the Contact page at `/contact_form`.
4. Enter the required information.
5. Click **Send Message**.
6. Verify the submission in your SmartFormify workflow.

## Customization

Edit `pages/contact_form.vue` to change:

- Form fields
- Labels
- Placeholders
- Button text
- SmartFormify endpoint

Edit `assets/style.css` to change:

- Colors
- Spacing
- Typography
- Layout
- Responsive behavior
