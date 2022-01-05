from flask import request
from flask_classy import FlaskView, route
import re
import json
from Util.azure_file_share import Get_Share_Client
from azure.core.exceptions import ResourceExistsError


class New_Project_Route(FlaskView):
    # return project info
    @route('/new-project', methods=['POST'])
    def new_project(self):
        project_id = request.args.get('project_name')

        # create directory in azure
        share_client = Get_Share_Client()
        try:
            share_client.create_directory(project_id)
        except ResourceExistsError:
            return {'data': 'resource already exist'}

        # construct response object
        response_json = {
            'project_name': project_id
        }

        return response_json
