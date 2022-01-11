from flask import request
from flask_classy import FlaskView, route
import Util

class Pretrain_List_Route(FlaskView):
    def __init__(self):
        self.file_client = Util.Get_File_Service()
    
    @route('/model-info', methods=['GET'])
    # return list of pretrain model
    def list_pretrained(self):
        response_json = {"data": []}
        # list dir from azure
        model_names = list(self.file_client.list_directories_and_files('data', directory_name='PretrainedModels/Models'))
        for model_folder in model_names:
            print(model_folder.name)
            response_json["data"].append({
                'model_name': model_folder.name,
                'Percentage': '100'
            })

        return response_json


    @route('/select-model', methods=['POST'])
    # return list of pretrain model
    def select_pretrained(self):
        # select a pretrained model for the project
        project_id = request.args.get('project_id')
        model_id = request.args.get('model_id')

        response_json = {
            "project_id": project_id,
            "model_id": model_id,
        }
        return response_json
