import mongoose from "../config/mongodb";

const formSchema = new mongoose.Schema({
  formType: {
    type: String,
    enum: ["demo", "enrollment"], // differentiate forms
    required: true,
  },

  personalInfo: {
    studentName: { type: String, required: true },
    parentName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    studentAge: { type: Number, required: false },
  },

  courseSelection: {
    course: { type: String, required: true },
    grade: { type: String, required: false },
  },

  demoPreferences: {
    preferredDate: { type: Date },
    preferredTime: { type: String },
    topicsOfInterest: { type: String },
  },

  enrollmentDetails: {
    preferredStartDate: { type: Date },
    courseDuration: { type: String },
    batchPreference: {
      type: String,
      enum: ["Small Group", "Regular Batch", "One-on-One"],
    },
    previousLearning: { type: String },
  },

  schedulePreferences: {
    preferredTimeSlots: { type: String },
    preferredDays: [{ type: String }],
  },

  additionalInfo: {
    goals: { type: String },
    specialRequirements: { type: String },
    heardAboutUs: { type: String },
  },

  consent: {
    termsAccepted: { type: Boolean, default: false },
  },
}, { timestamps: true });

export default mongoose.model("Form", formSchema, "inquiry_form");
