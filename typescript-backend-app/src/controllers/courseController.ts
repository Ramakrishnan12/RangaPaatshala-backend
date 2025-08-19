import Course from '../models/courseModel';
import { Request, Response } from 'express';

export const getCourses = async (req: Request, res: Response) => {
  try {
    const { teacher, minRating, maxRating, cost, landPage, page, limit, sort } = req.query;

    const filter: any = {};

    if (teacher) filter.teacher = teacher;
    if (cost) filter.cost = cost;
    if (landPage) filter.landPage = landPage === "true";
    if (minRating) filter.ratings = { ...filter.ratings, $gte: Number(minRating) };
    if (maxRating) filter.ratings = { ...filter.ratings, $lte: Number(maxRating) };

    const pageNum = Number(page) || 1;
    const pageSize = Number(limit) || 20;
    const skip = (pageNum - 1) * pageSize;

    let query = Course.find(filter).skip(skip).limit(pageSize);

    if (sort) query = query.sort(String(sort));

    const courses = await query;

    // ✅ Always return as array of objects
    res.json(Array.isArray(courses) ? courses : [courses]);
  } catch (err) {
    res.status(500).json({ message: "Error fetching courses", error: err });
  }
};

export const getCourseById = async (req: Request, res: Response) => {
  try {
    const { teacher, minRating, maxRating } = req.query;

    const filter: any = { _id: req.params.id };

    if (teacher) filter.teacher = teacher;
    if (minRating) filter.ratings = { ...filter.ratings, $gte: Number(minRating) };
    if (maxRating) filter.ratings = { ...filter.ratings, $lte: Number(maxRating) };

    const course = await Course.findOne(filter);

    // ✅ Return always as an array
    if (!course) return res.json([]);  
    res.json([course]);
  } catch (err) {
    res.status(500).json({ message: "Error fetching course", error: err });
  }
};


export const createCourse = async (req: Request, res: Response) => {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
};

export const updateCourse = async (req: Request, res: Response) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!course) return res.status(404).json({ message: 'Course not found' });
  res.json(course);
};

export const deleteCourse = async (req: Request, res: Response) => {
  const course = await Course.findByIdAndDelete(req.params.id);
  if (!course) return res.status(404).json({ message: 'Course not found' });
  res.json({ message: 'Course deleted' });
};