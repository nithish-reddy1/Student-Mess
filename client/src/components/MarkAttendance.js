// MarkAttendance.js
import React, { useState } from 'react';
import axios from 'axios';

const MarkAttendance = () => {
    const [uniqueId, setUniqueId] = useState('');
    const [status, setStatus] = useState('Present');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/attendance', { uniqueId, status }); //replaced with entire link coming from backend
            setMessage(response.data.message);
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'Error marking attendance';
            setMessage(errorMessage);
        }
    };

    return (
        <div>
            <h1>Mark Attendance</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter Unique ID"
                    value={uniqueId}
                    onChange={(e) => setUniqueId(e.target.value)}
                    required
                />
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                </select>
                <button type="submit">Submit</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default MarkAttendance;
