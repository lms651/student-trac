import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema({
  courses: [
    {
      student: {
        type: Schema.Types.ObjectId,
        ref: "StudentProfile",
        required: true
      },
      course: {
        type: Schema.Types.ObjectId,
        ref: "Course",
        required: true
      },
      GPA: {
        type: Number,
        default: 0.00
      },
      dateEnrolled: {
        type: Date,
        required: true
      }
    }
  ]
}, {
  timestamps: true
});

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);
export default Enrollment;