import Form from '../models/formModel';
import { Request, Response } from 'express';

export const getForms = async (req: Request, res: Response) => {
  try {
    const { name, email, sort } = req.query;

    // Build filter object dynamically
    const filter: any = {};
    if (name) filter.name = new RegExp(String(name), "i");
    if (email) filter.email = new RegExp(String(email), "i");

    // Build query
    let query = Form.find(filter);

    // Sorting (e.g., ?sort=createdAt or ?sort=-createdAt)
    if (sort) query = query.sort(String(sort));

    // Execute → return only array of objects
    const forms = await query;
    res.json(forms);
  } catch (err) {
    res.status(500).json({ message: "Error fetching forms", error: err });
  }
};

export const getFormById = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;

    const filter: any = { _id: req.params.id };
    if (email) filter.email = new RegExp(String(email), "i");

    const form = await Form.findOne(filter);

    if (!form) return res.status(404).json({ message: "Form not found" });
    res.json(form);
  } catch (err) {
    res.status(500).json({ message: "Error fetching form", error: err });
  }
};

// ✅ Create a new form
export const createForm = async (req: Request, res: Response) => {
  const form = new Form(req.body);
  await form.save();
  res.status(201).json(form);
};

// ✅ Update form
export const updateForm = async (req: Request, res: Response) => {
  const form = await Form.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!form) return res.status(404).json({ message: 'Form not found' });
  res.json(form);
};

// ✅ Delete form
export const deleteForm = async (req: Request, res: Response) => {
  const form = await Form.findByIdAndDelete(req.params.id);
  if (!form) return res.status(404).json({ message: 'Form not found' });
  res.json({ message: 'Form deleted' });
};
