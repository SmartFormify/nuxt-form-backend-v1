<script setup>
import { reactive, ref } from 'vue'

useHead({
  title: 'Vendor Registration'
})

const config = useRuntimeConfig()

const endpointUrl =
  config.public.smartFormifyEndpoint ||
  'https://api.smartformify.com/fe/YOUR_ENDPOINT_KEY'

const form = reactive({
  business_name: '',
  contact_person: '',
  email: '',
  phone: '',
  business_type: '',
  website: '',
  business_location: '',
  products_services: '',
  additional_information: '',
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
          business_name: form.business_name,
          contact_person: form.contact_person,
          email: form.email,
          phone: form.phone,
          business_type: form.business_type,
          website: form.website,
          business_location: form.business_location,
          products_services: form.products_services,
          additional_information: form.additional_information,
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
      'Thank you. Your vendor registration has been submitted successfully.'

    Object.assign(form, {
      business_name: '',
      contact_person: '',
      email: '',
      phone: '',
      business_type: '',
      website: '',
      business_location: '',
      products_services: '',
      additional_information: '',
      notes_hqse: ''
    })
  } catch (error) {
    console.error('Vendor registration submission failed:', error)
    errorMessage.value = 'Unable to submit your registration. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <main class="form-container">
    <h1>Vendor Registration</h1>

    <div v-if="successMessage" class="form-message success-message" role="status">
      { successMessage }
    </div>

    <div v-if="errorMessage" class="form-message error-message" role="alert">
      { errorMessage }
    </div>

    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="business_name">Business Name</label>
        <input
          id="business_name"
          v-model="form.business_name"
          type="text"
          name="business_name"
          autocomplete="organization"
          required
        >
      </div>

      <div class="form-group">
        <label for="contact_person">Contact Person</label>
        <input
          id="contact_person"
          v-model="form.contact_person"
          type="text"
          name="contact_person"
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
        <label for="business_type">Business Type</label>
        <select
          id="business_type"
          v-model="form.business_type"
          name="business_type"
          required
        >
          <option value="" disabled>Select business type</option>
          <option value="manufacturer">Manufacturer</option>
          <option value="wholesaler">Wholesaler</option>
          <option value="distributor">Distributor</option>
          <option value="retailer">Retailer</option>
          <option value="service_provider">Service Provider</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div class="form-group">
        <label for="website">Website</label>
        <input
          id="website"
          v-model="form.website"
          type="url"
          name="website"
          placeholder="https://example.com"
          autocomplete="url"
        >
      </div>

      <div class="form-group">
        <label for="business_location">Business Location</label>
        <input
          id="business_location"
          v-model="form.business_location"
          type="text"
          name="business_location"
          placeholder="City, State / Country"
        >
      </div>

      <div class="form-group">
        <label for="products_services">Products / Services</label>
        <textarea
          id="products_services"
          v-model="form.products_services"
          name="products_services"
          placeholder="Describe the products or services you provide..."
          required
        />
      </div>

      <div class="form-group">
        <label for="additional_information">Additional Information</label>
        <textarea
          id="additional_information"
          v-model="form.additional_information"
          name="additional_information"
          placeholder="Add any additional information..."
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
        { isSubmitting ? 'Submitting...' : 'Register as Vendor' }
      </button>
    </form>
  </main>
</template>
