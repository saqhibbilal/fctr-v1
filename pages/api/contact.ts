import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

const smtpHost = process.env.SMTP_HOST;
const smtpPort = process.env.SMTP_PORT;
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: Number(smtpPort),
  secure: false, // true for 465, false for other ports
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
});

async function verifySMTP() {
  try {
    await transporter.verify();
    return true;
  } catch (error) {
    return false;
  }
}

function validateInput(body: any) {
  const { name, email, number, country, subject, inquiry } = body;
  if (!name || typeof name !== 'string') return 'Name is required.';
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return 'Valid email is required.';
  if (!number || typeof number !== 'string') return 'Number is required.';
  if (!country || typeof country !== 'string') return 'Country is required.';
  if (!subject || typeof subject !== 'string') return 'Subject is required.';
  if (!inquiry || typeof inquiry !== 'string') return 'Inquiry is required.';
  return null;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const error = validateInput(req.body);
  if (error) {
    return res.status(400).json({ error });
  }

  const smtpOk = await verifySMTP();
  if (!smtpOk) {
    return res.status(500).json({ error: 'SMTP connection failed. Please try again later.' });
  }

  const { name, email, number, country, subject, inquiry } = req.body;

  const html = `
    <div style="font-family: Arial, sans-serif; color: #222;">
      <h2>New Contact Inquiry</h2>
      <table style="border-collapse: collapse;">
        <tr><td style="font-weight:bold;">Name:</td><td>${name}</td></tr>
        <tr><td style="font-weight:bold;">Email:</td><td>${email}</td></tr>
        <tr><td style="font-weight:bold;">Number:</td><td>${number}</td></tr>
        <tr><td style="font-weight:bold;">Country:</td><td>${country}</td></tr>
        <tr><td style="font-weight:bold;">Subject:</td><td>${subject}</td></tr>
        <tr><td style="font-weight:bold;">Inquiry:</td><td>${inquiry}</td></tr>
      </table>
    </div>
  `;

  const text = `New Contact Inquiry\n\nName: ${name}\nEmail: ${email}\nNumber: ${number}\nCountry: ${country}\nSubject: ${subject}\nInquiry: ${inquiry}`;

  try {
    await transporter.sendMail({
      from: `Fusion Cloud Trainings <${smtpUser}>`,
      to: 'admin@fusioncloudtrainings.com',
      subject: `Contact Inquiry: ${subject}`,
      html,
      text,
      replyTo: email,
    });
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to send email. Please try again later.' });
  }
}
