import os
from flask import Flask
from flask_pymongo import PyMongo
from dotenv import  load_dotenv
from flask_cors import CORS

from routes import todo_routes 
from routes import auth_routes 

def create_run_server():
    app = Flask(__name__)
    CORS(app)
    
    load_dotenv() 
    app.config.from_object(os.environ['APP_SETTINGS'])
    app.mongo = PyMongo(app)

    auth_routes.auth_routes(app)
    todo_routes.todo_routes(app)
    

    if __name__ == '__main__':
        app.run(host="0.0.0.0", port=5000, debug=True)

create_run_server()