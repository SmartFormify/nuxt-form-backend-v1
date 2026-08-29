# Nuxt Booking Form

A professional booking form built with the Nuxt framework using a Vue page component and an external CSS file.

## Folder Structure

```text
booking-form/
├── README.md
├── assets/
│   └── style.css
└── pages/
    └── booking.vue
```

## Form Fields

The booking form includes:

- First Name
- Last Name
- Email Address
- Phone Number
- Service
- Preferred Date
- Preferred Time
- Number of People
- Notes
- Booking consent
- Request Appointment button

Required fields include:

- First Name
- Last Name
- Email Address
- Phone Number
- Service
- Preferred Date
- Preferred Time
- Booking consent

The form uses native HTML `required` validation.

## SmartFormify Setup

Open:

```text
pages/booking.vue
```

Update:

```ts
const endpointUrl =
  "https://api.smartformify.com/fe/YOUR_ENDPOINT_KEY";
```

Replace the placeholder with your SmartFormify endpoint URL.

The form submits directly to the endpoint using:

```html
method="POST"
```

The submission flow is:

```text
Nuxt Booking Form
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

## Availability

This form is a booking request UI only. It does **not** check real-time availability, store appointments, send confirmation emails, or manage a calendar unless those workflows are configured through the connected backend/endpoint.

## CSS

All styling is contained in:

```text
assets/style.css
```

The Nuxt page imports the stylesheet with:

```vue
<style src="~/assets/style.css"></style>
```

## Setup

Create or open a Nuxt project, then copy the files into the matching locations.

Place:

```text
booking.vue
```

inside:

```text
pages/
```

Nuxt will automatically create a route for the page. For example:

```text
/pages/booking.vue
```

is available at:

```text
/booking
```

## Requirements

- Nuxt
- Vue
- SmartFormify endpoint URL
- No additional packages

## Testing

1. Configure your SmartFormify endpoint URL.
2. Start your Nuxt development server.
3. Open the booking page at `/booking`.
4. Enter the required contact information.
5. Select a service.
6. Choose a preferred date and time.
7. Select the number of people.
8. Add optional notes.
9. Accept the booking consent.
10. Click **Request Appointment**.

## Customization

Edit `pages/booking.vue` to change:

- Form fields
- Service options
- Available time options
- Number of people options
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
