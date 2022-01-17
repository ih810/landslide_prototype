import Util
from flask import request
from flask_classy import FlaskView, route
from  azure.storage.file import models
from datetime import datetime, timedelta

class View_Results_Route(FlaskView):
    
    def __init__(self):
        self.file_client = Util.Get_File_Service()
        
    @route('/layers', methods=['GET'])
    # return a list of layer file URI
    def list_result_layer(self):
        project_id = request.args.get('project_id')
        # set permission for SAS read 
        permission = models.FilePermissions(read=True)
        layers_signautre = self.file_client.generate_file_shared_access_signature(
            'data', 
            directory_name=project_id+'/Output/PredictionResults', 
            file_name='susceptibility_map_color.tif', 
            permission=permission,
            expiry=datetime.now() + timedelta(minutes=1),
        )
        ovr_signautre = self.file_client.generate_file_shared_access_signature(
            'data', 
            directory_name=project_id+'/Output/PredictionResults', 
            file_name='susceptibility_map_color.tif.ovr', 
            permission=permission,
            expiry=datetime.now() + timedelta(minutes=1),
        )

        # query layers from azure
        layers = {'layers': 
            {
                'layers_name': 'susceptibility_map.tif',
                'layers_url': 'https://aiat3landslidestg.file.core.windows.net/data/'+project_id+'/Output/PredictionResults/susceptibility_map_color.tif?'+layers_signautre,
                'ovr_name': 'susceptibility_map.ovr.tif',
                'ovr_url': 'https://aiat3landslidestg.file.core.windows.net/data/'+project_id+'/Output/PredictionResults/susceptibility_map_color.tif?'+ovr_signautre,
            }
        }
        return layers

    @route('/susceptibility', methods=['GET'])
    # return a list of performance file URI
    def download_susceptibility_file(self):
        project_id = request.args.get('project_id')

        # query the file URI from azure
        files = {'files':[
            {
                'file_name': 'str',
                'file_location': 'str',
                'file_sas': 'str',
                'file_acc': 'str'
            }
        ]}

        return files

    @route('/csv', methods=['GET'])
    # return a list of performance file URI
    def download_csv_file(self):
        project_id = request.args.get('project_id')

        # query the file URI from azure
        files = {'files':[
            {
                'file_name': 'str',
                'file_location': 'str',
                'file_sas': 'str',
                'file_acc': 'str'
            }
        ]}

        return files