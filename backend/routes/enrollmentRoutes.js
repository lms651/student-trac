import express from 'express';
import Enrollment from '../models/Enrollment.js'

const router = express.Router();

/**
 * Gets all course enrollments for a student.
 * 
 * @scope public
 * @param {string} req.params.studentId - ID of the student
 * @returns {Array} List of the student's enrolled courses
 */
router.get('/:studentId', async (req, res) => {
    try {
        const enrollment = await Enrollment.findOne({ 'courses.student': req.params.studentId })
            .populate('courses.course')
            .populate('courses.student');
        if (!enrollment) return res.status(404).json({ error: 'No enrollment found for this student' });
        res.json(enrollment.courses);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
})

/**
 * Adds a course enrollment for a student.
 * 
 * @scope public
 * @param {string} req.params.studentId - ID of the student
 * @param {string} req.body.courseId - ID of the course to enroll
 * @returns {Object} The updated or newly created enrollment
 */
router.post('/:studentId', async (req, res) => {
    try {
        const { studentId } = req.params;
        const { courseId } = req.body;

        const enrollment = await Enrollment.findOne({ "courses.student": studentId });
        
        // Student's first course
        if (!enrollment) {
            const newEnrollment = await Enrollment.create({
                courses: [{ student: studentId, course: courseId, dateEnrolled: new Date() }]
            })
        return res.status(201).json(newEnrollment);
        }

        // Check for duplicates
        if (enrollment.courses.some(course => course.course.toString() === courseId)) {
            return res.status(400).json({ error: "Student is already enrolled in this course" });
        }

        enrollment.courses.push({ student: studentId, course: courseId, dateEnrolled: new Date() });
        await enrollment.save();
        res.status(200).json(enrollment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
})

/**
 * Removes a course from a student's enrollment.
 * 
 * @scope public
 * @param {string} req.params.studentId - ID of the student
 * @param {string} req.params.courseId - ID of the course to remove
 * @returns {Object} Updated enrollment with a success message
 */
router.delete('/:studentId/:courseId', async (req, res) => {
    try {
        const { studentId, courseId } = req.params;

        const enrollment = await Enrollment.findOne({ "courses.student": studentId });

        if (!enrollment) {
            return res.status(404).json({ error: "Enrollment not found for this student" });
        }

        // Remove the course from the array
        enrollment.courses = enrollment.courses.filter(
            c => c.course.toString() !== courseId
        );

        await enrollment.save();

        res.status(200).json({ message: "Course removed successfully", enrollment });
    } catch (err) {
    res.status(400).json({ error: err.message });
    }
})

/**
 * Updates a student's GPA for a specific course.
 * 
 * @scope public
 * @param {string} req.params.studentId - ID of the student
 * @param {string} req.params.courseId - ID of the course to update
 * @param {number} req.body.GPA - New GPA value
 * @returns {Object} Updated enrollment with a success message
 */
router.put('/:studentId/:courseId', async (req, res) => {
  try {
    const { studentId, courseId } = req.params;
    const { GPA } = req.body;

    const enrollment = await Enrollment.findOne({ "courses.student": studentId });

    if (!enrollment) {
      return res.status(404).json({ error: "Enrollment not found for this student" });
    }

    const courseEntry = enrollment.courses.find(c => c.course.toString() === courseId);
    if (!courseEntry) {
      return res.status(404).json({ error: "Course not found in this student's enrollments" });
    }

    if (GPA !== undefined) courseEntry.GPA = GPA;

    await enrollment.save();

    res.status(200).json({ message: "Enrollment updated successfully", enrollment });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
})

export default router;