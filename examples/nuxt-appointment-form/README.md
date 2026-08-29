# Nuxt Appointment Form

A professional appointment form built with the Nuxt framework using a Vue `.vue` page and an external CSS file.

## Folder Structure

```text
appointment-form/
├── README.md
├── assets/
│   └── style.css
└── pages/
    └── appointment.vue
```

## Form Fields

The appointment form includes:

- First Name
- Last Name
- Email Address
- Phone Number
- Appointment Type
- Preferred Date
- Preferred Time
- Preferred Contact Method
- Notes
- Appointment consent
- Schedule Appointment button

Required fields include:

- First Name
- Last Name
- Email Address
- Phone Number
- Appointment Type
- Preferred Date
- Preferred Time
- Preferred Contact Method
- Appointment consent

The form uses native HTML `required` validation.

## SmartFormify Setup

Open:

```text
pages/appointment.vue
```

Update:

```ts
const endpointUrl = 'https://api.smartformify.com/fe/YOUR_ENDPOINT_KEY'
```

Replace the placeholder with your SmartFormify endpoint URL.

The form uses:

```html
method="POST"
```

The submission flow is:

```text
Nuxt Appointment Form
        ↓
SmartFormify Endpoint
        ↓
Submission Processing
        ↓
Email / Notifications / Response
```

## Hidden Field

The original Astro README references a SmartFormify silent bot-check field but does not provide its markup. The source form itself does not currently contain that hidden field, so this Nuxt conversion does not invent or add markup that was not present in the source.

## Availability

This form is an appointment request UI only. It does **not** check real-time availability, store appointments, send confirmation emails, or connect to a calendar unless those workflows are configured through the connected backend/endpoint.

## CSS

All styling is contained in:

```text
assets/style.css
```

Nuxt automatically processes files imported from the `assets` directory. Add the stylesheet globally in `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  css: ['~/assets/style.css'],
})
```

Alternatively, the page can use a direct stylesheet import if you prefer page-level styling.

## Setup

Copy the files into your Nuxt project.

Place `appointment.vue` under the project's `pages/` directory. The file location creates the `/appointment` page URL.

Add the global CSS configuration shown above to `nuxt.config.ts`.

## Requirements

- Nuxt
- SmartFormify endpoint URL
- No additional packages

## Testing

1. Configure your SmartFormify endpoint URL.
2. Start your Nuxt application.
3. Open the `/appointment` page.
4. Enter the required contact information.
5. Select an appointment type.
6. Choose a preferred date and time.
7. Select a preferred contact method.
8. Add optional notes.
9. Accept the appointment consent.
10. Click **Schedule Appointment**.

## Customization

Edit `pages/appointment.vue` to change:

- Form fields
- Appointment type options
- Available time options
- Contact method options
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
