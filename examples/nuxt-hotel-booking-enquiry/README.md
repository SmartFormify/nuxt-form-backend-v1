# Nuxt Hotel Booking Enquiry Form

A basic Hotel Booking Enquiry form built with **Nuxt JS** and Vue that submits form data directly to a SmartFormify endpoint.

## Folder Structure

```text
nuxt-hotel-booking-enquiry/
├── README.md
├── package.json
├── nuxt.config.ts
├── .env.example
├── pages/
│   └── index.vue
└── assets/
    └── style.css
```

## Form Fields

- Full Name
- Email
- Phone
- Check-in Date
- Check-out Date
- Number of Guests
- Number of Rooms
- Room Type
- Meal Preference
- Special Requests

## SmartFormify Setup

Configure the endpoint through a Nuxt environment variable.

Create a `.env` file:

```env
NUXT_PUBLIC_SMART_FORMIFY_ENDPOINT=https://api.smartformify.com/fe/YOUR_ENDPOINT_KEY
```

Replace `YOUR_ENDPOINT_KEY` with your actual SmartFormify endpoint key.

The Nuxt application reads the endpoint through `runtimeConfig.public`:

```ts
runtimeConfig: {
  public: {
    smartFormifyEndpoint:
      process.env.NUXT_PUBLIC_SMART_FORMIFY_ENDPOINT || ''
  }
}
```

There is also a placeholder fallback in `pages/index.vue`:

```text
https://api.smartformify.com/fe/YOUR_ENDPOINT_KEY
```

## Submission

The form uses Nuxt `$fetch` with:

```js
method: 'POST'
```

The submitted payload follows the SmartFormify structure:

```json
{
  "data": {
    "name": "Guest Name",
    "email": "guest@example.com",
    "phone": "1234567890",
    "check_in": "2026-09-01",
    "check_out": "2026-09-05",
    "guests": "2",
    "rooms": "1",
    "room_type": "deluxe",
    "meal_preference": "breakfast",
    "special_requests": "Late check-in",
    "notes_hqse": ""
  }
}
```

The `notes_hqse` field is the SmartFormify silent bot-check field. Keep this field present and empty. Do not validate it as a normal user field.

## Submission Flow

```text
Nuxt Hotel Booking Enquiry Form
             ↓
Nuxt $fetch POST
             ↓
SmartFormify Endpoint
             ↓
Submission Processing
             ↓
Email / Notifications / Response
```

If SmartFormify returns a redirect action with `redirect_url`, Nuxt redirects the user to that URL.

If SmartFormify returns `thank_you_content`, it is displayed after successful submission.

## CSS

All visual styling is contained in:

```text
assets/style.css
```

Nuxt loads the stylesheet globally through `nuxt.config.ts`:

```ts
css: ['~/assets/style.css']
```

The Astro `<link rel="stylesheet">` approach is not used.

## Setup

Install dependencies:

```bash
npm install
```

Start the Nuxt development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Generate a static site:

```bash
npm run generate
```

## Requirements

- Node.js
- Nuxt JS
- SmartFormify endpoint URL
- No additional packages

## Testing

1. Configure the SmartFormify endpoint.
2. Open the Hotel Booking Enquiry page.
3. Enter the guest information.
4. Select check-in and check-out dates.
5. Select the number of guests and rooms.
6. Select the room type.
7. Select the meal preference.
8. Add any special requests.
9. Submit the form.
10. Verify the submission in SmartFormify.

> Note: This form provides the hotel booking enquiry UI and endpoint submission. It does not check real-time room availability, process payments, create reservations, or manage hotel inventory unless those workflows are configured through the connected endpoint.

## Customization

Edit `pages/index.vue` to customize:

- Date fields
- Guest and room options
- Room types
- Meal preferences
- Form fields
- Labels
- Placeholders
- Button text
- SmartFormify endpoint
- Success and error messages

Edit `assets/style.css` to customize:

- Colors
- Typography
- Spacing
- Form width
- Input styles
- Button styles
- Responsive behavior

## Astro to Nuxt Conversion

This is a complete conversion of the original Astro form into Nuxt JS.

The Astro-specific implementation has been replaced with:

- `hotel_booking_enquiry.astro` → `pages/index.vue`
- Astro endpoint constant → Nuxt `runtimeConfig`
- HTML form submission → Vue `@submit.prevent`
- Direct POST → Nuxt `$fetch`
- Astro stylesheet link → Nuxt global CSS configuration
- Astro page structure → Vue Single File Component
- Static HTML form state → Vue `reactive()` state
- Astro setup documentation → Nuxt setup and commands

The form purpose, field list, SmartFormify integration, hidden bot-check field, and original CSS styling are retained.
