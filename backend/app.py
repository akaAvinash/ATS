from flask import Flask, request, jsonify, redirect, url_for, session
from flask_restful import Api
from flask_cors import CORS
from authlib.integrations.flask_client import OAuth
from config import Config
from src.api.controllers import Login, Signup, UploadResume, ATSScore

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)
api = Api(app)
oauth = OAuth(app)

# Google and GitHub OAuth setup
oauth.register(
    name='google',
    client_id=Config.GOOGLE_CLIENT_ID,
    client_secret=Config.GOOGLE_CLIENT_SECRET,
    authorize_url='https://accounts.google.com/o/oauth2/auth',
    authorize_params=None,
    access_token_url='https://accounts.google.com/o/oauth2/token',
    access_token_params=None,
    refresh_token_url=None,
    redirect_uri='http://localhost:5000/auth/google/callback',
    client_kwargs={'scope': 'openid profile email'},
)

oauth.register(
    name='github',
    client_id=Config.GITHUB_CLIENT_ID,
    client_secret=Config.GITHUB_CLIENT_SECRET,
    authorize_url='https://github.com/login/oauth/authorize',
    authorize_params=None,
    access_token_url='https://github.com/login/oauth/access_token',
    access_token_params=None,
    refresh_token_url=None,
    redirect_uri='http://localhost:5000/auth/github/callback',
    client_kwargs={'scope': 'user:email'},
)

@app.route('/')
def index():
    return 'Welcome to ResumeX'

@app.route('/auth/google')
def auth_google():
    redirect_uri = url_for('authorized_google', _external=True)
    return oauth.google.authorize_redirect(redirect_uri)

@app.route('/auth/github')
def auth_github():
    redirect_uri = url_for('authorized_github', _external=True)
    return oauth.github.authorize_redirect(redirect_uri)

@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect('/')

@app.route('/auth/google/callback')
def authorized_google():
    token = oauth.google.authorize_access_token()
    user_info = oauth.google.parse_id_token(token)
    session['user'] = user_info
    return jsonify(user_info)

@app.route('/auth/github/callback')
def authorized_github():
    token = oauth.github.authorize_access_token()
    user_info = oauth.github.get('user', token=token)
    session['user'] = user_info.json()
    return jsonify(user_info.json())

api.add_resource(Login, '/login')
api.add_resource(Signup, '/signup')
api.add_resource(UploadResume, '/upload-resume')
api.add_resource(ATSScore, '/ats-score')

if __name__ == '__main__':
    app.run(debug=True)
