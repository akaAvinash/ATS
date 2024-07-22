import pymongo
from werkzeug.security import generate_password_hash, check_password_hash
from config import Config

client = pymongo.MongoClient(Config.MONGO_URI)
db = client['resume_db']

def authenticate_user(email, password):
    user = db.users.find_one({'email': email})
    if user and check_password_hash(user['password'], password):
        return {'email': user['email'], 'name': user['name']}
    return None

def register_user(name, email, password):
    hashed_password = generate_password_hash(password)
    result = db.users.insert_one({'name': name, 'email': email, 'password': hashed_password})
    if result.inserted_id:
        return {'email': email, 'name': name}
    return None

def handle_resume_upload(file):
    # Save file and process it
    filename = file.filename
    file.save(f'./uploads/{filename}')
    return {'message': 'Resume uploaded successfully'}

def calculate_ats_score(job_description):
    # Placeholder for ATS score calculation logic
    return 85
