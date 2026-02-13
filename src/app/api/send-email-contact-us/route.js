import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import path from "path";

export const runtime = "nodejs"; // ensure Node runtime for nodemailer

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      firstName,
      lastName,
      email,
      message,
    } = body || {};

    // Basic server-side validation matching your form
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // assets
    const imagePath = path.join(process.cwd(), "public/assets/icons/logo.png");

    // safe helpers
    const list = (arr) =>
      Array.isArray(arr) && arr.length
        ? arr.map((v) => (typeof v === "string" ? v : v?.label || v?.value || "")).filter(Boolean).join(", ")
        : "—";

    const esc = (v) =>
      String(v ?? "").replace(/[&<>"']/g, (m) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
      }[m]));

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: `${process.env.EMAIL_USER}`,
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1.0" />
<title>The Link Orbits | Thanks</title>
<style>
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");
  *{margin:0;padding:0;box-sizing:border-box;}
  body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;line-height:1.6;color:#2c3e50;background-color:#f8fafc;}
  .email-container{max-width:600px;margin:0 auto;background:#000000;border-radius:8px;overflow:hidden;padding:32px;}
  .header{padding:24px 32px;}
  .content{}
  .message-card{background:#ffffff;padding:40px 32px 50px 32px;}
  .message-card h2{font-family:"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Arial,sans-serif;color:#333;font-size:20px;font-weight:500;line-height:24px;margin-bottom:16px;}
  .message-card p{color:#333;line-height:1.6;margin:0;}
  .contact-card{padding:32px;background-color:#f7f9fc;}
  .contact-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;}
  .contact-header h3{font-family:"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Arial,sans-serif;color:#333;font-size:20px;font-weight:500;line-height:24px;margin:0;flex-grow:1;}
  .social-links{display:flex;gap:16px;}
  .social-icon{width:24px;height:24px;object-fit:fill;margin:0 4px;}
  .body-message p, .body-message div { margin-bottom:16px; }
  @media (max-width:640px){
    .email-container{margin:20px;max-width:calc(100% - 40px);padding:15px;}
    .message-card{padding:30px 20px;}
    .contact-card{padding:20px;}
  }
</style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <img src="cid:logo" style="width:170px;height:50px;" alt="Art By Encore" />
    </div>

    <div class="content">
      <div class="message-card">
        <h2>Form Submission Details</h2>
        <div class="body-message">
          <p style="font-size:18px;margin:8px 0;"><strong>Name:</strong> ${esc(firstName)} ${esc(lastName)}</p>
          <p style="font-size:18px;margin:8px 0;"><strong>Email:</strong> ${esc(email)}</p>
          <p style="font-size:18px;margin:8px 0;"><strong>Message:</strong> ${esc(message)}</p> 
        

          <p style="font-size:18px;margin:8px 0;">Best Regards<br/>The Art By Encore Team</p>
        </div>
      </div>

      <div class="contact-card">
        <div class="contact-header">
          <h3>Contact Us | </h3>
          <div class="social-links">
            <a href="https://facebook.com"><img src="cid:facebook" alt="Facebook" class="social-icon"/></a>
            <a href="https://twitter.com"><img src="cid:twitter" alt="Twitter" class="social-icon"/></a>
            <a href="https://linkedin.com"><img src="cid:linkedin" alt="LinkedIn" class="social-icon"/></a>
            <a href="https://instagram.com"><img src="cid:instagram" alt="Instagram" class="social-icon"/></a>
          </div>
        </div>
        <p>
          Tel:+44 787 876 1204<br/>
          Email:artbyencore1@gmail.com<br/>
          Address:77 Rea Road, NorthField Birmingham, West Midlands, UK B31 2PQ
        </p>
      </div>
    </div>
  </div>
</body>
</html>
`,
      attachments: [
        { filename: "logo.png", path: imagePath, cid: "logo" },
        { filename: "facebook.png", path: path.join(process.cwd(), "public/assets/icons/facebook.png"), cid: "facebook" },
        { filename: "twitter.png", path: path.join(process.cwd(), "public/assets/icons/twitter.png"), cid: "twitter" },
        { filename: "linkedin.png", path: path.join(process.cwd(), "public/assets/icons/linkedin-email.png"), cid: "linkedin" },
        { filename: "instagram.png", path: path.join(process.cwd(), "public/assets/icons/instagram.png"), cid: "instagram" },
      ],
    };

    const info = await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "Email sent successfully", info }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to send email", details: error.message }, { status: 500 });
  }
}
