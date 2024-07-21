// src/api/api.js
const BASE_URL = 'https://your-api-endpoint.com';

// Helper function to handle API requests
const apiRequest = async (endpoint, method = 'GET', data = null) => {
    const url = `${BASE_URL}${endpoint}`;
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('API Request Failed:', error);
        throw error;
    }
};

// API Call: User Login
export const loginUser = async (email, password) => {
    return apiRequest('/login', 'POST', { email, password });
};

// API Call: User Sign Up
export const signupUser = async (name, email, password) => {
    return apiRequest('/signup', 'POST', { name, email, password });
};

// API Call: Upload Resume
export const uploadResume = async (resumeFile) => {
    const formData = new FormData();
    formData.append('resume', resumeFile);

    const options = {
        method: 'POST',
        body: formData
    };

    try {
        const response = await fetch(`${BASE_URL}/upload-resume`, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Resume Upload Failed:', error);
        throw error;
    }
};

// API Call: Paste Job Description and Get ATS Score
export const getATSScore = async (jobDescription) => {
    return apiRequest('/ats-score', 'POST', { jobDescription });
};
