import React, { useState, useRef } from 'react';
import axios from 'axios';
import './StudentDetails.css'; // Ensure this CSS file exists

const StudentDetails = () => {
    const [uniqueId, setUniqueId] = useState('');
    const [student, setStudent] = useState(null);
    const [error, setError] = useState('');
    const inputRef = useRef(null); // Use ref to control the input field

    const handleScan = async () => {
        console.log('Scanning for ID:', uniqueId); // Log the uniqueId to ensure it's being captured
        try {
            const response = await axios.get(`http://localhost:5000/api/students/details/${uniqueId}`);
            console.log('API Response:', response.data); // Log the API response
            setStudent(response.data);
            setError('');
        } catch (err) {
            console.error('API Error:', err); // Log any API errors
            setStudent(null);
            setError('Student not found');
        }
    };

    const handleReset = () => {
        setUniqueId(''); // Clear the input field
        setStudent(null); // Clear student details
        setError(''); // Clear error message
        inputRef.current.focus(); // Automatically focus the input field
    };

    return (
        <div className="student-details-container">
            <h2>Student Details</h2>
            <div className="form-group">
                <label htmlFor="uniqueId">Scan Unique ID</label>
                <input
                    type="text"
                    id="uniqueId"
                    placeholder="Enter Unique ID"
                    value={uniqueId}
                    onChange={(e) => setUniqueId(e.target.value)}
                    ref={inputRef} // Attach the ref to the input field
                />
                <div className="button-group">
                    <button onClick={handleScan} className="scan-button">Scan</button>
                    <button onClick={handleReset} className="reset-button">Reset</button>
                </div>
            </div>
            {student && (
                <div className="student-info">
                    <h3>Student Details</h3>
                    <p><strong>Unique ID:</strong> {student.uniqueId}</p>
                    <p><strong>Name:</strong> {student.name}</p>
                    <p><strong>Roll No:</strong> {student.rollNo}</p>
                    <p><strong>Branch:</strong> {student.branch}</p>
                    <p><strong>Semester:</strong> {student.semester}</p>
                    <p><strong>Phone No:</strong> {student.phoneNo}</p>
                    <p><strong>Fee Paid:</strong> {student.feePaid}</p>
                </div>
            )}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default StudentDetails;
