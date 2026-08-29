<script setup>
import { computed, reactive, ref } from 'vue'

useHead({
  title: 'Multi-Step Contact Form'
})

const config = useRuntimeConfig()

const endpointUrl =
  config.public.smartFormifyEndpoint ||
  'https://api.smartformify.com/fe/YOUR_ENDPOINT_KEY'

const currentStep = ref(0)
const isSubmitting = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const form = reactive({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  notes_hqse: ''
})

const steps = [
  'Personal Information',
  'Contact Details',
  'Your Message'
]

const currentStepNumber = computed(() => currentStep.value + 1)

const validateCurrentStep = () => {
  const fieldsByStep = [
    ['name', 'email'],
    ['phone', 'subject'],
    ['message']
  ]

  for (const fieldName of fieldsByStep[currentStep.value]) {
    const element = document.getElementById(fieldName)

    if (element && !element.checkValidity()) {
      element.reportValidity()
      return false
    }
  }

  return true
}

const nextStep = () => {
  if (!validateCurrentStep()) return

  if (currentStep.value < steps.length - 1) {
    currentStep.value++
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const previousStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const submitForm = async () => {
  if (!validateCurrentStep()) return

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
          subject: form.subject,
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
      'Thank you. Your message has been submitted successfully.'

    Object.assign(form, {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      notes_hqse: ''
    })

    currentStep.value = 0
  } catch (error) {
    console.error('Multi-step contact form submission failed:', error)
    errorMessage.value = 'Unable to submit your message. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <main class="form-container">
    <h1>Contact Us</h1>

    <div class="step-indicator">
      Step <span>{{ currentStepNumber }}</span> of {{ steps.length }}
    </div>

    <div v-if="successMessage" class="form-message success-message" role="status">
      {{ successMessage }}
    </div>

    <div v-if="errorMessage" class="form-message error-message" role="alert">
      {{ errorMessage }}
    </div>

    <form @submit.prevent="submitForm">
      <!-- Step 1 -->
      <section v-if="currentStep === 0" class="step active">
        <h2>Personal Information</h2>

        <label for="name">Name</label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          name="name"
          autocomplete="name"
          required
        >

        <label for="email">Email</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          name="email"
          autocomplete="email"
          required
        >

        <div class="buttons">
          <span></span>
          <button type="button" @click="nextStep">
            Next
          </button>
        </div>
      </section>

      <!-- Step 2 -->
      <section v-if="currentStep === 1" class="step active">
        <h2>Contact Details</h2>

        <label for="phone">Phone</label>
        <input
          id="phone"
          v-model="form.phone"
          type="tel"
          name="phone"
          autocomplete="tel"
          required
        >

        <label for="subject">Subject</label>
        <input
          id="subject"
          v-model="form.subject"
          type="text"
          name="subject"
          required
        >

        <div class="buttons">
          <button type="button" @click="previousStep">
            Back
          </button>

          <button type="button" @click="nextStep">
            Next
          </button>
        </div>
      </section>

      <!-- Step 3 -->
      <section v-if="currentStep === 2" class="step active">
        <h2>Your Message</h2>

        <label for="message">Message</label>
        <textarea
          id="message"
          v-model="form.message"
          name="message"
          rows="6"
          required
        />

        <!-- SmartFormify silent bot-check field. Keep it empty. -->
        <input
          v-model="form.notes_hqse"
          type="text"
          name="notes_hqse"
          tabindex="-1"
          autocomplete="off"
          aria-hidden="true"
          class="honeypot"
        >

        <div class="buttons">
          <button type="button" @click="previousStep">
            Back
          </button>

          <button type="submit" :disabled="isSubmitting">
            {{ isSubmitting ? 'Submitting...' : 'Submit' }}
          </button>
        </div>
      </section>
    </form>
  </main>
</template>
