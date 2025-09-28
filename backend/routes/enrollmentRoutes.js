import express from 'express';
import Enrollment from '../models/Enrollment.js'

const router = express.Router();

// returns all enrollments for a particular student
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

// add one course to enrollment 
router.post('/:studentId', async (req, res) => {
    try {
        const { studentId } = req.params;
        const { courseId } = req.body;

        const enrollment = await Enrollment.findOne({ "courses.student": studentId });
        
        // First course for this student
        if (!enrollment) {
            const newEnrollment = await Enrollment.create({
                courses: [{ student: studentId, course: courseId, dateEnrolled: new Date() }]
            })
        return res.status(201).json(newEnrollment);
        }

        // Check for duplicates (your validator will catch it too)
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

// remove one course from enrollment
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
