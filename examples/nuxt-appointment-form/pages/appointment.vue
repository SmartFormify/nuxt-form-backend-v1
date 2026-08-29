<template>
  <main class="appointment-page">
    <section class="appointment-card">
      <!-- Header -->
      <div class="appointment-header">
        <div class="appointment-icon">
          📅
        </div>

        <div>
          <span class="eyebrow">
            Appointments
          </span>

          <h1>Schedule an appointment</h1>

          <p>
            Choose your preferred date and time.
            We'll confirm your appointment shortly.
          </p>
        </div>
      </div>

      <!-- Form -->
      <form
        :action="endpointUrl"
        method="POST"
        class="appointment-form"
      >
        <!-- Contact Information -->
        <div class="section-header">
          <h2>Contact information</h2>
          <p>Tell us how we can reach you.</p>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="first_name">
              First Name <span>*</span>
            </label>

            <input
              id="first_name"
              type="text"
              name="first_name"
              placeholder="John"
              autocomplete="given-name"
              required
            />
          </div>

          <div class="form-group">
            <label for="last_name">
              Last Name <span>*</span>
            </label>

            <input
              id="last_name"
              type="text"
              name="last_name"
              placeholder="Doe"
              autocomplete="family-name"
              required
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="email">
              Email Address <span>*</span>
            </label>

            <input
              id="email"
              type="email"
              name="email"
              placeholder="john@example.com"
              autocomplete="email"
              required
            />
          </div>

          <div class="form-group">
            <label for="phone">
              Phone Number <span>*</span>
            </label>

            <input
              id="phone"
              type="tel"
              name="phone"
              placeholder="+1 (555) 123-4567"
              autocomplete="tel"
              required
            />
          </div>
        </div>

        <!-- Appointment Details -->
        <div class="section-header section-spacing">
          <h2>Appointment details</h2>
          <p>Select the service and your preferred schedule.</p>
        </div>

        <div class="form-group">
          <label for="appointment_type">
            Appointment Type <span>*</span>
          </label>

          <select
            id="appointment_type"
            name="appointment_type"
            required
          >
            <option value="" selected disabled>
              Select appointment type
            </option>
            <option value="consultation">Consultation</option>
            <option value="meeting">Business Meeting</option>
            <option value="demo">Product Demo</option>
            <option value="support">Support Session</option>
            <option value="follow-up">Follow-up Appointment</option>
          </select>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="appointment_date">
              Preferred Date <span>*</span>
            </label>

            <input
              id="appointment_date"
              type="date"
              name="appointment_date"
              required
            />
          </div>

          <div class="form-group">
            <label for="appointment_time">
              Preferred Time <span>*</span>
            </label>

            <select
              id="appointment_time"
              name="appointment_time"
              required
            >
              <option value="" selected disabled>
                Select a time
              </option>
              <option value="09:00">9:00 AM</option>
              <option value="10:00">10:00 AM</option>
              <option value="11:00">11:00 AM</option>
              <option value="13:00">1:00 PM</option>
              <option value="14:00">2:00 PM</option>
              <option value="15:00">3:00 PM</option>
              <option value="16:00">4:00 PM</option>
              <option value="17:00">5:00 PM</option>
            </select>
          </div>
        </div>

        <!-- Preferred Contact Method -->
        <div class="form-group">
          <label for="contact_method">
            Preferred Contact Method <span>*</span>
          </label>

          <select
            id="contact_method"
            name="contact_method"
            required
          >
            <option value="" selected disabled>
              Select contact method
            </option>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
            <option value="video-call">Video Call</option>
          </select>
        </div>

        <!-- Additional Information -->
        <div class="section-header section-spacing">
          <h2>Additional information</h2>
          <p>Share anything that will help us prepare.</p>
        </div>

        <div class="form-group">
          <label for="message">
            Notes
          </label>

          <textarea
            id="message"
            name="message"
            placeholder="Add any questions, requirements, or additional details..."
          ></textarea>
        </div>

        <!-- Consent -->
        <div class="consent-group">
          <input
            id="consent"
            type="checkbox"
            name="consent"
            value="accepted"
            required
          />

          <label for="consent">
            I confirm that the information provided is accurate
            and agree to be contacted regarding this appointment.
          </label>
        </div>

        <!-- Submit -->
        <button
          type="submit"
          class="submit-button"
        >
          Schedule Appointment
        </button>
      </form>
    </section>
  </main>
</template>

<script setup lang="ts">
useHead({
  title: 'Book an Appointment',
})

const endpointUrl = 'https://api.smartformify.com/fe/YOUR_ENDPOINT_KEY'
</script>
