document.getElementById('resumeForm')?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const fileInput = document.getElementById('resumeFile');
    const file = fileInput.files[0];

    if (file) {
        try {
            const result = await uploadResume(file);
            alert('Resume uploaded successfully!');
        } catch (error) {
            alert('Error uploading resume: ' + error.message);
        }
    }
});

document.getElementById('jobDescriptionForm')?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const description = document.getElementById('jobDescription').value;

    try {
        const result = await submitJobDescription(description);
        document.getElementById('atsScore').textContent = `ATS Score: ${result.score}`;
    } catch (error) {
        alert('Error submitting job description: ' + error.message);
    }
});

document.getElementById('loginForm')?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        // Replace with your login API endpoint
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const result = await response.json();
        alert('Login successful!');
        window.location.href = 'index.html'; // Redirect after successful login
    } catch (error) {
        alert('Error logging in: ' + error.message);
    }
});

document.getElementById('signupForm')?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        // Replace with your signup API endpoint
        const response = await fetch('http://localhost:5000/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        if (!response.ok) {
            throw new Error('Sign-up failed');
        }

        const result = await response.json();
        alert('Sign-up successful!');
        window.location.href = 'login.html'; // Redirect to login after successful sign-up
    } catch (error) {
        alert('Error signing up: ' + error.message);
    }
});
