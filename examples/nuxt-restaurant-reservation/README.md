# Nuxt Restaurant Reservation Form

A basic Restaurant Reservation form built with **Nuxt JS** and Vue that submits reservation request data directly to a SmartFormify endpoint.

## Folder Structure

```text
nuxt-restaurant-reservation/
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
- Reservation Date
- Reservation Time
- Number of Guests
- Seating Preference
- Special Occasion
- Special Requests

## SmartFormify Setup

Configure the endpoint through a Nuxt environment variable.

Create a `.env` file:

```env
NUXT_PUBLIC_SMART_FORMIFY_ENDPOINT=https://api.smartformify.com/fe/YOUR_ENDPOINT_KEY
```

Replace `YOUR_ENDPOINT_KEY` with your actual SmartFormify endpoint.

Nuxt reads the endpoint through:

```ts
runtimeConfig: {
  public: {
    smartFormifyEndpoint:
      process.env.NUXT_PUBLIC_SMART_FORMIFY_ENDPOINT || ''
  }
}
```

## Submission

The form submits directly using Nuxt `$fetch` with a `POST` request:

```text
Nuxt Restaurant Reservation Form
             ↓
Nuxt $fetch POST
             ↓
SmartFormify Endpoint
             ↓
Submission Processing
             ↓
Email / Notifications / Response
```

The payload uses the SmartFormify `data` structure and includes the reservation fields plus `notes_hqse`.

If SmartFormify returns a redirect action with a `redirect_url`, Nuxt redirects the user to that URL.

If SmartFormify returns `thank_you_content`, it is displayed after successful submission.

## Hidden Field

Keep the SmartFormify silent bot-check field present and empty:

```html
<input name="notes_hqse" ...>
```

Do not validate `notes_hqse` as a normal user field.

## CSS

All styling is contained in:

```text
assets/style.css
```

Nuxt loads the stylesheet globally through `nuxt.config.ts`:

```ts
css: ['~/assets/style.css']
```

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
2. Open the Restaurant Reservation page.
3. Enter the guest information.
4. Choose a reservation date and time.
5. Select the number of guests.
6. Select a seating preference.
7. Select a special occasion if applicable.
8. Add special requests.
9. Submit the form.
10. Verify the submission in your SmartFormify workflow.

> Note: This form provides the reservation UI and endpoint submission. It does not check real-time table availability, create reservations in a restaurant system, process payments, or manage seating unless those workflows are configured through the connected endpoint.

## Customization

Edit `pages/index.vue` to customize:

- Date and time fields
- Guest options
- Seating preferences
- Special occasions
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

This is a complete conversion of the original Astro Restaurant Reservation Form into Nuxt JS.

Astro-specific implementation has been replaced with:

- `restaurant_reservation.astro` → `pages/index.vue`
- Astro endpoint constant → Nuxt `runtimeConfig`
- HTML form submission → Vue `@submit.prevent`
- POST submission → Nuxt `$fetch`
- Astro stylesheet link → Nuxt global CSS configuration
- Astro page/head → Nuxt `useHead`
- Static form state → Vue `reactive()` state
- Astro setup commands → Nuxt setup and commands

The original reservation fields, guest options, seating preferences, special occasions, SmartFormify integration, hidden bot-check field, and visual styling are retained.
