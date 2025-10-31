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
          <div style="background-color: white; border-radius: 8px; padding: 0; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
            <!-- Branded header -->
            <div style="background: linear-gradient(90deg, #7c4585 0%, #c95792 50%, #f8b55f 100%); padding: 20px; text-align: center;">
              <h1 style="color: #fff; margin: 0; font-size: 22px; font-weight: 700;">Fusion Cloud Trainings</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 6px 0 0; font-size: 13px;">New Contact Inquiry</p>
            </div>
            <div style="padding: 24px;">
              <!-- Intro -->
              <div style="text-align: center; margin-bottom: 18px;">
                <p style="color: #475569; margin: 0;">A new inquiry has been received from the contact form.</p>
              </div>

              <!-- Content -->
              <div style="margin-bottom: 18px; padding: 12px; background-color: #fbfbfd; border-radius: 6px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr style="margin-bottom: 12px; display: block;">
                    <td style="color: #7c4585; font-size: 14px; width: 110px; font-weight: 600;">Name:</td>
                    <td style="color: #0f172a; font-weight: 500;">${name}</td>
                  </tr>
                  <tr style="margin-bottom: 12px; display: block;">
                    <td style="color: #7c4585; font-size: 14px; font-weight: 600;">Email:</td>
                    <td style="color: #0f172a; font-weight: 500;">${email}</td>
                  </tr>
                  <tr style="margin-bottom: 12px; display: block;">
                    <td style="color: #7c4585; font-size: 14px; font-weight: 600;">Number:</td>
                    <td style="color: #0f172a; font-weight: 500;">${number}</td>
                  </tr>
                  <tr style="margin-bottom: 12px; display: block;">
                    <td style="color: #7c4585; font-size: 14px; font-weight: 600;">Country:</td>
                    <td style="color: #0f172a; font-weight: 500;">${country}</td>
                  </tr>
                  <tr style="margin-bottom: 12px; display: block;">
                    <td style="color: #7c4585; font-size: 14px; font-weight: 600;">Subject:</td>
                    <td style="color: #0f172a; font-weight: 500;">${subject}</td>
                  </tr>
                </table>
              </div>

              <div style="background-color: #fbfbfd; border-radius: 6px; padding: 14px;">
                <p style="color: #475569; font-size: 14px; margin: 0 0 8px 0;">Message:</p>
                <p style="color: #0f172a; margin: 0; white-space: pre-wrap;">${inquiry}</p>
              </div>
            </div>

            <!-- Footer -->
            <div style="text-align: center; padding: 14px; background-color: #fff; border-top: 1px solid rgba(0,0,0,0.03);">
              <p style="color: #64748b; font-size: 13px; margin: 0;">
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
