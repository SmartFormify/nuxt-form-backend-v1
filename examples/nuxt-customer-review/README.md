# Nuxt Customer Review Form

A basic Customer Review form built with Nuxt.js that submits form data directly to a SmartFormify endpoint.

## Folder Structure

```text
customer-review-form/
├── README.md
├── assets/
│   └── style.css
└── pages/
    └── customer_review.vue
```

## Form Fields

- Full Name
- Email
- Overall Rating
- Service / Product
- Review
- Would You Recommend Us?

## SmartFormify Setup

Open:

```text
pages/customer_review.vue
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
Nuxt Customer Review Form
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

Place `customer_review.vue` inside the Nuxt project's:

```text
pages/
```

directory.

Nuxt automatically creates the route:

```text
/customer_review
```

## Requirements

- Nuxt project
- SmartFormify endpoint URL
- No additional packages

## Testing

1. Configure the SmartFormify endpoint.
2. Start the Nuxt development server.
3. Open the Customer Review page at `/customer_review`.
4. Enter the customer information.
5. Select an overall rating.
6. Enter the service or product.
7. Enter the review.
8. Select whether you would recommend the business.
9. Submit the form.
10. Verify the submission in your SmartFormify workflow.

> Note: This form provides the customer review UI and endpoint submission. It does not publish reviews, calculate review statistics, or provide a review management system unless those workflows are configured through the connected endpoint.

## Customization

Edit `pages/customer_review.vue` to customize:

- Rating options
- Service / Product options
- Recommendation options
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
