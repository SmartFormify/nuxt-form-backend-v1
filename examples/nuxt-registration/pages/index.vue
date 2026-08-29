<script setup>
useHead({
  title: 'Event registration'
})

const config = useRuntimeConfig()

const endpointUrl =
  config.public.smartFormifyEndpoint ||
  'https://api.smartformify.com/fe/YOUR_ENDPOINT_KEY'
</script>

<template>
  <main class="registration-page">
    <section class="registration-card">
      <header class="form-header">
        <h1>Event registration</h1>
        <p>
          Reserve a place. This form does not create an account
          or collect credentials.
        </p>
      </header>

      <form
        :action="endpointUrl"
        method="POST"
        class="registration-form"
      >
        <div class="form-row">
          <label class="form-group" for="first_name">
            First name
            <input
              id="first_name"
              name="first_name"
              type="text"
              autocomplete="given-name"
              required
            >
          </label>

          <label class="form-group" for="last_name">
            Last name
            <input
              id="last_name"
              name="last_name"
              type="text"
              autocomplete="family-name"
              required
            >
          </label>
        </div>

        <label class="form-group" for="email">
          Email address
          <input
            id="email"
            name="email"
            type="email"
            autocomplete="email"
            required
          >
        </label>

        <label class="form-group" for="event">
          Event
          <select id="event" name="event" required>
            <option value="">Choose an event</option>
            <option value="Product workshop">Product workshop</option>
            <option value="Community meetup">Community meetup</option>
          </select>
        </label>

        <label class="form-group" for="accessibility_notes">
          Accessibility or dietary notes
          <textarea
            id="accessibility_notes"
            name="accessibility_notes"
          />
        </label>

        <label class="terms-group">
          <input
            type="checkbox"
            name="updates"
            value="yes"
          >
          Send me occasional event updates.
        </label>

        <button type="submit" class="submit-button">
          Register for event
        </button>
      </form>
    </section>
  </main>
</template>
