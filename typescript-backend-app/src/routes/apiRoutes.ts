import { Router, Express } from 'express';

import { getCourses, getCourseById, createCourse, updateCourse, deleteCourse } from '../controllers/courseController';
import { getForms, getFormById, createForm, updateForm, deleteForm } from '../controllers/formController';
// import { jwtValidator } from '../middleware/jwtValidator';

export function setApiRoutes(app: Express) {
  const router = Router();

  // Courses
  router.get('/courses', getCourses); 
  router.get('/courses/:id', getCourseById); 
  router.post('/courses', createCourse);
  router.patch('/courses/:id', updateCourse);
  router.delete('/courses/:id', deleteCourse);

  // Forms
  router.get('/forms', getForms);
  router.get('/forms/:id', getFormById); 
  router.post('/forms', createForm);
  router.patch('/forms/:id', updateForm);
  router.delete('/forms/:id', deleteForm);

  app.use('/api', router);
}