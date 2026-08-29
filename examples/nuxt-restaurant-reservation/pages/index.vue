<script setup>
import { reactive, ref } from 'vue'

useHead({
  title: 'Restaurant Reservation'
})

const config = useRuntimeConfig()

const endpointUrl =
  config.public.smartFormifyEndpoint ||
  'https://api.smartformify.com/fe/YOUR_ENDPOINT_KEY'

const form = reactive({
  name: '',
  email: '',
  phone: '',
  reservation_date: '',
  reservation_time: '',
  guests: '',
  seating_preference: '',
  special_occasion: '',
  special_requests: '',
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
          reservation_date: form.reservation_date,
          reservation_time: form.reservation_time,
          guests: form.guests,
          seating_preference: form.seating_preference,
          special_occasion: form.special_occasion,
          special_requests: form.special_requests,
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
      'Thank you. Your restaurant reservation request has been submitted successfully.'

    Object.assign(form, {
      name: '',
      email: '',
      phone: '',
      reservation_date: '',
      reservation_time: '',
      guests: '',
      seating_preference: '',
      special_occasion: '',
      special_requests: '',
      notes_hqse: ''
    })
  } catch (error) {
    console.error('Restaurant reservation submission failed:', error)
    errorMessage.value = 'Unable to submit your reservation request. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <main class="form-container">
    <h1>Restaurant Reservation</h1>

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
          required
        >
      </div>

      <div class="form-group">
        <label for="reservation_date">Reservation Date</label>
        <input
          id="reservation_date"
          v-model="form.reservation_date"
          type="date"
          name="reservation_date"
          required
        >
      </div>

      <div class="form-group">
        <label for="reservation_time">Reservation Time</label>
        <input
          id="reservation_time"
          v-model="form.reservation_time"
          type="time"
          name="reservation_time"
          required
        >
      </div>

      <div class="form-group">
        <label for="guests">Number of Guests</label>
        <select
          id="guests"
          v-model="form.guests"
          name="guests"
          required
        >
          <option value="" disabled>Select number of guests</option>
          <option value="1">1 Guest</option>
          <option value="2">2 Guests</option>
          <option value="3">3 Guests</option>
          <option value="4">4 Guests</option>
          <option value="5">5 Guests</option>
          <option value="6">6 Guests</option>
          <option value="7">7 Guests</option>
          <option value="8">8 Guests</option>
          <option value="9">9 Guests</option>
          <option value="10">10 Guests</option>
        </select>
      </div>

      <div class="form-group">
        <label for="seating_preference">Seating Preference</label>
        <select
          id="seating_preference"
          v-model="form.seating_preference"
          name="seating_preference"
          required
        >
          <option value="" disabled>Select seating preference</option>
          <option value="indoor">Indoor</option>
          <option value="outdoor">Outdoor</option>
          <option value="window">Window Seat</option>
          <option value="bar">Bar</option>
          <option value="no-preference">No Preference</option>
        </select>
      </div>

      <div class="form-group">
        <label for="special_occasion">Special Occasion</label>
        <select
          id="special_occasion"
          v-model="form.special_occasion"
          name="special_occasion"
          required
        >
          <option value="" disabled>Select an occasion</option>
          <option value="none">None</option>
          <option value="birthday">Birthday</option>
          <option value="anniversary">Anniversary</option>
          <option value="business">Business / Corporate</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div class="form-group">
        <label for="special_requests">Special Requests</label>
        <textarea
          id="special_requests"
          v-model="form.special_requests"
          name="special_requests"
          placeholder="Let us know about any special requests..."
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
        { isSubmitting ? 'Submitting...' : 'Submit Reservation' }
      </button>
    </form>
  </main>
</template>
