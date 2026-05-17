const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

const sendOTPEmail = async (toEmail, otp) => {
  await transporter.sendMail({
    from: `"PartWork Kerala" <${process.env.MAIL_USER}>`,
    to: toEmail,
    subject: 'PartWork Kerala - Verify your email',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto;">
        <h2 style="color: #1D9E75;">PartWork Kerala</h2>
        <p>Thank you for registering! Please verify your email address.</p>
        <div style="background: #f5f7fa; border-radius: 8px; padding: 24px; text-align: center; margin: 24px 0;">
          <p style="color: #555; margin-bottom: 8px;">Your OTP is:</p>
          <h1 style="color: #1D9E75; font-size: 40px; letter-spacing: 8px; margin: 0;">${otp}</h1>
          <p style="color: #888; font-size: 13px; margin-top: 8px;">This OTP expires in 10 minutes</p>
        </div>
        <p style="color: #888; font-size: 13px;">
          If you did not register on PartWork Kerala please ignore this email.
        </p>
      </div>
    `
  });
};

module.exports = { sendOTPEmail };