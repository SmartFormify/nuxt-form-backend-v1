# Nuxt Course Registration Form

A basic Course Registration form built with Nuxt.js that submits form data directly to a SmartFormify endpoint.

## Folder Structure

```text
course-registration-form/
├── README.md
├── assets/
│   └── style.css
└── pages/
    └── course_registration.vue
```

## Form Fields

- Full Name
- Email
- Phone
- Course
- Highest Education
- Preferred Learning Mode
- Preferred Start Date
- Additional Information

## SmartFormify Setup

Open:

```text
pages/course_registration.vue
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
Nuxt Course Registration Form
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

Place `course_registration.vue` inside the Nuxt project's:

```text
pages/
```

directory.

Nuxt automatically creates the route:

```text
/course_registration
```

## Requirements

- Nuxt
- Vue
- SmartFormify endpoint URL
- No additional packages

## Testing

1. Configure the SmartFormify endpoint.
2. Start the Nuxt development server.
3. Open the Course Registration page at `/course_registration`.
4. Complete the registration information.
5. Select a course.
6. Select the highest education level.
7. Select the preferred learning mode.
8. Choose a preferred start date.
9. Add optional information.
10. Submit the form.
11. Verify the submission in your SmartFormify workflow.

> Note: This form provides the course registration UI and endpoint submission. It does not enroll students, process payments, manage course capacity, or maintain a registration system unless those workflows are configured through the connected endpoint.

## Customization

Edit `pages/course_registration.vue` to customize:

- Course options
- Education options
- Learning mode options
- Available dates
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
