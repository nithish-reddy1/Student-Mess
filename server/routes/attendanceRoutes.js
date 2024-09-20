// attendanceRoutes.js
const express = require('express');
const Attendance = require('../models/Attendance'); // Import was incorrect , ./models/Attendance

const router = express.Router();

router.post('/', async (req, res) => {
    const { uniqueId, status } = req.body;

    try {
        // Check if attendance record exists
        const existingAttendance = await Attendance.findOne({ uniqueId });

        if (existingAttendance) {
            // Update existing attendance record
            existingAttendance.status = status;
            existingAttendance.timestamp = Date.now(); // Update timestamp
            await existingAttendance.save();
            return res.status(200).json({ message: 'Attendance updated successfully' });
        }

        // Create a new attendance record if it doesn't exist
        const attendance = new Attendance({
            uniqueId,
            status
        });

        await attendance.save();

        res.status(201).json({ message: 'Attendance marked successfully' });
    } catch (error) {
        console.error('Error while marking attendance:', error);
        res.status(500).json({ message: error.message || 'An error occurred' });
    }
});

module.exports = router;
