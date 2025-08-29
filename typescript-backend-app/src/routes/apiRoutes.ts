import { Router, Express } from 'express';

import { getCourses, getCourseById, createCourse, updateCourse, deleteCourse } from '../controllers/courseController';
import { getForms, getFormById, createForm, updateForm, deleteForm } from '../controllers/formController';
// import { jwtValidator } from '../middleware/jwtValidator';
import { sendTemplateEmail } from '../utils/mailer';

export function setApiRoutes(app: Express) {
  const router = Router();

  // Courses
  router.get('/courses', getCourses); 
  router.get('/courses/:id', getCourseById); 
  router.post('/courses', createCourse);
  router.patch('/courses/:id', updateCourse); // host and ip need to be restricted
  router.delete('/courses/:id', deleteCourse);

  // Forms
  router.get('/forms', getForms);
  router.get('/forms/:id', getFormById); 
  router.post('/forms', createForm);
  // router.patch('/forms/:id', updateForm);
  router.delete('/forms/:id', deleteForm);

  router.post('/send-mail', async (req, res) => {
    const { type, student_name, student_email, registration_id, temporary_password } = req.body;

    let templateName = '';
    let subject = '';

    if (type === 'form') {
      templateName = 'formRegistration.html';
      subject = 'Thank you for registering!';
    } else if (type === 'account') {
      templateName = 'studentCreation.html';
      subject = 'Your Account Has Been Created!';
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
  });

  app.use('/api', router);
}