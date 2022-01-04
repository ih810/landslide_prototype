import json
from flask import request
from flask_classy import FlaskView, route
from Util.azure_file_share import Get_Share_Client
from Util.azure_table_query import Get_Table_Client
#test
class Homepage_Route(FlaskView):

    @route('/admin-dashboard', methods=['GET'])
    # return all project available
    def get_all_project(self):
        user_id = request.args.get('user_id')
        
        share_client = Get_Share_Client()
        dir_list = share_client.list_directories_and_files()
        
        table_client = Get_Table_Client()
        project_access = table_client.query_entities("username gt '' and project_name gt ''")
        for entry in project_access:
            print(entry)
        
        response_list = []
        for item in dir_list:
            response_list.append({
                "proj_name":item['name'],
                "owner": user_id,
                "progress": 100,
                "status": True
            })
        
        return json.dumps(response_list)

    @route('/user-dashboard', methods=['GET'])
    # return all project of the user
    def get_user_project(self):
        user_id = request.args.get('user_id')
        return user_id

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
