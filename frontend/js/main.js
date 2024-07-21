// src/main.js
import { loginUser, signupUser, uploadResume, getATSScore } from './api/api.js';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const resumeForm = document.getElementById('resume-form');
    const atsForm = document.getElementById('ats-form');

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            try {
                const response = await loginUser(email, password);
                console.log('Login successful:', response);
            } catch (error) {
                console.error('Login failed:', error);
            }
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            try {
                const response = await signupUser(name, email, password);
                console.log('Sign up successful:', response);
            } catch (error) {
                console.error('Sign up failed:', error);
            }
        });
    }

    if (resumeForm) {
        resumeForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const resumeFile = document.getElementById('resume-file').files[0];
            try {
                const response = await uploadResume(resumeFile);
                console.log('Resume upload successful:', response);
            } catch (error) {
                console.error('Resume upload failed:', error);
            }
        });
    }

    if (atsForm) {
        atsForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const jobDescription = document.getElementById('job-description').value;
            try {
                const response = await getATSScore(jobDescription);
                console.log('ATS Score:', response);
            } catch (error) {
                console.error('Failed to get ATS score:', error);
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const googleLoginButton = document.getElementById('google-login');
    const githubLoginButton = document.getElementById('github-login');

    if (googleLoginButton) {
        googleLoginButton.addEventListener('click', () => {
            window.location.href = '/auth/google'; // Redirect to your backend route
        });
    }

    if (githubLoginButton) {
        githubLoginButton.addEventListener('click', () => {
            window.location.href = '/auth/github'; // Redirect to your backend route
        });
    }
});
