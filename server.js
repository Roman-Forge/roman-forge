// server.js
const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');

const app = express();
const resend = new Resend(process.env.YOUR_RESEND_API_KEY);

app.use(cors());
app.use(express.json());

app.post('/api/subscribe', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });

  try {
    // Send yourself a notification or store the email as you wish
    await resend.emails.send({
      from: 'onboarding@resend.dev', // Must be a verified sender in Resend
      to: 'jacob@romanforge.dev',              // Where you want to receive signups
      subject: 'New Newsletter Signup',
      html: `<p>New subscriber: ${email}</p>`,
    });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send email' });
  }
});

const PORT = process.env.PORT || 5173;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));