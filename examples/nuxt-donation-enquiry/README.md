# Nuxt Donation Enquiry Form

A basic Donation Enquiry form built with Nuxt.js that submits form data directly to a SmartFormify endpoint.

## Folder Structure

```text
donation-enquiry-form/
├── README.md
├── assets/
│   └── style.css
└── pages/
    └── donation_enquiry.vue
```

## Form Fields

- Name
- Email
- Phone
- Donation Type
- Donation Amount
- Enquiry / Message

## SmartFormify Setup

Open:

```text
pages/donation_enquiry.vue
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
Nuxt Donation Enquiry Form
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

Place `donation_enquiry.vue` inside the Nuxt project's:

```text
pages/
```

directory.

Nuxt automatically creates the route:

```text
/donation_enquiry
```

## Requirements

- Nuxt
- Vue
- SmartFormify endpoint URL
- No additional packages

## Testing

1. Configure the SmartFormify endpoint.
2. Start the Nuxt development server.
3. Open the Donation Enquiry page at `/donation_enquiry`.
4. Enter the donor information.
5. Select the donation type.
6. Enter the donation amount if applicable.
7. Add the enquiry or message.
8. Submit the form.
9. Verify the submission in your SmartFormify workflow.

> Note: This form provides the donation enquiry UI and endpoint submission. It does not process payments, create donations, issue receipts, or manage donor records unless those workflows are configured through the connected endpoint.

## Customization

Edit `pages/donation_enquiry.vue` to customize:

- Donation type options
- Donation amount options
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
