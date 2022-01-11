from os import remove
from flask import config, request
from flask_classy import FlaskView, route
from Util.azure_file_share import Get_File_Service
import json

class New_Model_Config_Route(FlaskView):
    def __init__(self):
        self.file_service = Get_File_Service()

    @route('/new-model-config', methods=['POST'])
    # return void
    def user_select_config(self):
        # get needed data
        project_name = request.args.get('project_name')
        body_json = request.get_json()

        try:
            self.file_service.create_file_from_text('data', project_name, 'project_config.txt', json.dumps(body_json), encoding='utf-8')
        except Exception as e:
            print(e)
            return ({'data': 'backend team fucked up'})
        return ({'data':'ok'})