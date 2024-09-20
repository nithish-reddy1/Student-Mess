const express = require('express');
const router = express.Router();
const Student = require('../models/Student'); // Import the Student model

// Register a new student
router.post('/register', async (req, res) => {
    const { uniqueId, name, rollNo, branch, semester, phoneNo, feePaid } = req.body;

    console.log('Received data:', req.body);

    try {
        const newStudent = new Student({
            uniqueId,
            name,
            rollNo,
            branch,
            semester,
            phoneNo,
            feePaid
        });

        await newStudent.save();
        res.status(201).json({ message: 'Student registered successfully!' });
    } catch (err) {
        console.error('Error:', err); // Log the error
        res.status(500).json({ error: 'Error registering student' });
    }
});


// Unregister a student
router.post('/unregister', async (req, res) => {
    const { uniqueId } = req.body;

    try {
        // Find and delete the student
        await Student.findOneAndDelete({ uniqueId });
        res.status(200).json({ message: 'Student unregistered successfully!' });
    } catch (err) {
        res.status(500).json({ error: 'Error unregistering student' });
    }
});

// Update student details
router.put('/update', async (req, res) => {
    const { uniqueId, name, rollNo, branch, semester, phoneNo, feePaid } = req.body;

    try {
        // Find and update the student
        const updatedStudent = await Student.findOneAndUpdate(
            { uniqueId },
            { name, rollNo, branch, semester, phoneNo, feePaid },
            { new: true } // Return the updated document
        );

        if (!updatedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json(updatedStudent);
    } catch (err) {
        res.status(500).json({ error: 'Error updating student details' });
    }
});

// Get student details by uniqueId
router.get('/details/:uniqueId', async (req, res) => {
    const { uniqueId } = req.params;

    try {
        // Find the student by uniqueId
        const student = await Student.findOne({ uniqueId });

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json(student);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching student details' });
    }
});

module.exports = router;