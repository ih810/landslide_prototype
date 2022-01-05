from flask import request
from flask_classy import FlaskView, route
import re
import json
from Util.azure_file_share import Get_Share_Client

class New_Project_Route(FlaskView):
    # return project info
    @route('/new-project', methods=['POST'])
    def new_project(self):
        body_json = request.get_json()
        project_id = request.args.get('project_name')

        # create directory in azure
        share_client = Get_Share_Client()
        share_client.create_directory()
        # construct response object
        response_json = {
            'project_id': 1,
            'project_name': body_json["project_name"]
        }

        return response_json