<template>
  <main class="form-container">
    <h1>Donation Enquiry</h1>

    <form :action="endpointUrl" method="POST">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Enter your name"
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
        />
      </div>

      <div class="form-group">
        <label for="donation_type">Donation Type</label>
        <select id="donation_type" name="donation_type" required>
          <option value="" disabled selected>Select donation type</option>
          <option value="one-time">One-time Donation</option>
          <option value="monthly">Monthly Donation</option>
          <option value="annual">Annual Donation</option>
          <option value="in-kind">In-kind Donation</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div class="form-group">
        <label for="donation_amount">Donation Amount</label>
        <input
          id="donation_amount"
          name="donation_amount"
          type="number"
          min="0"
          step="0.01"
          placeholder="Enter donation amount"
        />
      </div>

      <div class="form-group">
        <label for="message">Enquiry / Message</label>
        <textarea
          id="message"
          name="message"
          placeholder="Tell us about your donation enquiry..."
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
        Submit Enquiry
      </button>
    </form>
  </main>
</template>

<script setup lang="ts">
const endpointUrl = "https://api.smartformify.com/fe/YOUR_ENDPOINT_KEY";
</script>

<style src="~/assets/style.css"></style>
