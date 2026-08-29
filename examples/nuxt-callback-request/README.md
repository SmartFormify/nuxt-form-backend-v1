# Nuxt Callback Request Form

A professional callback request form built with Nuxt.js using a Vue page component and an external CSS file.

## Folder Structure

```text
callback-request-form/
├── README.md
├── assets/
│   └── style.css
└── pages/
    └── callback_request.vue
```

## Form Fields

- First Name
- Last Name
- Email Address
- Phone Number
- Reason for Callback
- Preferred Date
- Preferred Time
- Preferred Contact Method
- Message
- Consent Checkbox

## Required Fields

The following fields are required:

- First Name
- Last Name
- Email Address
- Phone Number
- Reason for Callback
- Preferred Date
- Preferred Time
- Preferred Contact Method
- Consent

The form uses native HTML `required` validation and submits using `POST`.

## SmartFormify Setup

Open:

```text
pages/callback_request.vue
```

Update:

```ts
const endpointUrl = "https://api.smartformify.com/fe/YOUR_ENDPOINT_KEY"
```

Replace the placeholder with your actual SmartFormify Endpoint URL.

Submission flow:

```text
Nuxt Callback Request Form
            ↓
SmartFormify Endpoint
            ↓
Submission Processing
            ↓
Email / Notifications / Response
```

## Hidden Field

Keep the SmartFormify silent bot-check field present and empty:

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

## Testing

1. Configure the SmartFormify endpoint.
2. Start the Nuxt development server.
3. Open the callback request page at `/callback_request`.
4. Complete the required callback information.
5. Select the reason, preferred date, time, and contact method.
6. Add an optional message.
7. Accept the consent checkbox.
8. Click **Request a Callback**.

> Note: This form provides the callback request UI and endpoint submission. It does not schedule calls, store callback requests, send notifications, or manage a callback queue unless those workflows are configured through the connected endpoint.

## CSS

All styling is in:

```text
assets/style.css
```

The Nuxt page references it with:

```vue
<style src="~/assets/style.css"></style>
```

## Setup

Place `callback_request.vue` inside the Nuxt project's:

```text
pages/
```

directory.

Nuxt automatically creates the route:

```text
/callback_request
```

## Requirements

- Nuxt
- Vue
- SmartFormify endpoint URL
- No additional packages

## Customization

Edit `pages/callback_request.vue` to customize:

- Callback reasons
- Available dates
- Available time options
- Contact methods
- Form fields
- Labels
- Placeholders
- Button text
- Consent text
- SmartFormify endpoint

Edit `assets/style.css` to customize:

- Colors
- Typography
- Spacing
- Layout
- Form controls
- Buttons
- Responsive behavior
