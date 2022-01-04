import json
from azure.storage import fileshare
from flask import request
from flask_classy import FlaskView, route
from Util.azure_file_share import Get_Share_Client
from Util.azure_file_share import Get_File_Service
from Util.azure_table_query import Get_Table_Client

class Homepage_Route(FlaskView):
    @route('/admin-dashboard', methods=['GET'])
    # return all project available
    def get_all_project(self):
        # Query table
        table_client = Get_Table_Client()
        project_ownership = table_client.query_entities("username gt '' and project_name gt ''")
        
        # Query files
        fileshare_client = Get_Share_Client()
        file_service = Get_File_Service()
        print(file_service)
        # use map to store content of items
        ownership_map = {}
        for project in project_ownership:
            txt = file_service.get_file_to_bytes(share_name='data', directory_name=project['project_name'], file_name='AnalysisDone.txt')
            print('1111111111111111111111', txt.name)
            print('@@@@@@@@@@@@@@@@@@@@@', txt.content)
            ownership_map[project['project_name']] = {
                'username':project["username"]
                }

        #construc response list
        response_list = []
        for item in ownership_map:
            response_list.append({
                "proj_name": item,
                "owner": ownership_map[item],
                "progress": 100,
                "status": True
            })
        
        return json.dumps(response_list)

    @route('/user-dashboard', methods=['GET'])
    # return all project of the user
    def get_user_project(self):

        user_id = request.args.get('username')

        table_client = Get_Table_Client()
        project_ownership = table_client.query_entities("username eq '"+user_id+"' and project_name gt ''")

        response_list = []
        for project in project_ownership:
            response_list.append({
                "proj_name": project['project_name'],
                "owner": user_id,
                "progress": 100,
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
