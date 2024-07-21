// Example API endpoint, adjust based on your backend
const API_BASE_URL = 'http://localhost:5000/api';

async function uploadResume(file) {
    const formData = new FormData();
    formData.append('resume', file);

    const response = await fetch(`${API_BASE_URL}/uploadResume`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Failed to upload resume');
    }

    return response.json();
}

async function submitJobDescription(description) {
    const response = await fetch(`${API_BASE_URL}/submitJobDescription`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
    });

    if (!response.ok) {
        throw new Error('Failed to submit job description');
    }

    return response.json();
}
