// Import the Resend library (ensure it's compatible with Cloudflare Workers)
import { Resend } from "resend";

// functions/subscribe.js
export async function onRequestPost(context) {
  const { request } = context;
  const resend = new Resend(context.env.YOUR_RESEND_API_KEY);

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
}
