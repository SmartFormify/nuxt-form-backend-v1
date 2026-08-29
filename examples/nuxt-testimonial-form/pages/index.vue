<script setup>
import { reactive, ref } from 'vue'

useHead({
  title: 'Testimonial Form'
})

const config = useRuntimeConfig()

const endpointUrl =
  config.public.smartFormifyEndpoint ||
  'https://api.smartformify.com/fe/YOUR_ENDPOINT_KEY'

const form = reactive({
  name: '',
  email: '',
  company_name: '',
  job_title: '',
  rating: '',
  testimonial: '',
  publishing_permission: '',
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
          company_name: form.company_name,
          job_title: form.job_title,
          rating: form.rating,
          testimonial: form.testimonial,
          publishing_permission: form.publishing_permission,
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
      'Thank you. Your testimonial has been submitted successfully.'

    Object.assign(form, {
      name: '',
      email: '',
      company_name: '',
      job_title: '',
      rating: '',
      testimonial: '',
      publishing_permission: '',
      notes_hqse: ''
    })
  } catch (error) {
    console.error('Testimonial submission failed:', error)
    errorMessage.value = 'Unable to submit your testimonial. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <main class="form-container">
    <h1>Testimonial Form</h1>

    <div v-if="successMessage" class="form-message success-message" role="status">
      { successMessage }
    </div>

    <div v-if="errorMessage" class="form-message error-message" role="alert">
      { errorMessage }
    </div>

    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">Full Name</label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          name="name"
          autocomplete="name"
          required
        >
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          name="email"
          autocomplete="email"
          required
        >
      </div>

      <div class="form-group">
        <label for="company_name">Company Name</label>
        <input
          id="company_name"
          v-model="form.company_name"
          type="text"
          name="company_name"
          autocomplete="organization"
        >
      </div>

      <div class="form-group">
        <label for="job_title">Job Title / Role</label>
        <input
          id="job_title"
          v-model="form.job_title"
          type="text"
          name="job_title"
        >
      </div>

      <div class="form-group">
        <label for="rating">Rating</label>
        <select
          id="rating"
          v-model="form.rating"
          name="rating"
          required
        >
          <option value="" disabled>Select a rating</option>
          <option value="5">5 - Excellent</option>
          <option value="4">4 - Very Good</option>
          <option value="3">3 - Good</option>
          <option value="2">2 - Fair</option>
          <option value="1">1 - Poor</option>
        </select>
      </div>

      <div class="form-group">
        <label for="testimonial">Testimonial</label>
        <textarea
          id="testimonial"
          v-model="form.testimonial"
          name="testimonial"
          placeholder="Tell us about your experience..."
          required
        />
      </div>

      <div class="form-group">
        <label for="publishing_permission">Publishing Permission</label>
        <select
          id="publishing_permission"
          v-model="form.publishing_permission"
          name="publishing_permission"
          required
        >
          <option value="" disabled>Select an option</option>
          <option value="yes">Yes, you can publish it</option>
          <option value="no">No, please keep it private</option>
        </select>
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

      <button type="submit" :disabled="isSubmitting">
        { isSubmitting ? 'Submitting...' : 'Submit Testimonial' }
      </button>
    </form>
  </main>
</template>
