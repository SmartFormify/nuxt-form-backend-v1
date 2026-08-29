<template>
  <main class="callback-page">
    <section class="callback-card">
      <div class="callback-header">
        <div class="callback-icon">☎</div>

        <div>
          <span class="eyebrow">Contact Us</span>
          <h1>Request a Callback</h1>
          <p>
            Tell us when you'd like to hear from us and we'll get back to you.
          </p>
        </div>
      </div>

      <form
        :action="endpointUrl"
        method="POST"
        class="callback-form"
      >
        <div class="section-header">
          <h2>Your information</h2>
          <p>Provide your contact details.</p>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="first_name">First Name <span>*</span></label>
            <input
              id="first_name"
              name="first_name"
              type="text"
              placeholder="John"
              autocomplete="given-name"
              required
            />
          </div>

          <div class="form-group">
            <label for="last_name">Last Name <span>*</span></label>
            <input
              id="last_name"
              name="last_name"
              type="text"
              placeholder="Doe"
              autocomplete="family-name"
              required
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="email">Email Address <span>*</span></label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              autocomplete="email"
              required
            />
          </div>

          <div class="form-group">
            <label for="phone">Phone Number <span>*</span></label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              autocomplete="tel"
              required
            />
          </div>
        </div>

        <div class="section-header section-spacing">
          <h2>Callback details</h2>
          <p>Choose when and how you'd like us to contact you.</p>
        </div>

        <div class="form-group">
          <label for="callback_reason">
            Reason for Callback <span>*</span>
          </label>
          <select id="callback_reason" name="callback_reason" required>
            <option value="" disabled selected>Select a reason</option>
            <option value="general-enquiry">General Enquiry</option>
            <option value="sales">Sales</option>
            <option value="support">Support</option>
            <option value="product-enquiry">Product Enquiry</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="preferred_date">
              Preferred Date <span>*</span>
            </label>
            <input
              id="preferred_date"
              name="preferred_date"
              type="date"
              required
            />
          </div>

          <div class="form-group">
            <label for="preferred_time">
              Preferred Time <span>*</span>
            </label>
            <select id="preferred_time" name="preferred_time" required>
              <option value="" disabled selected>Select a time</option>
              <option value="09:00">9:00 AM</option>
              <option value="10:00">10:00 AM</option>
              <option value="11:00">11:00 AM</option>
              <option value="12:00">12:00 PM</option>
              <option value="13:00">1:00 PM</option>
              <option value="14:00">2:00 PM</option>
              <option value="15:00">3:00 PM</option>
              <option value="16:00">4:00 PM</option>
              <option value="17:00">5:00 PM</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label for="contact_method">
            Preferred Contact Method <span>*</span>
          </label>
          <select id="contact_method" name="contact_method" required>
            <option value="" disabled selected>Select a contact method</option>
            <option value="phone">Phone Call</option>
            <option value="email">Email</option>
            <option value="either">Either</option>
          </select>
        </div>

        <div class="form-group">
          <label for="message">Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Add any additional information..."
          ></textarea>
        </div>

        <!-- SmartFormify silent bot-check. Keep this field present and empty. -->
        <input
          type="text"
          name="notes_hqse"
          value=""
          autocomplete="off"
          tabindex="-1"
          aria-hidden="true"
          class="bot-check"
        />

        <div class="consent-group">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            value="accepted"
            required
          />
          <label for="consent">
            I agree to be contacted regarding my callback request.
          </label>
        </div>

        <button type="submit" class="submit-button">
          Request a Callback
        </button>
      </form>
    </section>
  </main>
</template>

<script setup lang="ts">
const endpointUrl = "https://api.smartformify.com/fe/YOUR_ENDPOINT_KEY"
</script>

<style src="~/assets/style.css"></style>
