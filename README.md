# Nuxt Form Backend Examples

Practical Nuxt 4 form examples and tutorials for connecting website forms to a hosted form endpoint. Learn Nuxt submission with TypeScript, `$fetch`, runtimeConfig, Nuxt UI, Zod and VeeValidate; then adapt ready-made contact, booking, quote, registration, application, survey, and lead forms.

![Nuxt Form Backend Examples](assets/nuxt-form-backend-banner.svg)

## Quick start

```bash
git clone https://github.com/SmartFormify/nuxt-form-backend-v1.git
cd nuxt-form-backend-v1/examples/contact-form
pnpm install
cp .env.example .env
pnpm dev
```

```env
NUXT_PUBLIC_SMARTFORMIFY_ENDPOINT=https://api.smartformify.com/fe/YOUR_ENDPOINT_KEY
```

Create an endpoint at [SmartFormify](https://www.smartformify.com/create-endpoint). Its submission URL is intended to be browser-visible, so add the local, preview, and production domains you expect to use in endpoint settings.

## What is a Nuxt form backend?

A form needs a destination that receives and processes submissions. You can build that destination with a server route, or submit directly to a hosted endpoint. These examples use SmartFormify Form Endpoints so a normal browser form does not need a separately maintained form API.

## Connect a Nuxt form in three steps

1. Create an endpoint and copy its public URL.
2. Put it in `NUXT_PUBLIC_SMARTFORMIFY_ENDPOINT`.
3. Submit `{ data: form }` with `$fetch` from an event handler.

For an event-triggered submit, `$fetch` is normally the right primitive. [`useFetch`](https://nuxt.com/docs/4.x/api/composables/use-fetch) is an SSR-friendly composable for setup, plugins, and middleware.

## Core Nuxt form tutorials

| Tutorial | What it teaches |
| --- | --- |
| [Basic contact form](examples/01-basic-contact-form/README.md) | `reactive`, `$fetch`, async state |
| [TypeScript form](docs/nuxt-typescript-form.md) | Typed fields and response narrowing |
| [Nuxt $fetch form](docs/nuxt-fetch-form.md) | Correct event submission pattern |
| [Runtime config](docs/nuxt-runtime-config-form.md) | Public endpoint configuration |
| [Native form action](examples/04-native-form-action/README.md) | JavaScript-free POST |
| [Error handling](examples/07-error-handling/README.md) | Retrying without losing input |
| [Redirect handling](examples/08-success-redirect/README.md) | `redirect_url` and thank-you content |
| [Server API route](docs/nuxt-server-route-form.md) | Optional forwarding route |
| [Validation](docs/nuxt-form-validation.md) | Native, Zod, VeeValidate, Nuxt UI |

## Popular Nuxt form examples

| Example | Submission | Validation | Use case |
| --- | --- | --- | --- |
| [Contact form](examples/contact-form/README.md) | `$fetch` | Native | General contact |
| [Quote request](examples/quote-request-form/README.md) | `$fetch` | Native | Sales discovery |
| [Booking request](examples/booking-request-form/README.md) | `$fetch` | Native | Booking enquiry |
| [Event registration](examples/event-registration-form/README.md) | `$fetch` | Native | Attendees |
| [Job application](examples/job-application-form/README.md) | `$fetch` | Native | Recruitment |
| [Feedback form](examples/feedback-form/README.md) | `$fetch` | Native | Product feedback |
| [Multi-step lead form](examples/multi-step-lead-form/README.md) | `$fetch` | Per step | Qualified leads |

Browse the `examples/` directory for newsletters, waitlists, demos, applications, real-estate enquiries, support, and other distinct templates.

## Validation and UI integrations

The repository documents [Zod](docs/nuxt-zod-form.md), [VeeValidate](docs/nuxt-vee-validate-form.md), and [Nuxt UI](docs/nuxt-ui-form.md). Keep client validation focused on user feedback; still handle endpoint failures and configured spam/domain controls.

## FAQ

### Does a Nuxt contact form need a backend?

It needs somewhere to receive submissions. It does not mean you must build and maintain your own server implementation.

### Is `runtimeConfig.public` secret?

No. It is exposed to client code. A SmartFormify submission key is designed to be public; restrict expected domains instead.

### Can I use a normal HTML form action?

Yes. Use a native POST when in-page loading, errors, and response rendering are not needed. The endpoint can redirect or display configured thank-you content.

### Do I need a Nuxt server route?

No. Add one only for real server-side work such as validating against your own system or transforming data. A proxy does not make a public endpoint URL secret.

## Spam protection and limits

SmartFormify documents domain restrictions, blocked domains/IPs/phrases, link filtering, and rate limits. At the time of writing, endpoint defaults allow 30 fields, 80-character field names, 5,000-character text values, and 128 KB bodies. Keep forms within those limits and test from allowed local or preview domains.

## Contributing and license

See [CONTRIBUTING.md](CONTRIBUTING.md) and [SECURITY.md](SECURITY.md). MIT licensed; see [LICENSE](LICENSE).
