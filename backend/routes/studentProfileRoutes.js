import express from 'express';
import StudentProfile from '../models/StudentProfile.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const profile = await StudentProfile.create(req.body);
        res.status(201).json(profile);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
})

router.get('/:id', async (req, res) => {
    try {
        const profile = await StudentProfile.findById(req.params.id);
        if (!profile || profile.isDeleted) return res.status(404).json({ error: 'Profile not found' });
        res.json(profile);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
})

router.put('/:id', async (req, res) => {
    try {
        const profile = await StudentProfile.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.json(profile);
    } catch (err) {
    res.status(400).json({ error: err.message });
    }
})

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