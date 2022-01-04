import re
import json
from flask import request
from flask_classy import FlaskView, route
from Util.azure_file_share import Get_File_Service
from Util.azure_table_query import Get_Table_Client

class Homepage_Route(FlaskView):
    def __init__(self):
        self.table_client = Get_Table_Client()
        self.file_service = Get_File_Service()

    @route('/admin-dashboard', methods=['GET'])
    # return all project available
    def get_all_project(self):
        # Query table
        project_ownership = self.table_client.query_entities("username gt '' and project_name gt ''")
        
        # use arr to store content of items
        response_list = []
        for project in project_ownership:

            # read file to utf-8
            complete_text = self.file_service.get_file_to_text(share_name='data', directory_name=project['project_name'], file_name='AnalysisDone.txt').content
            complete_list = re.split('\n|\r', complete_text)
            filtered_list = list(filter(None, complete_list))

            progress = (len(filtered_list)/10) * 100
            
            # construct response array
            response_list.append({
                "proj_name": project['project_name'],
                "owner": project["username"],
                "progress": progress,
                "status": True
                })
        
        return json.dumps(response_list)

    @route('/user-dashboard', methods=['GET'])
    # return all project of the user
    def get_user_project(self):

        user_id = request.args.get('username')

        # Query table
        project_ownership = self.table_client.query_entities("username eq '"+user_id+"' and project_name gt ''")

        response_list = []
        for project in project_ownership:

            # read file to utf-8
            complete_text = self.file_service.get_file_to_text(share_name='data', directory_name=project['project_name'], file_name='AnalysisDone.txt').content
            complete_list = re.split('\n|\r', complete_text)
            filtered_list = list(filter(None, complete_list))
            progress = (len(filtered_list)/10) * 100
            response_list.append({
                "proj_name": project['project_name'],
                "owner": user_id,
                "progress": progress,
                "status": True
            })
        return json.dumps(response_list)

    @route('/undo-project', methods=['PUT'])
    # return void/all project?
    def undo_project(self):
        project_id = request.args.get('project_id')
        return project_id

    @route('/delete-project', methods=['DELETE'])
    # return void/all project?
    def delete_project(self):
        project_id = request.args.get('project_id')
        return project_id
