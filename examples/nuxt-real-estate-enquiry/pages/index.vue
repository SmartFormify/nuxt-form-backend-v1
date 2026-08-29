<script setup>
import { reactive, ref } from 'vue'

useHead({
  title: 'Real Estate Enquiry'
})

const config = useRuntimeConfig()

const endpointUrl =
  config.public.smartFormifyEndpoint ||
  'https://api.smartformify.com/fe/YOUR_ENDPOINT_KEY'

const form = reactive({
  name: '',
  email: '',
  phone: '',
  enquiry_type: '',
  property_type: '',
  preferred_location: '',
  budget_range: '',
  bedrooms: '',
  additional_requirements: '',
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
          enquiry_type: form.enquiry_type,
          property_type: form.property_type,
          preferred_location: form.preferred_location,
          budget_range: form.budget_range,
          bedrooms: form.bedrooms,
          additional_requirements: form.additional_requirements,
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
      'Thank you. Your real estate enquiry has been submitted successfully.'

    Object.assign(form, {
      name: '',
      email: '',
      phone: '',
      enquiry_type: '',
      property_type: '',
      preferred_location: '',
      budget_range: '',
      bedrooms: '',
      additional_requirements: '',
      notes_hqse: ''
    })
  } catch (error) {
    console.error('Real estate enquiry submission failed:', error)
    errorMessage.value = 'Unable to submit your enquiry. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <main class="form-container">
    <h1>Real Estate Enquiry</h1>

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
        <label for="enquiry_type">Enquiry Type</label>
        <select
          id="enquiry_type"
          v-model="form.enquiry_type"
          name="enquiry_type"
          required
        >
          <option value="" disabled>Select enquiry type</option>
          <option value="buy">Buy a Property</option>
          <option value="rent">Rent a Property</option>
          <option value="sell">Sell a Property</option>
          <option value="lease">Lease a Property</option>
          <option value="investment">Property Investment</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div class="form-group">
        <label for="property_type">Property Type</label>
        <select
          id="property_type"
          v-model="form.property_type"
          name="property_type"
          required
        >
          <option value="" disabled>Select property type</option>
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
          <option value="villa">Villa</option>
          <option value="commercial">Commercial Property</option>
          <option value="land">Land / Plot</option>
          <option value="office">Office Space</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div class="form-group">
        <label for="preferred_location">Preferred Location</label>
        <input
          id="preferred_location"
          v-model="form.preferred_location"
          type="text"
          name="preferred_location"
          placeholder="City, area, or neighborhood"
          required
        >
      </div>

      <div class="form-group">
        <label for="budget_range">Budget Range</label>
        <select
          id="budget_range"
          v-model="form.budget_range"
          name="budget_range"
          required
        >
          <option value="" disabled>Select budget range</option>
          <option value="under-100k">Under $100,000</option>
          <option value="100k-250k">$100,000 - $250,000</option>
          <option value="250k-500k">$250,000 - $500,000</option>
          <option value="500k-1m">$500,000 - $1,000,000</option>
          <option value="1m-plus">$1,000,000+</option>
        </select>
      </div>

      <div class="form-group">
        <label for="bedrooms">Bedrooms</label>
        <select
          id="bedrooms"
          v-model="form.bedrooms"
          name="bedrooms"
          required
        >
          <option value="" disabled>Select number of bedrooms</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5_plus">5+</option>
        </select>
      </div>

      <div class="form-group">
        <label for="additional_requirements">Additional Requirements</label>
        <textarea
          id="additional_requirements"
          v-model="form.additional_requirements"
          name="additional_requirements"
          placeholder="Tell us about any other requirements..."
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
        { isSubmitting ? 'Submitting...' : 'Submit Enquiry' }
      </button>
    </form>
  </main>
</template>
