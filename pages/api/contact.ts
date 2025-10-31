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
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          @media only screen and (max-width: 620px) {
            .content {
              width: 100% !important;
              padding: 0 !important;
            }
          }
        </style>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f9fafb; font-family: Arial, sans-serif;">
        <div class="content" style="max-width: 620px; margin: 0 auto; padding: 20px;">
          <div style="background-color: white; border-radius: 8px; padding: 30px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #0f172a; margin: 0; font-size: 24px; font-weight: 600;">New Contact Inquiry</h1>
              <p style="color: #64748b; margin-top: 8px;">A new inquiry has been received from the contact form.</p>
            </div>
            
            <!-- Content -->
            <div style="margin-bottom: 30px;">
              <div style="margin-bottom: 20px; padding: 15px; background-color: #f8fafc; border-radius: 6px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr style="margin-bottom: 12px; display: block;">
                    <td style="color: #475569; font-size: 14px; width: 100px;">Name:</td>
                    <td style="color: #0f172a; font-weight: 500;">${name}</td>
                  </tr>
                  <tr style="margin-bottom: 12px; display: block;">
                    <td style="color: #475569; font-size: 14px;">Email:</td>
                    <td style="color: #0f172a; font-weight: 500;">${email}</td>
                  </tr>
                  <tr style="margin-bottom: 12px; display: block;">
                    <td style="color: #475569; font-size: 14px;">Number:</td>
                    <td style="color: #0f172a; font-weight: 500;">${number}</td>
                  </tr>
                  <tr style="margin-bottom: 12px; display: block;">
                    <td style="color: #475569; font-size: 14px;">Country:</td>
                    <td style="color: #0f172a; font-weight: 500;">${country}</td>
                  </tr>
                  <tr style="margin-bottom: 12px; display: block;">
                    <td style="color: #475569; font-size: 14px;">Subject:</td>
                    <td style="color: #0f172a; font-weight: 500;">${subject}</td>
                  </tr>
                </table>
              </div>
              
              <div style="background-color: #f8fafc; border-radius: 6px; padding: 15px;">
                <p style="color: #475569; font-size: 14px; margin: 0 0 8px 0;">Message:</p>
                <p style="color: #0f172a; margin: 0; white-space: pre-wrap;">${inquiry}</p>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e2e8f0;">
              <p style="color: #64748b; font-size: 14px; margin: 0;">
                © ${new Date().getFullYear()} Fusion Cloud Trainings. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
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
