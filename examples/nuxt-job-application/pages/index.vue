<script setup>
import { reactive, ref } from 'vue'

useHead({
  title: 'Job Application'
})

const config = useRuntimeConfig()

const endpointUrl =
  config.public.smartFormifyEndpoint ||
  'https://api.smartformify.com/fe/YOUR_ENDPOINT_KEY'

const MAX_FILE_SIZE = 10 * 1024 * 1024
const ACCEPTED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
]

const form = reactive({
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  position: '',
  experience: '',
  portfolio_url: '',
  cover_letter: '',
  resume: null,
  consent: false,
  notes_hqse: ''
})

const fileName = ref('')
const fileError = ref('')
const isSubmitting = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const handleFileChange = (event) => {
  const file = event.target.files?.[0]

  fileError.value = ''
  fileName.value = ''
  form.resume = null

  if (!file) return

  if (file.size > MAX_FILE_SIZE) {
    fileError.value = 'Resume must not exceed 10 MB.'
    event.target.value = ''
    return
  }

  if (!ACCEPTED_TYPES.includes(file.type)) {
    fileError.value = 'Please upload a PDF, DOC, or DOCX file.'
    event.target.value = ''
    return
  }

  form.resume = file
  fileName.value = file.name
}

const submitForm = async () => {
  successMessage.value = ''
  errorMessage.value = ''
  fileError.value = ''

  if (!form.resume) {
    fileError.value = 'Please upload your resume / CV.'
    return
  }

  if (form.resume.size > MAX_FILE_SIZE) {
    fileError.value = 'Resume must not exceed 10 MB.'
    return
  }

  if (!ACCEPTED_TYPES.includes(form.resume.type)) {
    fileError.value = 'Please upload a PDF, DOC, or DOCX file.'
    return
  }

  isSubmitting.value = true

  try {
    const formData = new FormData()

    formData.append('data[first_name]', form.first_name)
    formData.append('data[last_name]', form.last_name)
    formData.append('data[email]', form.email)
    formData.append('data[phone]', form.phone)
    formData.append('data[position]', form.position)
    formData.append('data[experience]', form.experience)
    formData.append('data[portfolio_url]', form.portfolio_url)
    formData.append('data[cover_letter]', form.cover_letter)
    formData.append('data[consent]', form.consent ? 'yes' : '')
    formData.append('data[notes_hqse]', form.notes_hqse)
    formData.append('data[resume]', form.resume)

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
      'Thank you. Your job application has been submitted successfully.'

    Object.assign(form, {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      position: '',
      experience: '',
      portfolio_url: '',
      cover_letter: '',
      resume: null,
      consent: false,
      notes_hqse: ''
    })

    fileName.value = ''

    const input = document.getElementById('resume')
    if (input) input.value = ''
  } catch (error) {
    console.error('Job application submission failed:', error)
    errorMessage.value = 'Unable to submit your application. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <main class="application-page">
    <section class="application-card">
      <header class="form-header">
        <div class="brand-mark" aria-hidden="true">✓</div>

        <div>
          <span class="eyebrow">Career Opportunity</span>
          <h1>Job Application</h1>
          <p>
            Tell us about yourself and your experience. Submit your
            application and resume for consideration.
          </p>
        </div>
      </header>

      <form class="application-form" @submit.prevent="submitForm">
        <div v-if="successMessage" class="form-message success-message" role="status">
          {{ successMessage }}
        </div>

        <div v-if="errorMessage" class="form-message error-message" role="alert">
          {{ errorMessage }}
        </div>

        <div class="section-header">
          <h2>Personal Information</h2>
          <p>Provide your contact details.</p>
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
            <label for="phone">Phone Number <span>*</span></label>
            <input
              id="phone"
              v-model="form.phone"
              type="tel"
              name="phone"
              autocomplete="tel"
              required
            >
          </div>
        </div>

        <div class="section-header section-spacing">
          <h2>Application Details</h2>
          <p>Tell us about the role you are applying for.</p>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="position">Position <span>*</span></label>
            <select id="position" v-model="form.position" name="position" required>
              <option value="" disabled>Select a position</option>
              <option value="frontend-developer">Frontend Developer</option>
              <option value="backend-developer">Backend Developer</option>
              <option value="full-stack-developer">Full Stack Developer</option>
              <option value="ui-ux-designer">UI/UX Designer</option>
              <option value="project-manager">Project Manager</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div class="form-group">
            <label for="experience">Experience <span>*</span></label>
            <select id="experience" v-model="form.experience" name="experience" required>
              <option value="" disabled>Select experience</option>
              <option value="entry-level">Entry Level</option>
              <option value="1-2-years">1–2 Years</option>
              <option value="3-5-years">3–5 Years</option>
              <option value="6-10-years">6–10 Years</option>
              <option value="10-plus-years">10+ Years</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label for="portfolio_url">Portfolio / LinkedIn URL</label>
          <input
            id="portfolio_url"
            v-model="form.portfolio_url"
            type="url"
            name="portfolio_url"
            placeholder="https://..."
          >
        </div>

        <div class="form-group">
          <label for="cover_letter">Cover Letter <span>*</span></label>
          <textarea
            id="cover_letter"
            v-model="form.cover_letter"
            name="cover_letter"
            placeholder="Tell us why you are a good fit for this position..."
            required
          />
        </div>

        <div class="section-header section-spacing">
          <h2>Resume / CV</h2>
          <p>Upload your resume in PDF, DOC, or DOCX format. Maximum 10 MB.</p>
        </div>

        <div class="form-group">
          <label for="resume">Resume / CV <span>*</span></label>

          <div class="file-upload">
            <input
              id="resume"
              type="file"
              name="resume"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              @change="handleFileChange"
            >

            <div class="upload-icon" aria-hidden="true">↑</div>
            <div class="upload-title">Choose your resume</div>
            <div class="upload-text">PDF, DOC or DOCX · Maximum 10 MB</div>

            <div
              id="file-name"
              :class="{ 'file-error': fileError }"
              aria-live="polite"
            >
              {{ fileError || fileName }}
            </div>
          </div>
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
            I confirm that the information provided is accurate and I consent
            to my application being reviewed for employment opportunities. <span>*</span>
          </label>
        </div>

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

        <button
          type="submit"
          class="submit-button"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? 'Submitting...' : 'Submit Application' }}
        </button>
      </form>
    </section>
  </main>
</template>
