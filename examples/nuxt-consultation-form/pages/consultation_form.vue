<template>
  <main class="form-container">
    <h1>Consultation Form</h1>

    <form :action="endpointUrl" method="POST">
      <div class="form-group">
        <label for="name">Full Name</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Enter your full name"
          autocomplete="name"
          required
        />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          autocomplete="email"
          required
        />
      </div>

      <div class="form-group">
        <label for="phone">Phone</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder="Enter your phone number"
          autocomplete="tel"
          required
        />
      </div>

      <div class="form-group">
        <label for="consultation_type">Consultation Type</label>
        <select
          id="consultation_type"
          name="consultation_type"
          required
        >
          <option value="" disabled selected>Select consultation type</option>
          <option value="general">General Consultation</option>
          <option value="business">Business Consultation</option>
          <option value="technical">Technical Consultation</option>
          <option value="product">Product Consultation</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div class="form-group">
        <label for="preferred_date">Preferred Date</label>
        <input
          id="preferred_date"
          name="preferred_date"
          type="date"
          required
        />
      </div>

      <div class="form-group">
        <label for="preferred_time">Preferred Time</label>
        <select
          id="preferred_time"
          name="preferred_time"
          required
        >
          <option value="" disabled selected>Select preferred time</option>
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

      <div class="form-group">
        <label for="company">Company / Organization</label>
        <input
          id="company"
          name="company"
          type="text"
          placeholder="Enter company or organization"
        />
      </div>

      <div class="form-group">
        <label for="consultation_details">Consultation Details</label>
        <textarea
          id="consultation_details"
          name="consultation_details"
          placeholder="Tell us about your consultation needs..."
          required
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

      <button type="submit">
        Request Consultation
      </button>
    </form>
  </main>
</template>

<script setup lang="ts">
const endpointUrl = "https://api.smartformify.com/fe/YOUR_ENDPOINT_KEY";
</script>

<style src="~/assets/style.css"></style>
