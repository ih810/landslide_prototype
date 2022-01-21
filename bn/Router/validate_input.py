from flask import request
from flask_classy import FlaskView, route
import Util
from  azure.storage.file import models
from datetime import datetime, timedelta

class Validate_Input_Route(FlaskView):
    def __init__(self):
        self.table_client = Util.Get_Table_Client()
        self.share_client = Util.Get_Share_Client()
        self.file_service = Util.Get_File_Service()

    @route('/layers', methods=['GET'])
    # return a list of uploaded file
    def get_layers(self):
        project_id = request.args.get('project_id')
        reponse_list = []
        # query layers from azure 
        permission = models.FilePermissions(read=True)
        elevation_dir = list(self.file_service.list_directories_and_files('data', directory_name='ProjectsData/'+project_id+'/Elevation'))
        for file in elevation_dir:
            if '.ovr' in file.name:
                print(file.name)  
            else:
                layers_signautre = self.file_service.generate_file_shared_access_signature(
                    'data', 
                    directory_name='ProjectsData/'+project_id+'/Elevation',
                    file_name=file.name, 
                    permission=permission,
                    expiry=datetime.now() + timedelta(minutes=1),
                )
                ovr_signautre = self.file_service.generate_file_shared_access_signature(
                    'data', 
                    directory_name=project_id+'/Output/PredictionResults', 
                    file_name=file.name+'.ovr', 
                    permission=permission,
                    expiry=datetime.now() + timedelta(minutes=1),
                )
                reponse_list.append({
                    'layer_url':'https://aiat3landslidestg.file.core.windows.net/data/ProjectsData/'+project_id+'/Elevation/'+file.name+'?'+layers_signautre,
                    'ovr_url':'https://aiat3landslidestg.file.core.windows.net/data/ProjectsData/'+project_id+'/Elevation/'+file.name+'.ovr?'+ovr_signautre,
                    })

        layers = {'layers': [
            reponse_list
        ]}
        return layers

    @route('/run', methods=['POST'])
    # return void
    def run_project(self):
        project_id = request.args.get('project_id')

        # run model

        return project_id