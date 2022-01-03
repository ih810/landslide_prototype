from flask import Flask, request, json, jsonify
from azure.storage.fileshare import ShareServiceClient, generate_account_sas, ResourceTypes, AccountSasPermissions
from datetime import datetime, timedelta
import os
from os.path import join, dirname
from dotenv import load_dotenv
from flask_classy import FlaskView, route

#test
class Homepage(FlaskView):
    def index(self):
        print('ok')

    @route('/homepage/admin-dashboard', methods=['GET'])
    # return all project available
    def get_all_project(self):
        user_id = request.args.get('user_id')
        return user_id

    @route('/homepage/user-dashboard', methods=['GET'])
    # return all project of the user
    def get_user_project(self):
        user_id = request.args.get('user_id')
        return user_id

    @route('/homepage/undo-project', methods=['PUT'])
    # return void/all project?
    def undo_project(self):
        project_id = request.args.get('project_id')
        return project_id

    @route('/homepage/delete-project', methods=['DELETE'])
    # return void/all project?
    def delete_project(self):
        project_id = request.args.get('project_id')
        return project_id