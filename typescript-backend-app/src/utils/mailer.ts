import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rangapatashala@gmail.com',
    pass: 'mjtc btjj ubta zbsg'
  }
});

function loadTemplate(templateName: string): string {
  const filePath = path.join(__dirname, '../templates', templateName);
  return fs.readFileSync(filePath, 'utf-8');
}

export async function sendTemplateEmail(
  to: string,
  subject: string,
  templateName: string,
  replacements: Record<string, string>
) {
  let htmlContent = loadTemplate(templateName);
  
  for (const key in replacements) {
    const regex = new RegExp(`{{${key}}}`, 'g');
    htmlContent = htmlContent.replace(regex, replacements[key]);
  }

  const mailOptions = {
    from: '"RangaPaatshala" <rangapatashala@gmail.com>',
    to,
    subject,
    html: htmlContent
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ', info.response);
    return true;
  } catch (error) {
    console.error('Error sending email: ', error);
    return false;
  }
}
