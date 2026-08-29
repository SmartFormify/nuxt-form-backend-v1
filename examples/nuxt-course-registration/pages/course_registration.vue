<template>
  <main class="form-container">
    <h1>Course Registration</h1>

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
        <label for="course">Course</label>
        <select id="course" name="course" required>
          <option value="" disabled selected>Select a course</option>
          <option value="web-development">Web Development</option>
          <option value="data-science">Data Science</option>
          <option value="digital-marketing">Digital Marketing</option>
          <option value="ui-ux-design">UI/UX Design</option>
          <option value="business-management">Business Management</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div class="form-group">
        <label for="highest_education">Highest Education</label>
        <select id="highest_education" name="highest_education" required>
          <option value="" disabled selected>Select education level</option>
          <option value="high-school">High School</option>
          <option value="diploma">Diploma</option>
          <option value="bachelors">Bachelor's Degree</option>
          <option value="masters">Master's Degree</option>
          <option value="doctorate">Doctorate</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div class="form-group">
        <label for="learning_mode">Preferred Learning Mode</label>
        <select id="learning_mode" name="learning_mode" required>
          <option value="" disabled selected>Select learning mode</option>
          <option value="online">Online</option>
          <option value="in-person">In Person</option>
          <option value="hybrid">Hybrid</option>
        </select>
      </div>

      <div class="form-group">
        <label for="start_date">Preferred Start Date</label>
        <input
          id="start_date"
          name="start_date"
          type="date"
          required
        />
      </div>

      <div class="form-group">
        <label for="additional_information">Additional Information</label>
        <textarea
          id="additional_information"
          name="additional_information"
          placeholder="Tell us anything else about your registration..."
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
        Register for Course
      </button>
    </form>
  </main>
</template>

<script setup lang="ts">
const endpointUrl = "https://api.smartformify.com/fe/YOUR_ENDPOINT_KEY";
</script>

<style src="~/assets/style.css"></style>
