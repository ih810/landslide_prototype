from flask import Flask, request, json, jsonify
from azure.storage.fileshare import ShareServiceClient, generate_account_sas, ResourceTypes, AccountSasPermissions
from datetime import datetime, timedelta
import os
from os.path import join, dirname
from dotenv import load_dotenv
from azure_test import List
import pandas as pd
import tables

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

ACC_NAME = os.environ.get("ACC_NAME")
ACC_KEY = os.environ.get("ACC_KEY")
CONN_STR = os.environ.get("CONN_STR")

# List('data/')
app = Flask(__name__)


@app.route('/', methods=['GET'])
def test():
    data_list = []
    azure_test = List('data/')
    # for item in azure_test:
    #     data_list.append(item.name)
    # print(data_list)
    print('fuck', azure_test)
    return azure_test


@app.route('/login', methods=['POST'])
def login():
    login_data = request.form
    print(login_data['username'])
    print(login_data['password'])
    return login_data


@app.route('/homepage/admin-dashboard', methods=['GET'])
# return all project available
def get_all_project():
    user_id = request.args.get('user_id')
    return user_id


@app.route('/homepage/user-dashboard', methods=['GET'])
# return all project of the user
def get_user_project():
    user_id = request.args.get('user_id')
    return user_id


@app.route('/homepage/undo-project', methods=['PUT'])
# return void/all project?
def undo_project():
    project_id = request.args.get('project_id')
    return project_id


@app.route('/homepage/delete-project', methods=['DELETE'])
# return void/all project?
def delete_project():
    project_id = request.args.get('project_id')
    return project_id


@app.route('/new-project', methods=['POST'])
# return project info
def new_project():
    body_json = request.get_json()

    # construct response object
    response_json = {
        'project_id': 1,
        'project_name': body_json["project_name"]
    }

    return response_json


@app.route('/new-model-config', methods=['POST'])
# return void
def new_model_config():
    # get needed data
    project_id = request.args.get('project_id')
    body_json = request.get_json()

    # construct response object
    response_json = {
        'project_id': project_id,
        'project_width': body_json["width"],
        'project_height': body_json["height"],
    }

    return ('', 200)


@app.route('/pre-train-list/model-info', methods=['GET'])
# return list of pretrain model
def list_pretrained():
    # list dir from azure
    response_json = {'model_info':
                     [{
                         "model_name": "hong kong1",
                         "location": "Hong Kong",
                         "Percentage": "93%",
                         "image": "url/base64"
                     }, {
                         "model_name": "hong kong2",
                         "location": "Hong Kong",
                         "Percentage": "94%",
                         "image": "url/base64"
                     }, {
                         "model_name": "hong kong3",
                         "location": "Hong Kong",
                         "Percentage": "95%",
                         "image": "url/base64"
                     }, ]
                     }
    return response_json


@app.route('/pre-train-list/select-model', methods=['POST'])
# return list of pretrain model
def select_pretrained():
    # select a pretrained model for the project
    project_id = request.args.get('project_id')
    model_id = request.args.get('model_id')

    response_json = {
        "project_id": project_id,
        "model_id": model_id,
    }
    return response_json


@app.route('/upload-input/list', methods=['GET'])
# return a list of uploaded file
def list_uploaded_file():
    project_id = request.args.get('project_id')

    uploaded_files = [
        {'name': 'file1', 'azure': 'is dumb', 'ihate': 'microsoft'}, 
        {'name': 'file2', 'azure': 'is dumb', 'ihate': 'microsoft'},
        {'name': 'file3', 'azure': 'is dumb', 'ihate': 'microsoft'}
        ]
    response_json = {"input_file": []}
    for file in uploaded_files:
        response_json["input_file"].append(file['name'])

    return response_json

@app.route('/upload-input/download', methods=['GET'])
# return a list of uploaded file
def download_sample_file():
    sample_name = request.args.get('sample_name')

    # get the sample file from azure

    return sample_name

@app.route('/upload-input/upload', methods=['POST'])
# return a list of uploaded file
def upload_file():
    project_id = request.args.get('project_id')
    input_type = request.args.get('input_type')

    # after upload return what?

    return ('', 200)

@app.route('/validate-input/layers', methods=['GET'])
# return a list of uploaded file
def get_layers():
    project_id = request.args.get('project_id')
    
    return ('', 200)

@app.route('/post_form', methods=['POST'])
def process_form():
    data = request.form
    print(data['username'])
    print(data['password'])
    return data


if __name__ == '__main__':
    # run app in debug mode on port 5000
    app.run(debug=True, port=5000)
