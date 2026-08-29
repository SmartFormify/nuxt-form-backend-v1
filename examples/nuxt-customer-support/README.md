# Nuxt Customer Support Form

A professional customer support form built with Nuxt.js using a Vue page component and an external CSS file.

## Folder Structure

```text
customer-support-form/
├── README.md
├── assets/
│   └── style.css
└── pages/
    └── customer_support.vue
```

## Form Fields

The form includes:

- First Name
- Last Name
- Email Address
- Phone Number
- Support Category
- Priority
- Order / Account ID
- Subject
- Support Message
- Additional Notes
- Contact Permission
- Submit Support Request button

## Required Fields

The following fields are required:

- First Name
- Last Name
- Email Address
- Support Category
- Priority
- Subject
- Support Message

The form uses native HTML `required` validation.

## SmartFormify Setup

Open:

```text
pages/customer_support.vue
```

Update:

```ts
const endpointUrl = "https://api.smartformify.com/fe/YOUR_ENDPOINT_KEY";
```

Replace the placeholder with your SmartFormify endpoint URL.

The form submits using:

```html
method="POST"
```

The submission flow is:

```text
Nuxt Customer Support Form
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

## Testing

1. Configure your SmartFormify endpoint URL.
2. Start the Nuxt development server.
3. Open the customer support page at `/customer_support`.
4. Complete the required support information.
5. Optionally enter phone number, Order / Account ID, and additional notes.
6. Select the contact permission option if needed.
7. Click **Submit Support Request**.
8. Verify the submission in your SmartFormify workflow.

> Note: This example provides the customer support form UI. It does not create support tickets, store requests, send emails, or provide a support dashboard unless those workflows are configured through the connected backend/endpoint.

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

Copy the files into your Nuxt project.

Place:

```text
customer_support.vue
```

inside:

```text
pages/
```

Nuxt automatically creates the page route:

```text
/customer_support
```

## Requirements

- Nuxt
- Vue
- SmartFormify endpoint URL
- No additional packages

## Customization

Edit `pages/customer_support.vue` to change:

- Support categories
- Priority options
- Form fields
- Labels
- Placeholders
- Button text
- Consent text
- SmartFormify endpoint URL

Edit `assets/style.css` to change:

- Colors
- Typography
- Spacing
- Card layout
- Form controls
- Button styling
- Responsive behavior
