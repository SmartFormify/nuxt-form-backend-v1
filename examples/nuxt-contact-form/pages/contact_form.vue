<template>
  <main class="contact-card">
    <div class="contact-header">
      <h1>Contact Us</h1>
      <p>
        Have a question or need assistance? Send us a message and we'll
        get back to you as soon as possible.
      </p>
    </div>

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
        <label for="email">Email Address</label>
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
        <label for="subject">Subject</label>
        <input
          id="subject"
          name="subject"
          type="text"
          placeholder="What is your message about?"
          required
        />
      </div>

      <div class="form-group">
        <label for="message">Message</label>
        <textarea
          id="message"
          name="message"
          placeholder="Write your message..."
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

      <button type="submit" class="submit-button">
        Send Message
      </button>
    </form>
  </main>
</template>

<script setup lang="ts">
const endpointUrl = "https://api.smartformify.com/fe/YOUR_ENDPOINT_KEY";
</script>

<style src="~/assets/style.css"></style>
