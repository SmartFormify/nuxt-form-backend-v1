# Idempotency-Key for Nuxt Form Submissions

When a client intentionally retries the same submission, send one stable `Idempotency-Key` header for that logical attempt. Do not generate a new key on every retry. This is an advanced pattern; the normal examples prevent accidental double-clicks by disabling the button.
