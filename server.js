// server.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';

const app = express();
const resend = new Resend(process.env.YOUR_RESEND_API_KEY); // <-- Replace with your Resend API key

app.use(cors());
app.use(express.json());

app.post('/api/subscribe', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });
  try {
    // Send yourself a notification or store the email as you wish
 
  resend.contacts.create({
    email: email,
    unsubscribed: false,
    audienceId: '30a19f1f-ed50-4481-a6ee-2cb54704beab',
  });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send email' });
  }
});

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));