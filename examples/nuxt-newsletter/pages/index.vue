<script setup>
import { reactive, ref } from 'vue'

useHead({
  title: 'Newsletter Signup'
})

const config = useRuntimeConfig()

const endpointUrl =
  config.public.smartFormifyEndpoint ||
  'https://api.smartformify.com/fe/YOUR_ENDPOINT_KEY'

const form = reactive({
  email: '',
  name: '',
  consent: false,
  notes_hqse: ''
})

const isSubmitting = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const submitForm = async () => {
  successMessage.value = ''
  errorMessage.value = ''
  isSubmitting.value = true

  try {
    const response = await $fetch(endpointUrl, {
      method: 'POST',
      body: {
        data: {
          email: form.email,
          name: form.name,
          consent: form.consent ? 'accepted' : '',
          notes_hqse: form.notes_hqse
        }
      }
    })

    if (response?.data?.next_action === 'redirect' && response.data.redirect_url) {
      await navigateTo(response.data.redirect_url, { external: true })
      return
    }

    successMessage.value =
      response?.data?.thank_you_content ||
      'Thank you for subscribing to our newsletter.'

    Object.assign(form, {
      email: '',
      name: '',
      consent: false,
      notes_hqse: ''
    })
  } catch (error) {
    console.error('Newsletter subscription failed:', error)
    errorMessage.value = 'Unable to subscribe right now. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <main class="newsletter-page">
    <section class="newsletter-card">
      <div class="newsletter-icon" aria-hidden="true">
        ✉
      </div>

      <div class="newsletter-content">
        <span class="eyebrow">
          Stay in the loop
        </span>

        <h1>
          Get the latest updates
        </h1>

        <p>
          Subscribe to our newsletter for product updates,
          useful insights, and news delivered straight to your inbox.
        </p>

        <form class="newsletter-form" @submit.prevent="submitForm">
          <div v-if="successMessage" class="form-message success-message" role="status">
            {{ successMessage }}
          </div>

          <div v-if="errorMessage" class="form-message error-message" role="alert">
            {{ errorMessage }}
          </div>

          <div class="form-group">
            <label for="email">
              Email Address <span>*</span>
            </label>

            <input
              id="email"
              v-model="form.email"
              type="email"
              name="email"
              placeholder="you@example.com"
              autocomplete="email"
              required
            >
          </div>

          <div class="form-group">
            <label for="name">
              Name
            </label>

            <input
              id="name"
              v-model="form.name"
              type="text"
              name="name"
              placeholder="Your name"
              autocomplete="name"
            >
          </div>

          <div class="consent-group">
            <input
              id="consent"
              v-model="form.consent"
              type="checkbox"
              name="consent"
              value="accepted"
              required
            >

            <label for="consent">
              I agree to receive newsletters and updates.
            </label>
          </div>

          <!-- SmartFormify silent bot-check field. Keep this field empty. -->
          <input
            v-model="form.notes_hqse"
            type="text"
            name="notes_hqse"
            tabindex="-1"
            autocomplete="off"
            aria-hidden="true"
            class="honeypot"
          >

          <button
            type="submit"
            class="subscribe-button"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? 'Subscribing...' : 'Subscribe to Newsletter' }}
          </button>
        </form>

        <p class="privacy-note">
          You can unsubscribe at any time. We respect your privacy.
        </p>
      </div>
    </section>
  </main>
</template>
