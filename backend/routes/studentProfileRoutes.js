import express from 'express';
import StudentProfile from '../models/StudentProfile.js';

const router = express.Router();

/**
 * Creates a new student profile.
 * 
 * @scope public
 * @param {Object} req.body - Student profile data (firstName, middleName, lastName, publicStudentId)
 * @returns {Object} The newly created student profile
 */
router.post('/', async (req, res) => {
    try {
        const profile = await StudentProfile.create(req.body);
        res.status(201).json(profile);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
})

/**
 * Retrieves a student profile by ID.
 * 
 * @scope public
 * @param {string} req.params.id - ID of the student profile
 * @returns {Object} The student profile if found
 */
router.get('/:id', async (req, res) => {
    try {
        const profile = await StudentProfile.findById(req.params.id);
        if (!profile || profile.isDeleted) return res.status(404).json({ error: 'Profile not found' });
        res.json(profile);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
})

/**
 * Updates a student profile by ID.
 * 
 * @scope public
 * @param {string} req.params.id - ID of the student profile
 * @param {Object} req.body - Updated student profile data
 * @returns {Object} The updated student profile
 */
router.put('/:id', async (req, res) => {
    try {
        const profile = await StudentProfile.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!profile || profile.isDeleted) {
            return res.status(404).json({ error: 'Profile not found' });
        }
        res.json(profile);
    } catch (err) {
    res.status(400).json({ error: err.message });
    }
})

/**
 * Soft deletes a student profile by ID.
 * 
 * @scope public
 * @param {string} req.params.id - ID of the student profile
 * @returns {Object} The updated student profile with isDeleted timestamp
 */
router.delete('/:id', async (req, res) => {
    try {
        const profile = await StudentProfile.findByIdAndUpdate(
            req.params.id,
            { isDeleted: new Date() },
            { new: true }
        )
        res.json(profile);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
})

export default router;