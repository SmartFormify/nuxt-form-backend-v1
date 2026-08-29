<script setup>
import { reactive, ref } from 'vue'

useHead({
  title: 'Lead Generation'
})

const config = useRuntimeConfig()

const endpointUrl =
  config.public.smartFormifyEndpoint ||
  'https://api.smartformify.com/fe/YOUR_ENDPOINT_KEY'

const form = reactive({
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  company_name: '',
  company_size: '',
  industry: '',
  primary_interest: '',
  additional_message: '',
  consent: false,
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
          first_name: form.first_name,
          last_name: form.last_name,
          email: form.email,
          phone: form.phone,
          company_name: form.company_name,
          company_size: form.company_size,
          industry: form.industry,
          primary_interest: form.primary_interest,
          additional_message: form.additional_message,
          consent: form.consent ? 'yes' : '',
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
      'Thank you. We have received your information and will be in touch shortly.'

    Object.assign(form, {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      company_name: '',
      company_size: '',
      industry: '',
      primary_interest: '',
      additional_message: '',
      consent: false,
      notes_hqse: ''
    })
  } catch (error) {
    console.error('Lead generation submission failed:', error)
    errorMessage.value = 'Unable to submit your information. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <main class="lead-page">
    <section class="lead-card">
      <header class="lead-header">
        <div class="lead-icon" aria-hidden="true">↗</div>

        <div>
          <span class="eyebrow">Get Started</span>
          <h1>Let's talk about your goals</h1>
          <p>
            Tell us a little about yourself and what you're looking for.
            We'll help you find the right solution.
          </p>
        </div>
      </header>

      <form class="lead-form" @submit.prevent="submitForm">
        <div v-if="successMessage" class="form-message success-message" role="status">
          {{ successMessage }}
        </div>

        <div v-if="errorMessage" class="form-message error-message" role="alert">
          {{ errorMessage }}
        </div>

        <div class="section-header">
          <h2>Personal Information</h2>
          <p>Tell us how we can reach you.</p>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="first_name">First Name <span>*</span></label>
            <input
              id="first_name"
              v-model="form.first_name"
              type="text"
              name="first_name"
              autocomplete="given-name"
              required
            >
          </div>

          <div class="form-group">
            <label for="last_name">Last Name <span>*</span></label>
            <input
              id="last_name"
              v-model="form.last_name"
              type="text"
              name="last_name"
              autocomplete="family-name"
              required
            >
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="email">Work Email <span>*</span></label>
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
            <label for="phone">Phone Number</label>
            <input
              id="phone"
              v-model="form.phone"
              type="tel"
              name="phone"
              autocomplete="tel"
            >
          </div>
        </div>

        <div class="section-header section-spacing">
          <h2>Company Information</h2>
          <p>Help us understand your organization.</p>
        </div>

        <div class="form-group">
          <label for="company_name">Company Name <span>*</span></label>
          <input
            id="company_name"
            v-model="form.company_name"
            type="text"
            name="company_name"
            autocomplete="organization"
            required
          >
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="company_size">Company Size</label>
            <select id="company_size" v-model="form.company_size" name="company_size">
              <option value="" disabled>Select company size</option>
              <option value="1-10">1–10 employees</option>
              <option value="11-50">11–50 employees</option>
              <option value="51-200">51–200 employees</option>
              <option value="201-500">201–500 employees</option>
              <option value="501-1000">501–1,000 employees</option>
              <option value="1001-plus">1,001+ employees</option>
            </select>
          </div>

          <div class="form-group">
            <label for="industry">Industry</label>
            <select id="industry" v-model="form.industry" name="industry">
              <option value="" disabled>Select industry</option>
              <option value="technology">Technology</option>
              <option value="finance">Finance</option>
              <option value="healthcare">Healthcare</option>
              <option value="education">Education</option>
              <option value="retail">Retail</option>
              <option value="real-estate">Real Estate</option>
              <option value="professional-services">Professional Services</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div class="section-header section-spacing">
          <h2>What can we help with?</h2>
          <p>Select the option that best describes your interest.</p>
        </div>

        <div class="form-group">
          <label for="primary_interest">Primary Interest <span>*</span></label>
          <select
            id="primary_interest"
            v-model="form.primary_interest"
            name="primary_interest"
            required
          >
            <option value="" disabled>Select your primary interest</option>
            <option value="product-demo">Product Demo</option>
            <option value="pricing">Pricing</option>
            <option value="consultation">Consultation</option>
            <option value="partnership">Partnership</option>
            <option value="services">Services</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div class="form-group">
          <label for="additional_message">Additional Message</label>
          <textarea
            id="additional_message"
            v-model="form.additional_message"
            name="additional_message"
            placeholder="Tell us more about what you're looking for..."
          />
        </div>

        <div class="consent-group">
          <input
            id="consent"
            v-model="form.consent"
            type="checkbox"
            name="consent"
            required
          >

          <label for="consent">
            I agree to be contacted regarding my enquiry and understand
            that my information will be used to respond to my request.
            <span>*</span>
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
          {{ isSubmitting ? 'Submitting...' : 'Get Started' }}
        </button>
      </form>
    </section>
  </main>
</template>
