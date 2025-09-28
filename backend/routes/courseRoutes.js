import express from 'express';
import Course from "../models/Course.js"

const router = express.Router();

// returns all enabled coureses
router.get('/', async (req, res) => {
    try {
        const allCourses = await Course.find({ enabled: true });
        res.status(200).json(allCourses);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
})

// option to add POST route for admin creating courses, but I will just do that in mongodb shell for now
// because the user shouldn't have the ability to create courses


export default router;