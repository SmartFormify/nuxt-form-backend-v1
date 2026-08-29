<script setup>
import { reactive, ref } from 'vue'

useHead({
  title: 'School Admission'
})

const config = useRuntimeConfig()

const endpointUrl =
  config.public.smartFormifyEndpoint ||
  'https://api.smartformify.com/fe/YOUR_ENDPOINT_KEY'

const form = reactive({
  student_name: '',
  date_of_birth: '',
  gender: '',
  applying_for_class: '',
  guardian_name: '',
  guardian_email: '',
  guardian_phone: '',
  address: '',
  previous_school: '',
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
          student_name: form.student_name,
          date_of_birth: form.date_of_birth,
          gender: form.gender,
          applying_for_class: form.applying_for_class,
          guardian_name: form.guardian_name,
          guardian_email: form.guardian_email,
          guardian_phone: form.guardian_phone,
          address: form.address,
          previous_school: form.previous_school,
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
      'Thank you. The school admission enquiry has been submitted successfully.'

    Object.assign(form, {
      student_name: '',
      date_of_birth: '',
      gender: '',
      applying_for_class: '',
      guardian_name: '',
      guardian_email: '',
      guardian_phone: '',
      address: '',
      previous_school: '',
      additional_information: '',
      notes_hqse: ''
    })
  } catch (error) {
    console.error('School admission submission failed:', error)
    errorMessage.value = 'Unable to submit the admission form. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <main class="form-container">
    <h1>School Admission</h1>

    <div v-if="successMessage" class="form-message success-message" role="status">
      { successMessage }
    </div>

    <div v-if="errorMessage" class="form-message error-message" role="alert">
      { errorMessage }
    </div>

    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="student_name">Student Name</label>
        <input
          id="student_name"
          v-model="form.student_name"
          type="text"
          name="student_name"
          autocomplete="name"
          required
        >
      </div>

      <div class="form-group">
        <label for="date_of_birth">Date of Birth</label>
        <input
          id="date_of_birth"
          v-model="form.date_of_birth"
          type="date"
          name="date_of_birth"
          required
        >
      </div>

      <div class="form-group">
        <label for="gender">Gender</label>
        <select id="gender" v-model="form.gender" name="gender" required>
          <option value="" disabled>Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div class="form-group">
        <label for="applying_for_class">Applying for Class</label>
        <select
          id="applying_for_class"
          v-model="form.applying_for_class"
          name="applying_for_class"
          required
        >
          <option value="" disabled>Select class</option>
          <option value="pre_primary">Pre-Primary</option>
          <option value="kindergarten">Kindergarten</option>
          <option value="grade_1">Grade 1</option>
          <option value="grade_2">Grade 2</option>
          <option value="grade_3">Grade 3</option>
          <option value="grade_4">Grade 4</option>
          <option value="grade_5">Grade 5</option>
          <option value="grade_6">Grade 6</option>
          <option value="grade_7">Grade 7</option>
          <option value="grade_8">Grade 8</option>
          <option value="grade_9">Grade 9</option>
          <option value="grade_10">Grade 10</option>
          <option value="grade_11">Grade 11</option>
          <option value="grade_12">Grade 12</option>
        </select>
      </div>

      <div class="form-group">
        <label for="guardian_name">Parent / Guardian Name</label>
        <input
          id="guardian_name"
          v-model="form.guardian_name"
          type="text"
          name="guardian_name"
          autocomplete="name"
          required
        >
      </div>

      <div class="form-group">
        <label for="guardian_email">Parent / Guardian Email</label>
        <input
          id="guardian_email"
          v-model="form.guardian_email"
          type="email"
          name="guardian_email"
          autocomplete="email"
          required
        >
      </div>

      <div class="form-group">
        <label for="guardian_phone">Parent / Guardian Phone</label>
        <input
          id="guardian_phone"
          v-model="form.guardian_phone"
          type="tel"
          name="guardian_phone"
          autocomplete="tel"
          required
        >
      </div>

      <div class="form-group">
        <label for="address">Address</label>
        <textarea
          id="address"
          v-model="form.address"
          name="address"
          autocomplete="street-address"
          required
        />
      </div>

      <div class="form-group">
        <label for="previous_school">Previous School</label>
        <input
          id="previous_school"
          v-model="form.previous_school"
          type="text"
          name="previous_school"
          required
        >
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
        { isSubmitting ? 'Submitting...' : 'Submit Admission Form' }
      </button>
    </form>
  </main>
</template>
