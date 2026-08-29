<template>
  <main class="form-container">
    <h1>Bug Report</h1>

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
          required
        >
      </div>

      <div class="form-group">
        <label for="email">Email</label>

        <input
          id="email"
          name="email"
          type="email"
          required
        >
      </div>

      <div class="form-group">
        <label for="bug_title">Bug Title</label>

        <input
          id="bug_title"
          name="bug_title"
          type="text"
          placeholder="Briefly describe the issue"
          required
        >
      </div>

      <div class="form-group">
        <label for="category">Bug Category</label>

        <select
          id="category"
          name="category"
          required
        >
          <option value="">Select a category</option>
          <option value="ui">UI / Design</option>
          <option value="functionality">Functionality</option>
          <option value="performance">Performance</option>
          <option value="security">Security</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div class="form-group">
        <label for="severity">Severity</label>

        <select
          id="severity"
          name="severity"
          required
        >
          <option value="">Select severity</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </select>
      </div>

      <div class="form-group">
        <label for="page_url">Page URL</label>

        <input
          id="page_url"
          name="page_url"
          type="url"
          placeholder="https://example.com/page"
        >
      </div>

      <div class="form-group">
        <label for="description">Bug Description</label>

        <textarea
          id="description"
          name="description"
          placeholder="Describe the issue and what happened."
          required
        ></textarea>
      </div>

      <div class="form-group">
        <label for="steps">Steps to Reproduce</label>

        <textarea
          id="steps"
          name="steps"
          placeholder="1. Go to...
2. Click on...
3. The issue occurs..."
        ></textarea>
      </div>

      <div class="form-group">
        <label for="expected_result">Expected Result</label>

        <textarea
          id="expected_result"
          name="expected_result"
          placeholder="What should have happened?"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="actual_result">Actual Result</label>

        <textarea
          id="actual_result"
          name="actual_result"
          placeholder="What actually happened?"
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
      >

      <button type="submit">
        Submit Bug Report
      </button>
    </form>
  </main>
</template>

<script setup lang="ts">
const endpointUrl =
  "https://api.smartformify.com/fe/YOUR_ENDPOINT_KEY";
</script>

<style src="~/assets/style.css"></style>
