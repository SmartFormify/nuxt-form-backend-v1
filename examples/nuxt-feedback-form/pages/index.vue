<script setup>
import { reactive, ref } from 'vue'

useHead({
  title: 'Share Your Feedback'
})

const config = useRuntimeConfig()

const endpointUrl = config.public.smartFormifyEndpoint ||
  'https://api.smartformify.com/fe/YOUR_ENDPOINT_KEY'

const form = reactive({
  name: '',
  email: '',
  feedback_type: '',
  rating: '',
  message: '',
  recommendation: '',
  contact_permission: false,
  notes_hqse: ''
})

const isSubmitting = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const submitFeedback = async () => {
  isSubmitting.value = true
  successMessage.value = ''
  errorMessage.value = ''

  try {
    const response = await $fetch(endpointUrl, {
      method: 'POST',
      body: {
        data: {
          name: form.name,
          email: form.email,
          feedback_type: form.feedback_type,
          rating: form.rating,
          message: form.message,
          recommendation: form.recommendation,
          contact_permission: form.contact_permission ? 'yes' : '',
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
      'Thank you for your feedback. We appreciate you taking the time to share your experience.'

    form.name = ''
    form.email = ''
    form.feedback_type = ''
    form.rating = ''
    form.message = ''
    form.recommendation = ''
    form.contact_permission = false
    form.notes_hqse = ''
  } catch (error) {
    console.error('Feedback submission failed:', error)
    errorMessage.value = 'Unable to submit your feedback. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <main class="feedback-page">
    <section class="feedback-card">
      <div class="feedback-header">
        <div class="feedback-icon" aria-hidden="true">💬</div>

        <div>
          <span class="eyebrow">We value your opinion</span>
          <h1>Share your feedback</h1>
          <p>
            Tell us about your experience. Your feedback helps us
            improve our products and services.
          </p>
        </div>
      </div>

      <form class="feedback-form" @submit.prevent="submitFeedback">
        <div v-if="successMessage" class="form-message form-message-success" role="status">
          {{ successMessage }}
        </div>

        <div v-if="errorMessage" class="form-message form-message-error" role="alert">
          {{ errorMessage }}
        </div>

        <div class="section-header">
          <h2>Your information</h2>
          <p>Optional details so we can follow up with you.</p>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="name">Full Name</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              name="name"
              placeholder="John Doe"
              autocomplete="name"
            >
          </div>

          <div class="form-group">
            <label for="email">Email Address</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              name="email"
              placeholder="john@example.com"
              autocomplete="email"
            >
          </div>
        </div>

        <div class="section-header section-spacing">
          <h2>About your experience</h2>
          <p>Help us understand your experience.</p>
        </div>

        <div class="form-group">
          <label for="feedback_type">
            Feedback Type <span>*</span>
          </label>

          <select
            id="feedback_type"
            v-model="form.feedback_type"
            name="feedback_type"
            required
          >
            <option value="" disabled>Select feedback type</option>
            <option value="general">General Feedback</option>
            <option value="product">Product Feedback</option>
            <option value="service">Service Feedback</option>
            <option value="suggestion">Suggestion</option>
            <option value="bug">Report an Issue</option>
          </select>
        </div>

        <div class="form-group">
          <label>
            How would you rate your experience? <span>*</span>
          </label>

          <div class="rating-options">
            <label v-for="item in [
              { value: '1', text: 'Poor' },
              { value: '2', text: 'Fair' },
              { value: '3', text: 'Good' },
              { value: '4', text: 'Great' },
              { value: '5', text: 'Excellent' }
            ]" :key="item.value" class="rating-option">
              <input
                v-model="form.rating"
                type="radio"
                name="rating"
                :value="item.value"
                required
              >
              <span>{{ item.value }}</span>
              <small>{{ item.text }}</small>
            </label>
          </div>
        </div>

        <div class="form-group">
          <label for="message">
            Your Feedback <span>*</span>
          </label>

          <textarea
            id="message"
            v-model="form.message"
            name="message"
            placeholder="Tell us what you liked, what could be improved, or anything else you'd like to share..."
            required
          />
        </div>

        <div class="form-group">
          <label for="recommendation">Would you recommend us?</label>

          <select
            id="recommendation"
            v-model="form.recommendation"
            name="recommendation"
          >
            <option value="" disabled>Select an option</option>
            <option value="yes">Yes</option>
            <option value="maybe">Maybe</option>
            <option value="no">No</option>
          </select>
        </div>

        <div class="consent-group">
          <input
            id="contact_permission"
            v-model="form.contact_permission"
            type="checkbox"
            name="contact_permission"
            value="yes"
          >

          <label for="contact_permission">
            You may contact me about my feedback if further
            information is needed.
          </label>
        </div>

        <!-- SmartFormify silent bot-check field. Keep it empty. -->
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
          class="submit-button"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? 'Submitting...' : 'Submit Feedback' }}
        </button>
      </form>
    </section>
  </main>
</template>
