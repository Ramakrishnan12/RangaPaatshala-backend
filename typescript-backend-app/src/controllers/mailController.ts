import { Request, Response } from 'express';
import { sendTemplateEmail } from '../utils/mailer';

export const handleSendMail = async (req: Request, res: Response) => {
  const { type, student_name, student_email, registration_id, temporary_password } = req.body;

  let templateName = '';
  let subject = '';

  if (type === 'form') {
    templateName = 'formRegistration.html';
    subject = 'Thank you for registering!';
    // You can add more logic for 'form' type here if needed
  } else if (type === 'account') {
    templateName = 'studentCreation.html';
    subject = 'Your Account Has Been Created!';
    // You can add more logic for 'account' type here if needed
  } else {
    return res.status(400).json({ message: 'Invalid mail type' });
  }

  const isSent = await sendTemplateEmail(
    'nk0353273@gmail.com', // to
    subject,
    templateName,
    {
      student_name,
      student_email,
      registration_id: registration_id || '',
      temporary_password: temporary_password || ''
    }
  );

  if (isSent) {
    res.json({ message: 'Email sent successfully' });
  } else {
    res.status(500).json({ message: 'Failed to send email' });
  }
};