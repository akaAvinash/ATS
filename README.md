ATS Score Website
Overview
The ATS Score Website is a web application designed to help users assess their resumes against job descriptions using an ATS (Applicant Tracking System) scoring system. The application features both frontend and backend components and is designed to be used for personal or limited access.

Features
Resume Upload: Users can upload their resumes.
ATS Scoring: Users can paste a job description and receive an ATS score for their resume.
User Authentication: Sign up and log in to manage user accounts.
Tech Stack
Frontend: HTML, CSS, JavaScript
Backend: Node.js, Express.js
Database: MongoDB
File Upload: Multer for handling file uploads
Hosting: Local or free-tier platforms (Heroku, Vercel, etc.)
Installation
Prerequisites
Node.js (v14 or later)
MongoDB (installed locally or using a cloud service)
Clone the Repository
bash
Copy code
git clone https://github.com/akaAvinash/ATS.git
cd ATS
Backend Setup
Navigate to the Backend Directory

bash
Copy code
cd backend
Install Dependencies

bash
Copy code
npm install
Create Environment Variables

Create a .env file in the backend directory with the following content:

plaintext
Copy code
PORT=5000
MONGO_URI=mongodb://localhost:27017/ats
JWT_SECRET=your_jwt_secret
Replace your_jwt_secret with a secure secret key of your choice.

Start the Backend Server

bash
Copy code
npm start
The server will be running on http://localhost:5000.

Frontend Setup
Navigate to the Frontend Directory

bash
Copy code
cd ../frontend
Install Dependencies

You can directly use the static files if you are not using a build tool. Ensure all necessary files (HTML, CSS, JavaScript) are properly linked.

Open the Frontend

Open the index.html file in your web browser to view the frontend.

API Endpoints
1. Upload Resume
Endpoint: POST /api/resumes/upload

Description: Upload a resume file.

Request Body: Form-data with a file field named resume.

Authentication: Required (add a valid JWT token in the Authorization header).

Success Response:

json
Copy code
{
  "message": "Resume uploaded successfully",
  "resume": {
    "_id": "resumeId",
    "userId": "userId",
    "filePath": "path/to/resume"
  }
}
Error Response:

json
Copy code
{
  "message": "File upload error"
}
2. Get ATS Score
Endpoint: POST /api/resumes/score

Description: Get the ATS score for a resume based on a job description.

Request Body:

json
Copy code
{
  "userId": "userId",
  "jobDescription": "string"
}
Success Response:

json
Copy code
{
  "atsScore": 85
}
Error Response:

json
Copy code
{
  "message": "Server error"
}
Testing
To test the API, you can use Postman:

Upload Resume:

Method: POST
URL: http://localhost:5000/api/resumes/upload
Body: Form-data with the file field named resume.
Get ATS Score:

Method: POST
URL: http://localhost:5000/api/resumes/score
Body: JSON with userId and jobDescription.
Deployment
Local Deployment
Ensure that MongoDB is running.
Start the backend server using npm start.
Open the frontend in your browser.
Cloud Deployment
Heroku: Follow Heroku’s documentation to deploy the backend.
Vercel/Netlify: Use these platforms for frontend deployment.
Contributing
If you want to contribute to this project, follow these steps:

Fork the repository.
Create a new branch.
Make your changes.
Submit a pull request.

Contact
For any questions or feedback, please contact:

Email:aviwizz01@gmail.com
GitHub: github.com/akaAvinash
