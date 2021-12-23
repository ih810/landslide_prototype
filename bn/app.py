from flask import Flask, request, json, jsonify
from azure.storage.fileshare import ShareServiceClient, generate_account_sas, ResourceTypes, AccountSasPermissions
from datetime import datetime, timedelta
import os
from os.path import join, dirname
from dotenv import load_dotenv
from azure_test import List 


dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

ACC_NAME = os.environ.get("ACC_NAME")
ACC_KEY = os.environ.get("ACC_KEY")
CONN_STR = os.environ.get("CONN_STR")


app = Flask(__name__)


@app.route('/homepahe/user-dashboard', methods=['GET'])
def get_all_project():
    json_data_list = []
    data_list = List('data/')
    for item in data_list:
        json_data_list.append(item.name)
    
    return jsonify(json_data_list) 


@app.route('/post_form', methods=['POST'])
def process_form():
    data = request.form
    print(data['username'])
    print(data['password'])
    return data


if __name__ == '__main__':
    # run app in debug mode on port 5000
    app.run(debug=True, port=5000)
