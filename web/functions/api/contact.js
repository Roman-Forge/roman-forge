import { Resend } from 'resend';

export async function onRequestPost(context) {
    const { request } = context;
    const resend = new Resend(context.env.YOUR_RESEND_API_KEY);
    console.log('resebd', resend);
  
    try {
      // Parse the request body
      const formData = await request.json();
      const { firstName, lastName, email, company, phone, message, budget } = formData;
 
          // Log the received data (excluding sensitive information)
    console.log('Received form data:', {
        firstName,
        lastName,
        email,
        company: company || 'Not provided',
        phone: phone || 'Not provided',
        budget: budget || 'Not provided',
        messageLength: message?.length || 0
      });

      // Validate required fields
      if (!firstName || !lastName || !email || !message) {
        return new Response(
          JSON.stringify({ error: "Required fields missing" }), 
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
  
      // Send email using Resend
      const emailResponse = await resend.emails.send({
        from: "Roman Forge Contact Form <contact@romanforge.dev>",
        to: "contact@romanforge.dev",
        subject: `New Contact Form Submission from ${firstName} ${lastName}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${company || 'Not provided'}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Budget:</strong> ${budget || 'Not provided'}</p>
          <h3>Message:</h3>
          <p>${message}</p>
        `,
      });

        // Log successful email send
    console.log('Email sent successfully:', emailResponse);
  
      // Return success response
      return new Response(
        JSON.stringify({ success: true }), 
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (err) {
      console.error('Error sending email:', err);
      return new Response(
        JSON.stringify({ error: "Failed to send message" }), 
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }