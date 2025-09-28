import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema({
  courses: [
    {
      student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "StudentProfile",
        required: true
      },
      course: {
        type: mongoose.Schema.Types.ObjectId,
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
})

  // Custom validator to prevent duplicate student-course pairs
  enrollmentSchema.path("courses").validate(function (courses) {
    const seen = new Set();
    for (const c of courses) {
      const key = `${c.student}_${c.course}`;
      if (seen.has(key)) return false;
      seen.add(key);
    }
    return true;
  }, "Duplicate course enrollment is not allowed.");

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);
export default Enrollment;