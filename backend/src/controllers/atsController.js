const Resume = require('../models/Resume');
const JobDescription = require('../models/JobDescription');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../../uploads');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

const uploadResume = async (req, res) => {
    try {
        upload.single('resume')(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: 'File upload error' });
            }

            const resume = new Resume({
                userId: req.user.id,
                filePath: req.file.path,
            });

            await resume.save();
            res.status(201).json({ message: 'Resume uploaded successfully', resume });
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getATSScore = async (req, res) => {
    try {
        const { userId, jobDescription } = req.body;

        // Assuming you have a function that calculates ATS score based on the resume and job description
        const atsScore = calculateATSScore(userId, jobDescription);

        res.status(200).json({ atsScore });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const calculateATSScore = (userId, jobDescription) => {
    // Placeholder logic for ATS score calculation
    // You would replace this with your actual ATS scoring logic
    return Math.floor(Math.random() * 100) + 1;
};

module.exports = {
    uploadResume,
    getATSScore,
};
