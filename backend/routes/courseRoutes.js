import express from 'express';
import Course from "../models/Course.js"

const router = express.Router();

/**
 * Retrieves all enabled courses.
 * 
 * @scope public
 * @returns {Array} List of enabled courses
 */
router.get('/', async (req, res) => {
    try {
        const allCourses = await Course.find({ enabled: true });
        res.status(200).json(allCourses);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
})

//later add POST for admin role


export default router;