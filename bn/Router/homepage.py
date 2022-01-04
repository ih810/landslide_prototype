import re
import json
from flask import request
from flask_classy import FlaskView, route
from Util.azure_read_txt import Read_Txt
from Util.azure_table_query import Get_Table_Client

class Homepage_Route(FlaskView):
    def __init__(self):
        self.table_client = Get_Table_Client()

    @route('/admin-dashboard', methods=['GET'])
    # return all project available
    def get_all_project(self):
        # Query table
        project_ownership = self.table_client.query_entities("username gt '' and project_name gt ''")
        
        # use arr to store content of items
        response_list = []
        for project in project_ownership:

            # read file to utf-8
            completed_task = Read_Txt(project['project_name'], 'AnalysisDone.txt')

            progress = (len(completed_task)/10) * 100
            
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
            completed_task = Read_Txt(project['project_name'], 'AnalysisDone.txt')
            progress = (len(completed_task)/10) * 100

            # read project_config.txt file to utf-8
            file_config = Read_Txt(project['project_name'], 'project_config.txt')
            for idx, config in enumerate(file_config):
                if 'start_date' in config:
                    temp = file_config[idx]
                    project_start_date = temp.replace('start_date: ', "")

            response_list.append({
                "proj_name": project['project_name'],
                "start_date": project_start_date,
                "progress": progress,
                "status": True
            })

        return json.dumps(response_list)

    @route('/undo-project', methods=['PUT'])
    # return void/all project?
    def undo_project(self):
        project_id = request.args.get('project_name')
        # should do smth
        return project_id

    @route('/delete-project', methods=['DELETE'])
    # return void/all project?
    def delete_project(self):
        project_id = request.args.get('project_name')
        # should do smth
        return project_id
