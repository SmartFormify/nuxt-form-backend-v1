<template>
  <main class="form-container">
    <h1>Customer Review</h1>

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
        <label for="rating">Overall Rating</label>
        <select id="rating" name="rating" required>
          <option value="" disabled selected>Select your rating</option>
          <option value="5">5 - Excellent</option>
          <option value="4">4 - Very Good</option>
          <option value="3">3 - Good</option>
          <option value="2">2 - Fair</option>
          <option value="1">1 - Poor</option>
        </select>
      </div>

      <div class="form-group">
        <label for="service_product">Service / Product</label>
        <input
          id="service_product"
          name="service_product"
          type="text"
          placeholder="What service or product are you reviewing?"
          required
        />
      </div>

      <div class="form-group">
        <label for="review">Review</label>
        <textarea
          id="review"
          name="review"
          placeholder="Tell us about your experience..."
          required
        ></textarea>
      </div>

      <div class="form-group">
        <label for="recommend">Would You Recommend Us?</label>
        <select id="recommend" name="recommend" required>
          <option value="" disabled selected>Select an option</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="maybe">Maybe</option>
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
        Submit Review
      </button>
    </form>
  </main>
</template>

<script setup lang="ts">
const endpointUrl = "https://api.smartformify.com/fe/YOUR_ENDPOINT_KEY";
</script>

<style src="~/assets/style.css"></style>
