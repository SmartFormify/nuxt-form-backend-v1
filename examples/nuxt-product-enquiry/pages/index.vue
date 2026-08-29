<script setup>
import { reactive, ref } from 'vue'

useHead({
  title: 'Product Enquiry'
})

const config = useRuntimeConfig()

const endpointUrl =
  config.public.smartFormifyEndpoint ||
  'https://api.smartformify.com/fe/YOUR_ENDPOINT_KEY'

const form = reactive({
  name: '',
  email: '',
  phone: '',
  product: '',
  quantity: '',
  budget_range: '',
  message: '',
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
          product: form.product,
          quantity: form.quantity,
          budget_range: form.budget_range,
          message: form.message,
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
      'Thank you. Your product enquiry has been submitted successfully.'

    Object.assign(form, {
      name: '',
      email: '',
      phone: '',
      product: '',
      quantity: '',
      budget_range: '',
      message: '',
      notes_hqse: ''
    })
  } catch (error) {
    console.error('Product enquiry submission failed:', error)
    errorMessage.value = 'Unable to submit your enquiry. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <main class="form-container">
    <h1>Product Enquiry</h1>

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
        >
      </div>

      <div class="form-group">
        <label for="product">Product</label>
        <select id="product" v-model="form.product" name="product" required>
          <option value="" disabled>Select a product</option>
          <option value="product-1">Product 1</option>
          <option value="product-2">Product 2</option>
          <option value="product-3">Product 3</option>
          <option value="product-4">Product 4</option>
        </select>
      </div>

      <div class="form-group">
        <label for="quantity">Quantity</label>
        <input
          id="quantity"
          v-model="form.quantity"
          type="number"
          name="quantity"
          min="1"
          step="1"
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
          <option value="under-1000">Under $1,000</option>
          <option value="1000-5000">$1,000 - $5,000</option>
          <option value="5000-10000">$5,000 - $10,000</option>
          <option value="10000-plus">$10,000+</option>
        </select>
      </div>

      <div class="form-group">
        <label for="message">Enquiry / Message</label>
        <textarea
          id="message"
          v-model="form.message"
          name="message"
          placeholder="Tell us more about your product requirements..."
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
        {{ isSubmitting ? 'Submitting...' : 'Submit Enquiry' }}
      </button>
    </form>
  </main>
</template>
