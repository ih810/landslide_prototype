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


@app.route('/validate-input/layers', methods=['GET'])
# return a list of uploaded file
def get_layers():
    project_id = request.args.get('project_id')
    # query layers from azure 
    layers = {'layers': [
        {
            'layers_name': 'susceptibility_map.tif',
            'layers_url': 'url',
            'ovr_name': 'susceptibility_map.ovr.tif',
            'ovr_url': 'url'
        }
    ]}
    return layers

@app.route('/validate-input/run', methods=['POST'])
# return void
def run_project():
    project_id = request.args.get('project_id')

    # run model

    return project_id

@app.route('/view-performance/info', methods=['GET'])
# return performance metrics
def model_performance_info():
    project_id = request.args.get('project_id')

    # query azure for specific model performance
    model_performance={'model_performance':[
        {
            'accuracy': 'float',
            'metrics': {
                'recall': {
                    'landslide': 'float',
                    'no_landslide': 'float',
                },
                'precision': {
                    'landslide': 'float',
                    'no_landslide': 'float',
                },
                'f1_score': {
                    'landslide': 'float',
                    'no_landslide': 'float',
                },
                'support': {
                    'landslide': 'float',
                    'no_landslide': 'float',
                },
            },
            'confusion_matrix':{
                'true_pos': 'int',
                'false_pos': 'int',
                'true_neg': 'int',
                'false_neg': 'int',
            }
        }
    ]}
    return model_performance

@app.route('/view-performance/layers', methods=['GET'])
# return a list of layer URI
def model_performance_layer():
    project_id = request.args.get('project_id')

    # query layers from azure 
    layers = {'layers': [
        {
            'layers_name': 'susceptibility_map.tif',
            'layers_url': 'url',
            'ovr_name': 'susceptibility_map.ovr.tif',
            'ovr_url': 'url'
        }
    ]}
    return layers

@app.route('/view-performance/download', methods=['GET'])
# return a list of performance file URI
def download_performance_file():
    project_id = request.args.get('project_id')

    # query the file URI from azure
    files = {'files':[
        {
            'file_name': 'str',
            'file_location': 'str',
            'file_sas': 'str',
            'file_acc': 'str'
        }
    ]}

    return files

@app.route('/view-result/layers', methods=['GET'])
# return a list of layer file URI
def list_result_layer():
    project_id = request.args.get('project_id')

    # query layers from azure 
    layers = {'layers': [
        {
            'layers_name': 'susceptibility_map.tif',
            'layers_url': 'url',
            'ovr_name': 'susceptibility_map.ovr.tif',
            'ovr_url': 'url'
        }
    ]}

    return layers

@app.route('/view-result/susceptibility', methods=['GET'])
# return a list of performance file URI
def download_susceptibility_file():
    project_id = request.args.get('project_id')

    # query the file URI from azure
    files = {'files':[
        {
            'file_name': 'str',
            'file_location': 'str',
            'file_sas': 'str',
            'file_acc': 'str'
        }
    ]}

    return files

@app.route('/view-result/csv', methods=['GET'])
# return a list of performance file URI
def download_csv_file():
    project_id = request.args.get('project_id')

    # query the file URI from azure
    files = {'files':[
        {
            'file_name': 'str',
            'file_location': 'str',
            'file_sas': 'str',
            'file_acc': 'str'
        }
    ]}

    return files
@app.route('/post_form', methods=['POST'])
def process_form():
    data = request.form
    print(data['username'])
    print(data['password'])
    return data


if __name__ == '__main__':
    # run app in debug mode on port 5000
    app.run(debug=True, port=5000)
