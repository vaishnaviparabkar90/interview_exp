import React, { useState } from 'react';
import axios from '../axios';

const SubmitExperience = () => {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [company, setCompany] = useState('');
  const [questions, setQuestions] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        '/submissions',
        { name, country, company, questions: questions.split(',') },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Submission Successful');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Submission Failed');
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Submit Your Interview Experience</h2>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                className="form-control"
                placeholder="Enter your country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="company">Company</label>
              <input
                type="text"
                id="company"
                className="form-control"
                placeholder="Enter the company name"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="questions">Interview Questions (comma separated)</label>
              <textarea
                id="questions"
                className="form-control"
                placeholder="Enter interview questions"
                value={questions}
                onChange={(e) => setQuestions(e.target.value)}
                required
              ></textarea>
            </div>
            {message && <div className="alert alert-info mt-3">{message}</div>}
            <button type="submit" className="btn btn-primary w-100 mt-3">
              Submit Experience
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubmitExperience;
