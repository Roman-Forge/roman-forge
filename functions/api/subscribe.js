// Import the Resend library (ensure it's compatible with Cloudflare Workers)
import { Resend } from "resend";

// Initialize Resend with your API key (stored in environment variables)
const resend = new Resend(process.env.YOUR_RESEND_API_KEY);

export default {
  async fetch(request, env, ctx) {
    // Only allow POST requests
    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json" },
      });
    }

    try {
      // Parse the request body
      const { email } = await request.json();

      // Validate email
      if (!email) {
        return new Response(JSON.stringify({ error: "Email required" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      // Call Resend API to create a contact
      await resend.contacts.create({
        email: email,
        unsubscribed: false,
        audienceId: "30a19f1f-ed50-4481-a6ee-2cb54704beab",
      });

      // Return success response
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      // Handle errors
      return new Response(JSON.stringify({ error: "Failed to send email" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  },
};

