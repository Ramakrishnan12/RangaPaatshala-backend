// import mongoose from 'mongoose';
import mongoose from "../config/mongodb";

const courseSchema = new mongoose.Schema({
  name: String,
  description: String,
  teacher: String,
  noOfEnrolled:{
    default: 0,
    type: Number,
    required: false
  },
  features: [String],
  batchSize: {
    type: Number,
    default: 100,
    required: false
    },
  cost: {
    type: String
  },
  imageUrl: {
    type: String,
    default: "",
    required: false
  },
  ratings: {
    type: Number,
    default: 0,
    required: false
  },
  duration: {
    type: String,
    default: "1 month",
    required: false
  },
  landPage: {
    type: Boolean,
    default: false,
    required: false
  }
});

export default mongoose.model("Course", courseSchema, "courses");