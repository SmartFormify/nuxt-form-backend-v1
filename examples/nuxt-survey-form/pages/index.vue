<script setup>
import { reactive, ref } from 'vue'

useHead({
  title: 'Customer Survey'
})

const config = useRuntimeConfig()

const endpointUrl =
  config.public.smartFormifyEndpoint ||
  'https://api.smartformify.com/fe/YOUR_ENDPOINT_KEY'

const form = reactive({
  name: '',
  email: '',
  satisfaction: '',
  product_usage: '',
  ease_of_use: '',
  best_part: '',
  improvement: '',
  recommend: '',
  additional_comments: '',
  contact_permission: false,
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
          name: form.name,
          email: form.email,
          satisfaction: form.satisfaction,
          product_usage: form.product_usage,
          ease_of_use: form.ease_of_use,
          best_part: form.best_part,
          improvement: form.improvement,
          recommend: form.recommend,
          additional_comments: form.additional_comments,
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
      'Thank you. Your survey response has been submitted successfully.'

    Object.assign(form, {
      name: '',
      email: '',
      satisfaction: '',
      product_usage: '',
      ease_of_use: '',
      best_part: '',
      improvement: '',
      recommend: '',
      additional_comments: '',
      contact_permission: false,
      notes_hqse: ''
    })
  } catch (error) {
    console.error('Survey submission failed:', error)
    errorMessage.value = 'Unable to submit your survey. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <main class="survey-page">
    <section class="survey-card">
      <div class="survey-header">
        <div class="survey-icon">✓</div>

        <div>
          <span class="eyebrow">Customer Survey</span>

          <h1>We'd love your feedback</h1>

          <p>
            Take a few minutes to share your experience.
            Your feedback helps us improve our products and services.
          </p>
        </div>
      </div>

      <form class="survey-form" @submit.prevent="submitForm">
        <div v-if="successMessage" class="form-message success-message" role="status">
          {{ successMessage }}
        </div>

        <div v-if="errorMessage" class="form-message error-message" role="alert">
          {{ errorMessage }}
        </div>

        <div class="section-header">
          <h2>About you</h2>
          <p>Optional information to help us understand your response.</p>
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
          <h2>Overall experience</h2>
          <p>Tell us how you feel about your overall experience.</p>
        </div>

        <div class="form-group">
          <label>
            How satisfied are you with our service? <span>*</span>
          </label>

          <div class="rating-options">
            <label class="rating-option">
              <input
                v-model="form.satisfaction"
                type="radio"
                name="satisfaction"
                value="very-dissatisfied"
                required
              >
              <span>1</span>
              <small>Very dissatisfied</small>
            </label>

            <label class="rating-option">
              <input
                v-model="form.satisfaction"
                type="radio"
                name="satisfaction"
                value="dissatisfied"
              >
              <span>2</span>
              <small>Dissatisfied</small>
            </label>

            <label class="rating-option">
              <input
                v-model="form.satisfaction"
                type="radio"
                name="satisfaction"
                value="neutral"
              >
              <span>3</span>
              <small>Neutral</small>
            </label>

            <label class="rating-option">
              <input
                v-model="form.satisfaction"
                type="radio"
                name="satisfaction"
                value="satisfied"
              >
              <span>4</span>
              <small>Satisfied</small>
            </label>

            <label class="rating-option">
              <input
                v-model="form.satisfaction"
                type="radio"
                name="satisfaction"
                value="very-satisfied"
              >
              <span>5</span>
              <small>Very satisfied</small>
            </label>
          </div>
        </div>

        <div class="form-group">
          <label for="product_usage">
            How often do you use our product? <span>*</span>
          </label>

          <select
            id="product_usage"
            v-model="form.product_usage"
            name="product_usage"
            required
          >
            <option value="" disabled>Select an option</option>
            <option value="daily">Daily</option>
            <option value="weekly">Several times a week</option>
            <option value="monthly">Several times a month</option>
            <option value="rarely">Rarely</option>
            <option value="first-time">This is my first time</option>
          </select>
        </div>

        <div class="form-group">
          <label>
            How easy was it to use our product? <span>*</span>
          </label>

          <div class="radio-list">
            <label class="radio-item">
              <input
                v-model="form.ease_of_use"
                type="radio"
                name="ease_of_use"
                value="very-easy"
                required
              >
              <span>Very easy</span>
            </label>

            <label class="radio-item">
              <input
                v-model="form.ease_of_use"
                type="radio"
                name="ease_of_use"
                value="easy"
              >
              <span>Easy</span>
            </label>

            <label class="radio-item">
              <input
                v-model="form.ease_of_use"
                type="radio"
                name="ease_of_use"
                value="neutral"
              >
              <span>Neither easy nor difficult</span>
            </label>

            <label class="radio-item">
              <input
                v-model="form.ease_of_use"
                type="radio"
                name="ease_of_use"
                value="difficult"
              >
              <span>Difficult</span>
            </label>

            <label class="radio-item">
              <input
                v-model="form.ease_of_use"
                type="radio"
                name="ease_of_use"
                value="very-difficult"
              >
              <span>Very difficult</span>
            </label>
          </div>
        </div>

        <div class="section-header section-spacing">
          <h2>Your thoughts</h2>
          <p>Help us understand what we can do better.</p>
        </div>

        <div class="form-group">
          <label for="best_part">
            What do you like most about our product?
          </label>

          <textarea
            id="best_part"
            v-model="form.best_part"
            name="best_part"
            placeholder="Tell us what you enjoy most..."
          />
        </div>

        <div class="form-group">
          <label for="improvement">
            What could we improve?
          </label>

          <textarea
            id="improvement"
            v-model="form.improvement"
            name="improvement"
            placeholder="Share any suggestions or areas for improvement..."
          />
        </div>

        <div class="form-group">
          <label for="recommend">
            How likely are you to recommend us? <span>*</span>
          </label>

          <select
            id="recommend"
            v-model="form.recommend"
            name="recommend"
            required
          >
            <option value="" disabled>Select a score</option>
            <option value="10">10 - Extremely likely</option>
            <option value="9">9</option>
            <option value="8">8</option>
            <option value="7">7</option>
            <option value="6">6</option>
            <option value="5">5</option>
            <option value="4">4</option>
            <option value="3">3</option>
            <option value="2">2</option>
            <option value="1">1</option>
            <option value="0">0 - Not at all likely</option>
          </select>
        </div>

        <div class="form-group">
          <label for="additional_comments">
            Additional Comments
          </label>

          <textarea
            id="additional_comments"
            v-model="form.additional_comments"
            name="additional_comments"
            placeholder="Anything else you'd like to share?"
          />
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
            You may contact me about my survey response
            if additional information is needed.
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
          class="submit-button"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? 'Submitting...' : 'Submit Survey' }}
        </button>
      </form>
    </section>
  </main>
</template>
