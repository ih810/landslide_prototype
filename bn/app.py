from flask import Flask, request, json, jsonify
from azure.storage.fileshare import ShareServiceClient, generate_account_sas, ResourceTypes, AccountSasPermissions
from datetime import datetime, timedelta
import os
from os.path import join, dirname
from dotenv import load_dotenv
from flask_classy import route
from Util.azure_test import List

from Router.homepage import Homepage_Route
from Router.login import Login_Route
from Router.new_project import New_Project_Route
from Router.new_model_setting import New_Model_Config
from Router.pretrain_list import Pretrain_List
from Router.upload_input import Upload_Input
from Router.validate_input import Validate_Input
from Router.view_performance import View_Performance
from Router.view_results import View_Results

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

ACC_NAME = os.environ.get("ACC_NAME")
ACC_KEY = os.environ.get("ACC_KEY")
CONN_STR = os.environ.get("CONN_STR")

# List('data/')
app = Flask(__name__)

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
