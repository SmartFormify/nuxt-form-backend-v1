<template>
  <main class="form-container">
    <h1>Complaint Form</h1>

    <form
      :action="endpointUrl"
      method="POST"
    >
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
        />
      </div>

      <div class="form-group">
        <label for="complaint_type">Complaint Type</label>
        <select
          id="complaint_type"
          name="complaint_type"
          required
        >
          <option value="" disabled selected>Select complaint type</option>
          <option value="product">Product</option>
          <option value="service">Service</option>
          <option value="delivery">Delivery</option>
          <option value="billing">Billing</option>
          <option value="support">Customer Support</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div class="form-group">
        <label for="reference_number">Order / Reference Number</label>
        <input
          id="reference_number"
          name="reference_number"
          type="text"
          placeholder="Enter your order or reference number"
        />
      </div>

      <div class="form-group">
        <label for="complaint_subject">Complaint Subject</label>
        <input
          id="complaint_subject"
          name="complaint_subject"
          type="text"
          placeholder="Briefly describe your complaint"
          required
        />
      </div>

      <div class="form-group">
        <label for="complaint_details">Complaint Details</label>
        <textarea
          id="complaint_details"
          name="complaint_details"
          placeholder="Please provide details about your complaint..."
          required
        ></textarea>
      </div>

      <div class="form-group">
        <label for="preferred_resolution">Preferred Resolution</label>
        <select
          id="preferred_resolution"
          name="preferred_resolution"
        >
          <option value="" disabled selected>Select preferred resolution</option>
          <option value="refund">Refund</option>
          <option value="replacement">Replacement</option>
          <option value="repair">Repair</option>
          <option value="contact">Contact Me</option>
          <option value="other">Other</option>
        </select>
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
        Submit Complaint
      </button>
    </form>
  </main>
</template>

<script setup lang="ts">
const endpointUrl = "https://api.smartformify.com/fe/YOUR_ENDPOINT_KEY";
</script>

<style src="~/assets/style.css"></style>
