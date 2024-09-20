// Attendance.js
const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    uniqueId: {
        type: String,
        required: true,
        unique: true // Ensuring each uniqueId can only have one attendance record
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Present', 'Absent'],
        default: 'Present'
    }
}, {
    collection: 'attendances'
});

module.exports = mongoose.model('Attendance', attendanceSchema);
