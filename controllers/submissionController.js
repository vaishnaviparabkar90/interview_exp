const Submission = require('../models/submission');

// Create a new submission
const createSubmission = async (req, res) => {
  try {
    const { name, country, company, questions } = req.body;

    const newSubmission = new Submission({
      name,
      country,
      company,
      questions,
      userId: req.user.id, // Authenticated user ID
    });

    const savedSubmission = await newSubmission.save();
    res.status(201).json(savedSubmission);
  } catch (error) {
    res.status(500).json({ message: 'Error creating submission', error });
  }
};

// Retrieve all submissions (public)
const getSubmissions = async (req, res) => {
    try {
        const submissions = await Submission.find();  // Fetch all submissions from the database
        res.status(200).json(submissions);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving submissions', error: error.message });
      }
};

// Retrieve submissions by the logged-in user
const getUserSubmissions = async (req, res) => {
  try {
    const userId = req.user.id; // Authenticated user ID from the token
    const submissions = await Submission.find({ userId }); // Use the Submission model
    res.status(200).json(submissions);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Error retrieving user submissions', error });
  }
};

module.exports = {
    createSubmission,
    getSubmissions,
    getUserSubmissions,
  };
  
