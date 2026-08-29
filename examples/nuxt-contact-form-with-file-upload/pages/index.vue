<script setup>
import { ref } from 'vue'

useHead({
  title: 'Contact Form with File Upload'
})

const config = useRuntimeConfig()

const endpointUrl =
  config.public.smartFormifyEndpoint ||
  'https://api.smartformify.com/fe/YOUR_ENDPOINT_KEY'

const form = ref({
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  consent: false,
  notes_hqse: ''
})

const attachment = ref(null)
const fileName = ref('')
const isSubmitting = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const allowedExtensions = ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png']
const maxFileSize = 10 * 1024 * 1024

const handleFileChange = (event) => {
  successMessage.value = ''
  errorMessage.value = ''

  const file = event.target.files?.[0] || null

  if (!file) {
    attachment.value = null
    fileName.value = ''
    return
  }

  const extension = file.name.split('.').pop()?.toLowerCase()

  if (!extension || !allowedExtensions.includes(extension)) {
    event.target.value = ''
    attachment.value = null
    fileName.value = ''
    errorMessage.value = 'Please select a PDF, DOC, DOCX, JPG, JPEG, or PNG file.'
    return
  }

  if (file.size > maxFileSize) {
    event.target.value = ''
    attachment.value = null
    fileName.value = ''
    errorMessage.value = 'The selected file must be 10 MB or smaller.'
    return
  }

  attachment.value = file
  fileName.value = file.name
}

const submitForm = async () => {
  successMessage.value = ''
  errorMessage.value = ''

  if (!form.value.consent) {
    errorMessage.value = 'Please agree to be contacted regarding your message.'
    return
  }

  isSubmitting.value = true

  try {
    const formData = new FormData()

    formData.append('data[first_name]', form.value.first_name)
    formData.append('data[last_name]', form.value.last_name)
    formData.append('data[email]', form.value.email)
    formData.append('data[phone]', form.value.phone)
    formData.append('data[subject]', form.value.subject)
    formData.append('data[message]', form.value.message)
    formData.append('data[consent]', form.value.consent ? 'yes' : '')
    formData.append('data[notes_hqse]', form.value.notes_hqse)

    if (attachment.value) {
      formData.append('attachment', attachment.value)
    }

    const response = await $fetch(endpointUrl, {
      method: 'POST',
      body: formData
    })

    if (response?.data?.next_action === 'redirect' && response.data.redirect_url) {
      await navigateTo(response.data.redirect_url, { external: true })
      return
    }

    successMessage.value =
      response?.data?.thank_you_content ||
      'Thank you. Your message has been submitted successfully.'

    form.value = {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      consent: false,
      notes_hqse: ''
    }

    attachment.value = null
    fileName.value = ''

    const fileInput = document.getElementById('attachment')
    if (fileInput) {
      fileInput.value = ''
    }
  } catch (error) {
    console.error('Contact form submission failed:', error)
    errorMessage.value = 'Unable to submit your message. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <main class="contact-section">
    <section class="contact-wrapper">
      <aside class="contact-info">
        <div>
          <h1>Let's get in touch.</h1>
          <p>
            Have a question or need help? Send us a message and we'll
            get back to you as soon as possible.
          </p>

          <div class="contact-details">
            <div class="contact-detail">
              <div class="contact-icon" aria-hidden="true">✉</div>
              <div>
                <strong>Email</strong>
                <span>hello@example.com</span>
              </div>
            </div>

            <div class="contact-detail">
              <div class="contact-icon" aria-hidden="true">☎</div>
              <div>
                <strong>Phone</strong>
                <span>+1 (000) 000-0000</span>
              </div>
            </div>

            <div class="contact-detail">
              <div class="contact-icon" aria-hidden="true">⌖</div>
              <div>
                <strong>Address</strong>
                <span>123 Main Street</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <section class="contact-form">
        <header class="form-header">
          <h2>Send us a message</h2>
          <p>Fill out the form below and we'll respond shortly.</p>
        </header>

        <div v-if="successMessage" class="form-message success-message" role="status">
          {{ successMessage }}
        </div>

        <div v-if="errorMessage" class="form-message error-message" role="alert">
          {{ errorMessage }}
        </div>

        <form @submit.prevent="submitForm">
          <div class="form-row">
            <div class="form-group">
              <label for="first_name">
                First Name <span class="required">*</span>
              </label>
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
              <label for="last_name">
                Last Name <span class="required">*</span>
              </label>
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
              <label for="email">
                Email Address <span class="required">*</span>
              </label>
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

          <div class="form-group">
            <label for="subject">
              Subject <span class="required">*</span>
            </label>
            <input
              id="subject"
              v-model="form.subject"
              type="text"
              name="subject"
              required
            >
          </div>

          <div class="form-group">
            <label for="message">
              Message <span class="required">*</span>
            </label>
            <textarea
              id="message"
              v-model="form.message"
              name="message"
              placeholder="How can we help?"
              required
            />
          </div>

          <div class="form-group">
            <label for="attachment">Attachment</label>

            <div class="file-upload">
              <input
                id="attachment"
                type="file"
                name="attachment"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                @change="handleFileChange"
              >

              <div class="upload-icon" aria-hidden="true">↑</div>
              <div class="upload-title">Click to upload a file</div>
              <div class="upload-text">
                PDF, DOC, DOCX, JPG, JPEG, PNG — max 10 MB
              </div>

              <div v-if="fileName" id="file-name">
                {{ fileName }}
              </div>
            </div>
          </div>

          <div class="checkbox-group">
            <input
              id="consent"
              v-model="form.consent"
              type="checkbox"
              name="consent"
              required
            >
            <label for="consent">
              I agree to be contacted regarding my message.
              <span class="required">*</span>
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
            {{ isSubmitting ? 'Sending...' : 'Send Message' }}
          </button>
        </form>
      </section>
    </section>
  </main>
</template>
