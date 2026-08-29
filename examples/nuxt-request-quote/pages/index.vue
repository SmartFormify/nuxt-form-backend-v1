<script setup>
import { reactive, ref } from 'vue'

useHead({
  title: 'Request a Quote'
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
  service: '',
  estimated_budget: '',
  expected_timeline: '',
  project_name: '',
  project_description: '',
  additional_notes: '',
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
          service: form.service,
          estimated_budget: form.estimated_budget,
          expected_timeline: form.expected_timeline,
          project_name: form.project_name,
          project_description: form.project_description,
          additional_notes: form.additional_notes,
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
      'Thank you. Your quote request has been submitted successfully.'

    Object.assign(form, {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      service: '',
      estimated_budget: '',
      expected_timeline: '',
      project_name: '',
      project_description: '',
      additional_notes: '',
      consent: false,
      notes_hqse: ''
    })
  } catch (error) {
    console.error('Quote request submission failed:', error)
    errorMessage.value = 'Unable to submit your quote request. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <main class="quote-page">
    <section class="quote-card">
      <header class="quote-header">
        <div class="quote-icon" aria-hidden="true">Q</div>

        <div>
          <span class="eyebrow">Request a Quote</span>
          <h1>Tell us about your project</h1>
          <p>
            Share your requirements and we'll get back to you with
            the information you need.
          </p>
        </div>
      </header>

      <form class="quote-form" @submit.prevent="submitForm">
        <div v-if="successMessage" class="form-message success-message" role="status">
          { successMessage }
        </div>

        <div v-if="errorMessage" class="form-message error-message" role="alert">
          { errorMessage }
        </div>

        <div class="section-header">
          <h2>Contact Information</h2>
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
            <label for="email">Email Address <span>*</span></label>
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
          <h2>Project Details</h2>
          <p>Give us some details about the work you need.</p>
        </div>

        <div class="form-group">
          <label for="service">Service <span>*</span></label>
          <select id="service" v-model="form.service" name="service" required>
            <option value="" disabled>Select a service</option>
          <option value="web-design">Web Design</option>
          <option value="web-development">Web Development</option>
          <option value="mobile-app">Mobile App Development</option>
          <option value="ui-ux-design">UI/UX Design</option>
          <option value="consulting">Consulting</option>
          <option value="other">Other</option>
          </select>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="estimated_budget">Estimated Budget</label>
            <select
              id="estimated_budget"
              v-model="form.estimated_budget"
              name="estimated_budget"
            >
              <option value="" disabled>Select a budget range</option>
          <option value="under-1000">Under $1,000</option>
          <option value="1000-5000">$1,000 - $5,000</option>
          <option value="5000-10000">$5,000 - $10,000</option>
          <option value="10000-plus">$10,000+</option>
            </select>
          </div>

          <div class="form-group">
            <label for="expected_timeline">Expected Timeline</label>
            <select
              id="expected_timeline"
              v-model="form.expected_timeline"
              name="expected_timeline"
            >
              <option value="" disabled>Select a timeline</option>
          <option value="asap">As soon as possible</option>
          <option value="1-month">Within 1 month</option>
          <option value="1-3-months">1 - 3 months</option>
          <option value="3-6-months">3 - 6 months</option>
          <option value="6-plus-months">6+ months</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label for="project_name">Project Name</label>
          <input
            id="project_name"
            v-model="form.project_name"
            type="text"
            name="project_name"
            placeholder="e.g. Company Website Redesign"
          >
        </div>

        <div class="form-group">
          <label for="project_description">Project Description <span>*</span></label>
          <textarea
            id="project_description"
            v-model="form.project_description"
            name="project_description"
            placeholder="Tell us about your goals, requirements, and what you'd like us to build..."
            required
          />
        </div>

        <div class="form-group">
          <label for="additional_notes">Additional Notes</label>
          <textarea
            id="additional_notes"
            v-model="form.additional_notes"
            name="additional_notes"
            placeholder="Anything else you'd like us to know?"
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
            I agree to be contacted regarding my quote request. <span>*</span>
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
          { isSubmitting ? 'Submitting...' : 'Request a Quote' }
        </button>
      </form>
    </section>
  </main>
</template>
