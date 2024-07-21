const express = require('express');
const { uploadResume, getATSScore } = require('../controllers/atsController');
const router = express.Router();

// Resume upload route
router.post('/uploadResume', uploadResume);

// Get ATS score route
router.post('/getATSScore', getATSScore);

module.exports = router;
