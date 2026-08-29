<script setup>
import { reactive, ref } from 'vue'

useHead({
  title: 'Volunteer Registration'
})

const config = useRuntimeConfig()

const endpointUrl =
  config.public.smartFormifyEndpoint ||
  'https://api.smartformify.com/fe/YOUR_ENDPOINT_KEY'

const form = reactive({
  name: '',
  email: '',
  phone: '',
  age: '',
  availability: '',
  area_of_interest: '',
  about_yourself: '',
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
          phone: form.phone,
          age: form.age,
          availability: form.availability,
          area_of_interest: form.area_of_interest,
          about_yourself: form.about_yourself,
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
      'Thank you. Your volunteer registration has been submitted successfully.'

    Object.assign(form, {
      name: '',
      email: '',
      phone: '',
      age: '',
      availability: '',
      area_of_interest: '',
      about_yourself: '',
      notes_hqse: ''
    })
  } catch (error) {
    console.error('Volunteer registration submission failed:', error)
    errorMessage.value = 'Unable to submit your registration. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <main class="form-container">
    <h1>Volunteer Registration</h1>

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
        <label for="phone">Phone</label>
        <input
          id="phone"
          v-model="form.phone"
          type="tel"
          name="phone"
          autocomplete="tel"
        >
      </div>

      <div class="form-group">
        <label for="age">Age</label>
        <input
          id="age"
          v-model="form.age"
          type="number"
          name="age"
          min="1"
          max="120"
          required
        >
      </div>

      <div class="form-group">
        <label for="availability">Availability</label>
        <select
          id="availability"
          v-model="form.availability"
          name="availability"
          required
        >
          <option value="" disabled>Select availability</option>
          <option value="weekdays">Weekdays</option>
          <option value="weekends">Weekends</option>
          <option value="both">Weekdays & Weekends</option>
        </select>
      </div>

      <div class="form-group">
        <label for="area_of_interest">Area of Interest</label>
        <select
          id="area_of_interest"
          v-model="form.area_of_interest"
          name="area_of_interest"
          required
        >
          <option value="" disabled>Select an area of interest</option>
          <option value="events">Events & Activities</option>
          <option value="community">Community Support</option>
          <option value="fundraising">Fundraising</option>
          <option value="social_media">Social Media</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div class="form-group">
        <label for="about_yourself">About Yourself</label>
        <textarea
          id="about_yourself"
          v-model="form.about_yourself"
          name="about_yourself"
          placeholder="Tell us a little about yourself..."
          required
        />
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
        { isSubmitting ? 'Submitting...' : 'Register as Volunteer' }
      </button>
    </form>
  </main>
</template>
