import React, { useState, useEffect } from 'react';
import axios from '../axios';

const Dashboard = () => {
  const [submissions, setSubmissions] = useState([]);
  const [message, setMessage] = useState('');
  const [isViewingAll, setIsViewingAll] = useState(true); // Track whether we're viewing all or user-specific submissions

  // Function to fetch all submissions
  const fetchAllSubmissions = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('/submissions', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubmissions(response.data);
      setMessage('');
      setIsViewingAll(true); // Update state to indicate viewing all submissions
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to fetch submissions');
    }
  };

  // Function to fetch submissions for the logged-in user
  const fetchUserSubmissions = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('/submissions/user', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubmissions(response.data);
      setMessage('');
      setIsViewingAll(false); // Update state to indicate viewing user-specific submissions
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to fetch your submissions');
    }
  };

  // Fetch all submissions on component load
  useEffect(() => {
    fetchAllSubmissions();
  }, []);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">
        {isViewingAll ? 'All Submissions' : 'My Submissions'}
      </h2>
      {message && <div className="alert alert-danger">{message}</div>}

      <div className="d-flex justify-content-center mb-3">
        <button
          className={`btn btn-${isViewingAll ? 'secondary' : 'primary'} mx-2`}
          onClick={fetchAllSubmissions}
          disabled={isViewingAll}
        >
          View All Submissions
        </button>
        <button
          className={`btn btn-${!isViewingAll ? 'secondary' : 'primary'} mx-2`}
          onClick={fetchUserSubmissions}
          disabled={!isViewingAll}
        >
          View My Submissions
        </button>
      </div>

      <div className="card">
        <div className="card-body">
          {submissions.length > 0 ? (
            <ul className="list-group">
              {submissions.map((submission, index) => (
                <li key={index} className="list-group-item">
                  <strong>{submission.company}</strong> - {submission.name} <br />
                  <small>{submission.country}</small> <br />
                  <small>
                    <strong>Questions:</strong> {submission.questions.join(', ')}
                  </small>
                </li>
              ))}
            </ul>
          ) : (
            <p>No submissions found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
