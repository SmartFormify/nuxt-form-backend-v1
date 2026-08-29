<template>
  <main class="form-container">
    <h1>Event Registration</h1>

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
        />
      </div>

      <div class="form-group">
        <label for="event">Event</label>
        <select id="event" name="event" required>
          <option value="" disabled selected>Select an event</option>
          <option value="conference">Conference</option>
          <option value="workshop">Workshop</option>
          <option value="seminar">Seminar</option>
          <option value="webinar">Webinar</option>
          <option value="networking">Networking Event</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div class="form-group">
        <label for="event_date">Event Date</label>
        <input
          id="event_date"
          name="event_date"
          type="date"
          required
        />
      </div>

      <div class="form-group">
        <label for="attendees">Number of Attendees</label>
        <select id="attendees" name="attendees" required>
          <option value="" disabled selected>Select number of attendees</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6-10">6–10</option>
          <option value="11-25">11–25</option>
          <option value="26+">26+</option>
        </select>
      </div>

      <div class="form-group">
        <label for="ticket_type">Ticket Type</label>
        <select id="ticket_type" name="ticket_type" required>
          <option value="" disabled selected>Select ticket type</option>
          <option value="general">General Admission</option>
          <option value="standard">Standard</option>
          <option value="premium">Premium</option>
          <option value="vip">VIP</option>
          <option value="student">Student</option>
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
        <label for="additional_information">
          Additional Information
        </label>
        <textarea
          id="additional_information"
          name="additional_information"
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

      <button type="submit">
        Register for Event
      </button>
    </form>
  </main>
</template>

<script setup lang="ts">
const endpointUrl = "https://api.smartformify.com/fe/YOUR_ENDPOINT_KEY";
</script>

<style src="~/assets/style.css"></style>
