import re
import json
from flask import request
from flask_classy import FlaskView, route
import Util
from azure.core.exceptions import ResourceNotFoundError

class Homepage_Route(FlaskView):
    def __init__(self):
        self.table_client = Util.Get_Table_Client()
        self.share_client = Util.Get_Share_Client()
        self.file_client = Util.Get_File_Service()

    @route('/admin-dashboard', methods=['GET'])
    # return all project available
    def get_all_project(self):
        # Query table
        project_ownership = self.table_client.query_entities(
            "username gt '' and project_name gt ''")

        # use arr to store content of items
        response_list = []
        for project in project_ownership:
            response_list.append({
                "proj_name": project['project_name'],
                "owner": project["username"],
                "progress": project["progress"],
                "status": True
            })

        return json.dumps(response_list)

    @route('/user-dashboard', methods=['GET'])
    # return all project of the user
    def get_user_project(self):

        user_id = request.args.get('username')

        # Query table
        project_ownership = self.table_client.query_entities(
            "username eq '"+user_id+"' and project_name gt ''")

        response_list = []
        for project in project_ownership:

            stringify_start_date = str(project['start_date'])[0:10]

            response_list.append({
                "proj_name": project['project_name'],
                "start_date": stringify_start_date,
                "progress": project['progress'],
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

        # remove directory from azure
        print('project_name eq '+project_id)
        target_entity = self.table_client.query_entities("project_name eq '"+project_id+"'")
        
        # get Primary key from entity
        for item in target_entity:
            target_row_key = item["RowKey"]
        
        # list all folder/files in dir
        directory_content = self.file_client.list_directories_and_files('data', directory_name='/ProjectsData/'+project_id)
        
        try:
            # custom recusive delete function
            Util.recursive_delete(directory_content, [project_id])
            # remove column from azure table
            self.table_client.delete_entity(row_key=target_row_key, partition_key='ownership', entity=target_entity)
        except ResourceNotFoundError:
            return {'data': 'resource does not exist'}
        except Exception as e:
            print(e)
            return {"data": "backend team fucked up"}

        return {"data":"delete ok"}
