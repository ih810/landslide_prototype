from flask import Flask
import os
from os.path import join, dirname
from dotenv import load_dotenv

# Routers are encapsulated
from Router import *

# load dotenv
dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

# environment var for security credential
ACC_NAME = os.environ.get("ACC_NAME")
ACC_KEY = os.environ.get("ACC_KEY")
CONN_STR = os.environ.get("CONN_STR")

app = Flask(__name__)

# default route_base="/" for api that consist only 1 endpoint
Login_Route.register(app, route_base='/')
Homepage_Route.register(app, route_base='/homepage')
New_Project_Route.register(app, route_base='/')
New_Model_Config.register(app, route_base='/')
Pretrain_List.register(app, route_base='/pre-train-list')
Upload_Input.register(app, route_base='/upload-input')
Validate_Input.register(app, route_base='/validate-input')
View_Performance.register(app, route_base='/view-performance')
View_Results.register(app, route_base='/view-result')

if __name__ == '__main__':
    # run app in debug mode on port 5000
    app.run(debug=True, port=5000)
