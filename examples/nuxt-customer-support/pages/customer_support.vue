<template>
  <main class="support-page">
    <section class="support-card">
      <div class="support-header">
        <div class="support-icon">?</div>

        <div>
          <span class="eyebrow">Customer Support</span>
          <h1>How can we help?</h1>
          <p>
            Submit your support request and our team will get back to you.
          </p>
        </div>
      </div>

      <form :action="endpointUrl" method="POST" class="support-form">
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
            <label for="phone">Phone Number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              autocomplete="tel"
            />
          </div>
        </div>

        <div class="section-header section-spacing">
          <h2>Support request</h2>
          <p>Tell us what you need help with.</p>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="support_category">
              Support Category <span>*</span>
            </label>
            <select id="support_category" name="support_category" required>
              <option value="" disabled selected>Select a category</option>
              <option value="account">Account</option>
              <option value="billing">Billing</option>
              <option value="technical">Technical</option>
              <option value="product">Product</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div class="form-group">
            <label for="priority">Priority <span>*</span></label>
            <select id="priority" name="priority" required>
              <option value="" disabled selected>Select priority</option>
              <option value="low">Low</option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label for="order_account_id">Order / Account ID</label>
          <input
            id="order_account_id"
            name="order_account_id"
            type="text"
            placeholder="Enter your order or account ID"
          />
        </div>

        <div class="form-group">
          <label for="subject">Subject <span>*</span></label>
          <input
            id="subject"
            name="subject"
            type="text"
            placeholder="Briefly describe your issue"
            required
          />
        </div>

        <div class="form-group">
          <label for="support_message">
            Support Message <span>*</span>
          </label>
          <textarea
            id="support_message"
            name="support_message"
            placeholder="Please describe your issue in detail..."
            required
          ></textarea>
        </div>

        <div class="form-group">
          <label for="additional_notes">Additional Notes</label>
          <textarea
            id="additional_notes"
            name="additional_notes"
            placeholder="Add any additional information..."
          ></textarea>
        </div>

        <div class="consent-group">
          <input
            id="contact_permission"
            name="contact_permission"
            type="checkbox"
            value="accepted"
          />
          <label for="contact_permission">
            You may contact me regarding this support request.
          </label>
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
          Submit Support Request
        </button>
      </form>
    </section>
  </main>
</template>

<script setup lang="ts">
const endpointUrl = "https://api.smartformify.com/fe/YOUR_ENDPOINT_KEY";
</script>

<style src="~/assets/style.css"></style>
