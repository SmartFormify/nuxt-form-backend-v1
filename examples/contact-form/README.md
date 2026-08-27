# Nuxt Contact Form Example

A polished Nuxt 4 contact form using TypeScript, `reactive()` and `$fetch`. It keeps the browser-visible endpoint in public runtime config, shows loading and server errors, and resets after a successful submission.

## Fields included

Name, email, subject and message.

## Project setup

```bash
pnpm install
cp .env.example .env
pnpm dev
```

Set `NUXT_PUBLIC_SMARTFORMIFY_ENDPOINT` to the endpoint URL created at [SmartFormify](https://www.smartformify.com/create-endpoint). This URL is intentionally public browser configuration, not a secret.

## How it works

The submit handler posts `{ data: form }` with `$fetch`. A failed HTTP request or failed endpoint response retains the entered values and shows `result.message`; a success uses the configured redirect or thank-you content.

## Related examples

See [TypeScript contact form](../02-typescript-contact-form/README.md), [error handling](../07-error-handling/README.md), and the [Nuxt contact-form guide](../../docs/nuxt-contact-form.md).
