from flask import request, jsonify
from flask_restful import Resource
from src.api.services import authenticate_user, register_user, handle_resume_upload, calculate_ats_score

class Login(Resource):
    def post(self):
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        user = authenticate_user(email, password)
        if user:
            return jsonify(user)
        return {'message': 'Invalid credentials'}, 401

class Signup(Resource):
    def post(self):
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')
        user = register_user(name, email, password)
        if user:
            return jsonify(user)
        return {'message': 'Registration failed'}, 400

class UploadResume(Resource):
    def post(self):
        if 'resume' not in request.files:
            return {'message': 'No file part'}, 400
        file = request.files['resume']
        if file.filename == '':
            return {'message': 'No selected file'}, 400
        response = handle_resume_upload(file)
        return jsonify(response)

class ATSScore(Resource):
    def post(self):
        data = request.get_json()
        job_description = data.get('jobDescription')
        score = calculate_ats_score(job_description)
        return {'atsScore': score}
