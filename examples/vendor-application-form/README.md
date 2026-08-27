# Nuxt Vendor application form Example

Collect supplier applications without sensitive financial data.

## Fields included

Contact name, email, company, product category, website, and capabilities.

## Run locally

```bash
pnpm install
cp .env.example .env
pnpm dev
```

Set `NUXT_PUBLIC_SMARTFORMIFY_ENDPOINT` to `https://api.smartformify.com/fe/YOUR_ENDPOINT_KEY` with your endpoint key. The runnable example uses TypeScript, `$fetch`, accessible labels, loading state, success feedback, and an actionable error message. This public endpoint URL should be restricted to your expected domains in SmartFormify.

## Related Nuxt form examples

See the [contact form](../contact-form/README.md), [error handling](../07-error-handling/README.md), and [form validation guide](../../docs/nuxt-form-validation.md).
