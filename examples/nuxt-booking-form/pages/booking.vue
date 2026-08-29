<template>
  <main class="booking-page">
    <section class="booking-card">
      <div class="booking-header">
        <div class="booking-icon">✓</div>

        <div>
          <span class="eyebrow">Appointments</span>

          <h1>Book an appointment</h1>

          <p>
            Choose a service and preferred time.
            We'll confirm your appointment shortly.
          </p>
        </div>
      </div>

      <form
        :action="endpointUrl"
        method="POST"
        class="booking-form"
      >
        <div class="section-header">
          <h2>Your information</h2>
          <p>Tell us how we can contact you.</p>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="first_name">
              First Name <span>*</span>
            </label>

            <input
              id="first_name"
              name="first_name"
              type="text"
              placeholder="John"
              autocomplete="given-name"
              required
            >
          </div>

          <div class="form-group">
            <label for="last_name">
              Last Name <span>*</span>
            </label>

            <input
              id="last_name"
              name="last_name"
              type="text"
              placeholder="Doe"
              autocomplete="family-name"
              required
            >
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="email">
              Email Address <span>*</span>
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              autocomplete="email"
              required
            >
          </div>

          <div class="form-group">
            <label for="phone">
              Phone Number <span>*</span>
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              autocomplete="tel"
              required
            >
          </div>
        </div>

        <div class="section-header section-spacing">
          <h2>Appointment details</h2>
          <p>Select your preferred service, date, and time.</p>
        </div>

        <div class="form-group">
          <label for="service">
            Service <span>*</span>
          </label>

          <select id="service" name="service" required>
            <option value="" selected disabled>Select a service</option>
            <option value="consultation">Consultation</option>
            <option value="general-appointment">General Appointment</option>
            <option value="follow-up">Follow-up</option>
            <option value="support">Support Session</option>
          </select>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="appointment_date">
              Preferred Date <span>*</span>
            </label>

            <input
              id="appointment_date"
              name="appointment_date"
              type="date"
              required
            >
          </div>

          <div class="form-group">
            <label for="appointment_time">
              Preferred Time <span>*</span>
            </label>

            <select id="appointment_time" name="appointment_time" required>
              <option value="" selected disabled>Select a time</option>
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

        <div class="form-group">
          <label for="guests">Number of People</label>

          <select id="guests" name="guests">
            <option value="1">1 person</option>
            <option value="2">2 people</option>
            <option value="3">3 people</option>
            <option value="4">4 people</option>
            <option value="5">5 people</option>
            <option value="6">6+ people</option>
          </select>
        </div>

        <div class="section-header section-spacing">
          <h2>Additional information</h2>
          <p>Let us know if there is anything else we should know.</p>
        </div>

        <div class="form-group">
          <label for="message">Notes</label>

          <textarea
            id="message"
            name="message"
            placeholder="Add any special requests or additional information..."
          ></textarea>
        </div>

        <!-- SmartFormify silent bot-check. Keep empty. -->
        <input
          type="text"
          name="notes_hqse"
          value=""
          autocomplete="off"
          tabindex="-1"
          aria-hidden="true"
          class="bot-check"
        >

        <div class="consent-group">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            value="accepted"
            required
          >

          <label for="consent">
            I confirm that the information provided is accurate
            and agree to be contacted regarding this appointment.
          </label>
        </div>

        <button type="submit" class="submit-button">
          Request Appointment
        </button>
      </form>
    </section>
  </main>
</template>

<script setup lang="ts">
const endpointUrl =
  "https://api.smartformify.com/fe/YOUR_ENDPOINT_KEY";
</script>

<style src="~/assets/style.css"></style>
