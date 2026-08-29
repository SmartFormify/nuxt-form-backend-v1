# Nuxt Event Registration Form

A basic Event Registration form built with Nuxt.js that submits form data directly to a SmartFormify endpoint.

## Folder Structure

```text
event-registration-form/
├── README.md
├── assets/
│   └── style.css
└── pages/
    └── event_registration.vue
```

## Form Fields

- Full Name
- Email
- Phone
- Event
- Event Date
- Number of Attendees
- Ticket Type
- Company / Organization
- Additional Information

## SmartFormify Setup

Open:

```text
pages/event_registration.vue
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
Nuxt Event Registration Form
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

Place `event_registration.vue` inside the Nuxt project's:

```text
pages/
```

directory.

Nuxt automatically creates the route:

```text
/event_registration
```

## Requirements

- Nuxt
- Vue
- SmartFormify endpoint URL
- No additional packages

## Testing

1. Configure the SmartFormify endpoint.
2. Start the Nuxt development server.
3. Open the Event Registration page at `/event_registration`.
4. Enter the attendee information.
5. Select an event.
6. Choose the event date.
7. Select the number of attendees.
8. Select the ticket type.
9. Optionally enter company / organization and additional information.
10. Submit the form.
11. Verify the submission in your SmartFormify workflow.

> Note: This form provides the event registration UI and endpoint submission. It does not manage event capacity, ticket inventory, payments, confirmations, or attendee records unless those workflows are configured through the connected endpoint.

## Customization

Edit `pages/event_registration.vue` to customize:

- Event options
- Event dates
- Attendee options
- Ticket types
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
