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


app = Flask(__name__)

@app.route('/login', methods=['POST'])
def login():
    login_data = request.form
    print(login_data['username'])
    print(login_data['password'])
    return login_data

@app.route('/homepage/admin-dashboard', methods=['GET'])
def get_all_project():
    data_list = []
    azure_list = List('data/')
    for item in azure_list:
        data_list.append(item.name)
    
    return jsonify(data_list) 

@app.route('/homepage/user-dashboard', methods=['GET'])
def get_user_project():
    data_list = []
    azure_list = List('data/')
    for item in azure_list:
        data_list.append(item.name)
    
    return jsonify(data_list)
        
@app.route('/getAzureTif', methods=['POST'])
def get_azure_tif():
    data = []
    azure_data = List('data/')
    return 'lmao'
    
@app.route('/post_form', methods=['POST'])
def process_form():
    data = request.form
    print(data['username'])
    print(data['password'])
    return data


if __name__ == '__main__':
    # run app in debug mode on port 5000
    app.run(debug=True, port=5000)
