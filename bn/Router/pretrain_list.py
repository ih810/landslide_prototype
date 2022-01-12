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
            # for each folder, read the accuracy of the model
            model_accuracy = Util.Read_Txt('PretrainedModels/Models/'+model_folder.name, 'Accuracy.txt')

            response_json["data"].append({
                'model_name': model_folder.name,
                'percentage': model_accuracy[0]
            })

        return response_json


    @route('/select-model', methods=['POST'])
    # return list of pretrain model
    def select_pretrained(self):
        # select a pretrained model for the project
        project_id = request.args.get('project_id')
        model_id = request.args.get('model_id')

        # select model for project

        response_json = {
            "project_id": project_id,
            "model_id": model_id,
        }
        return response_json
