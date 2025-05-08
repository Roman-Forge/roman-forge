import { Resend } from 'resend';

const resend = new Resend(process.env.YOUR_RESEND_API_KEY);

export async function handler(event, context) {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { email } = JSON.parse(event.body);
    
    if (!email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Email required' })
      };
    }

    await resend.contacts.create({
      email: email,
      unsubscribed: false,
      audienceId: '30a19f1f-ed50-4481-a6ee-2cb54704beab',
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send email' })
    };
  }
}