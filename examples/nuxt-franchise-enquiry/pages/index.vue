<script setup>
import { reactive, ref } from 'vue'

useHead({
  title: 'Franchise Enquiry'
})

const config = useRuntimeConfig()

const endpointUrl = ref(
  config.public.smartFormifyEndpoint ||
  'https://api.smartformify.com/fe/YOUR_ENDPOINT_KEY'
)

const form = reactive({
  name: '',
  email: '',
  phone: '',
  company: '',
  location: '',
  investment: '',
  experience: '',
  message: '',
  notes_hqse: ''
})

const submitting = ref(false)
const submitted = ref(false)
const errorMessage = ref('')

const submitForm = async () => {
  submitting.value = true
  submitted.value = false
  errorMessage.value = ''

  try {
    const response = await $fetch(endpointUrl.value, {
      method: 'POST',
      body: {
        data: {
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.company,
          location: form.location,
          investment: form.investment,
          experience: form.experience,
          message: form.message,
          notes_hqse: form.notes_hqse
        }
      }
    })

    if (response?.data?.next_action === 'redirect' && response.data.redirect_url) {
      await navigateTo(response.data.redirect_url, { external: true })
      return
    }

    submitted.value = true

    if (response?.data?.next_action === 'message' && response.data.thank_you_content) {
      errorMessage.value = ''
    }
  } catch (error) {
    console.error('Franchise enquiry submission failed:', error)
    errorMessage.value = 'Unable to submit your enquiry. Please try again.'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <main class="form-container">
    <h1>Franchise Enquiry</h1>

    <div v-if="submitted" class="success-message" role="status">
      Thank you. Your franchise enquiry has been submitted successfully.
    </div>

    <div v-if="errorMessage" class="error-message" role="alert">
      {{ errorMessage }}
    </div>

    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">Full Name</label>
        <input id="name" v-model="form.name" type="text" name="name" required>
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" v-model="form.email" type="email" name="email" required>
      </div>

      <div class="form-group">
        <label for="phone">Phone</label>
        <input id="phone" v-model="form.phone" type="tel" name="phone" required>
      </div>

      <div class="form-group">
        <label for="company">Company Name</label>
        <input id="company" v-model="form.company" type="text" name="company">
      </div>

      <div class="form-group">
        <label for="location">Preferred Location</label>
        <input id="location" v-model="form.location" type="text" name="location" required>
      </div>

      <div class="form-group">
        <label for="investment">Investment Range</label>
        <select id="investment" v-model="form.investment" name="investment" required>
          <option value="">Select investment range</option>
          <option value="under_25k">Under $25,000</option>
          <option value="25k_50k">$25,000 - $50,000</option>
          <option value="50k_100k">$50,000 - $100,000</option>
          <option value="100k_plus">$100,000+</option>
        </select>
      </div>

      <div class="form-group">
        <label for="experience">Business Experience</label>
        <textarea
          id="experience"
          v-model="form.experience"
          name="experience"
          placeholder="Tell us about your business experience."
        />
      </div>

      <div class="form-group">
        <label for="message">Enquiry / Message</label>
        <textarea id="message" v-model="form.message" name="message" required />
      </div>

      <!-- SmartFormify silent bot-check field. Keep empty. -->
      <input
        v-model="form.notes_hqse"
        type="text"
        name="notes_hqse"
        autocomplete="off"
        tabindex="-1"
        class="honeypot"
        aria-hidden="true"
      >

      <button type="submit" :disabled="submitting">
        {{ submitting ? 'Submitting...' : 'Submit Enquiry' }}
      </button>
    </form>
  </main>
</template>
