const express = require('express');
const {
  createSubmission,
  getSubmissions,
  getUserSubmissions,
} = require('../controllers/submissionController');
const auth = require('../middleware/auth');

const router = express.Router();

// Create a new submission
router.post('/', auth, createSubmission);

// Retrieve all submissions (public)

router.get('/', auth, getSubmissions); 
// Retrieve submissions by the logged-in user
router.get('/user', auth, getUserSubmissions);

module.exports = router;
