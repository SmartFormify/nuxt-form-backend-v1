<script setup>
import { reactive, ref } from 'vue'

useHead({
  title: 'Hotel Booking Enquiry'
})

const config = useRuntimeConfig()

const endpointUrl =
  config.public.smartFormifyEndpoint ||
  'https://api.smartformify.com/fe/YOUR_ENDPOINT_KEY'

const form = reactive({
  name: '',
  email: '',
  phone: '',
  check_in: '',
  check_out: '',
  guests: '',
  rooms: '',
  room_type: '',
  meal_preference: '',
  special_requests: '',
  notes_hqse: ''
})

const isSubmitting = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const submitForm = async () => {
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
          phone: form.phone,
          check_in: form.check_in,
          check_out: form.check_out,
          guests: form.guests,
          rooms: form.rooms,
          room_type: form.room_type,
          meal_preference: form.meal_preference,
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
      'Thank you. Your hotel booking enquiry has been submitted successfully.'

    Object.assign(form, {
      name: '',
      email: '',
      phone: '',
      check_in: '',
      check_out: '',
      guests: '',
      rooms: '',
      room_type: '',
      meal_preference: '',
      special_requests: '',
      notes_hqse: ''
    })
  } catch (error) {
    console.error('Hotel booking enquiry submission failed:', error)
    errorMessage.value = 'Unable to submit your enquiry. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <main class="form-container">
    <h1>Hotel Booking Enquiry</h1>

    <div v-if="successMessage" class="form-message success-message" role="status">
      {{ successMessage }}
    </div>

    <div v-if="errorMessage" class="form-message error-message" role="alert">
      {{ errorMessage }}
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
        <label for="check_in">Check-in Date</label>
        <input
          id="check_in"
          v-model="form.check_in"
          type="date"
          name="check_in"
          required
        >
      </div>

      <div class="form-group">
        <label for="check_out">Check-out Date</label>
        <input
          id="check_out"
          v-model="form.check_out"
          type="date"
          name="check_out"
          required
        >
      </div>

      <div class="form-group">
        <label for="guests">Number of Guests</label>
        <select id="guests" v-model="form.guests" name="guests" required>
          <option value="" disabled>Select number of guests</option>
          <option v-for="number in 10" :key="number" :value="String(number)">
            {{ number }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="rooms">Number of Rooms</label>
        <select id="rooms" v-model="form.rooms" name="rooms" required>
          <option value="" disabled>Select number of rooms</option>
          <option v-for="number in 5" :key="number" :value="String(number)">
            {{ number }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="room_type">Room Type</label>
        <select id="room_type" v-model="form.room_type" name="room_type" required>
          <option value="" disabled>Select room type</option>
          <option value="standard">Standard</option>
          <option value="deluxe">Deluxe</option>
          <option value="suite">Suite</option>
          <option value="family">Family Room</option>
        </select>
      </div>

      <div class="form-group">
        <label for="meal_preference">Meal Preference</label>
        <select
          id="meal_preference"
          v-model="form.meal_preference"
          name="meal_preference"
          required
        >
          <option value="" disabled>Select meal preference</option>
          <option value="room_only">Room Only</option>
          <option value="breakfast">Breakfast</option>
          <option value="half_board">Half Board</option>
          <option value="full_board">Full Board</option>
        </select>
      </div>

      <div class="form-group">
        <label for="special_requests">Special Requests</label>
        <textarea
          id="special_requests"
          v-model="form.special_requests"
          name="special_requests"
          placeholder="Enter any special requests..."
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
        {{ isSubmitting ? 'Submitting...' : 'Submit Enquiry' }}
      </button>
    </form>
  </main>
</template>
