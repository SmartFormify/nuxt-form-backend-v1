# Nuxt Complaint Form

A basic Complaint form built with Nuxt.js that submits form data directly to a SmartFormify endpoint.

## Folder Structure

```text
complaint-form/
├── README.md
├── assets/
│   └── style.css
└── pages/
    └── complaint_form.vue
```

## Form Fields

The form includes:

- Full Name
- Email
- Phone
- Complaint Type
- Order / Reference Number
- Complaint Subject
- Complaint Details
- Preferred Resolution

## SmartFormify Setup

Open:

```text
pages/complaint_form.vue
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
Nuxt Complaint Form
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

Place `complaint_form.vue` inside the Nuxt project's:

```text
pages/
```

directory.

Nuxt automatically creates the route:

```text
/complaint_form
```

## Requirements

- Nuxt
- Vue
- SmartFormify endpoint URL
- No additional packages

## Testing

1. Configure the SmartFormify endpoint.
2. Start the Nuxt development server.
3. Open the Complaint page at `/complaint_form`.
4. Complete the complaint information.
5. Submit the form.
6. Verify the submission in your SmartFormify workflow.

## Customization

Edit `pages/complaint_form.vue` to customize:

- Complaint types
- Preferred resolution options
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

> Note: This form provides the complaint UI and endpoint submission. It does not create a complaint management system, ticket queue, notifications, or resolution workflow by itself.
