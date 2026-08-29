# Nuxt Consultation Form

A basic Consultation form built with Nuxt.js that submits form data directly to a SmartFormify endpoint.

## Folder Structure

```text
consultation-form/
├── README.md
├── assets/
│   └── style.css
└── pages/
    └── consultation_form.vue
```

## Form Fields

The form includes:

- Full Name
- Email
- Phone
- Consultation Type
- Preferred Date
- Preferred Time
- Company / Organization
- Consultation Details

## SmartFormify Setup

Open:

```text
pages/consultation_form.vue
```

Update:

```ts
const endpointUrl = "https://api.smartformify.com/fe/YOUR_ENDPOINT_KEY";
```

Replace the placeholder with your actual SmartFormify endpoint.

The form submits directly using `POST`:

```html
<form :action="endpointUrl" method="POST">
```

The submission flow is:

```text
Nuxt Consultation Form
          ↓
SmartFormify Endpoint
          ↓
Submission Processing
          ↓
Email / Notifications / Response
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

Place `consultation_form.vue` inside the Nuxt project's:

```text
pages/
```

directory.

Nuxt automatically creates the route:

```text
/consultation_form
```

## Requirements

- Nuxt
- Vue
- SmartFormify endpoint URL
- No additional packages

## Testing

1. Configure the SmartFormify endpoint.
2. Start the Nuxt development server.
3. Open the Consultation page at `/consultation_form`.
4. Complete the consultation information.
5. Select the consultation type.
6. Choose a preferred date and time.
7. Submit the form.
8. Verify the submission in your SmartFormify workflow.

> Note: This form provides the consultation UI and endpoint submission. It does not schedule consultations, store requests, send notifications, or manage a consultation calendar unless those workflows are configured through the connected endpoint.

## Customization

Edit `pages/consultation_form.vue` to customize:

- Consultation types
- Available dates
- Available time options
- Form fields
- Labels
- Placeholders
- Button text
- SmartFormify endpoint

Edit `assets/style.css` to customize:

- Colors
- Typography
- Spacing
- Form width
- Input styles
- Button styles
- Responsive behavior
