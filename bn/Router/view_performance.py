import Util
from flask import request
from flask_classy import FlaskView, route
from  azure.storage.file import models
from datetime import datetime, timedelta
class View_Performance_Route(FlaskView):

    def __init__(self):
        self.file_service = Util.Get_File_Service()

    @route('/info', methods=['GET'])
    # return performance metrics
    def model_performance_info(self):
        project_id = request.args.get('project_id')

        # read files from azure
        accuracy_txt = Util.Read_Txt(
            project_id+'/Output/Visualizations', 'Accuracy.txt')

        confusion_matrix = Util.Read_csv(
            project_id+'/Output/Visualizations', 'ConfusionMatrix.csv')
        #format data
        filtered_confusion_matrix = filter(lambda column: column[""]!='', confusion_matrix)

        metrics = Util.Read_csv(
            project_id+'/Output/Visualizations', 'PrecisionRecallFscore.csv')
        #format data
        filtered_metrics = filter(lambda column: column[""]!='', metrics)
        
        # set permission for SAS read 
        permission = models.FilePermissions(read=True)
        train_progress_signature = self.file_service.generate_file_shared_access_signature(
            'data', 
            directory_name=project_id+'/Output/Visualizations', 
            file_name='TrainProgress.png', 
            permission=permission,
            expiry=datetime.now() + timedelta(minutes=1),
        )

        # query azure for specific model performance
        model_performance = {'model_performance': 
            {
                'accuracy': accuracy_txt[0],
                'metrics': list(filtered_metrics),
                'confusion_matrix': list(filtered_confusion_matrix),
                'train_progress': 'https://aiat3landslidestg.file.core.windows.net/data/'+project_id+'/Output/Visualizations/TrainProgress.png?'+train_progress_signature
            }
        }
        return model_performance

    @route('/layers', methods=['GET'])
    # return a list of layer URI
    def model_performance_layer(self):
        project_id = request.args.get('project_id')
        # set permission for SAS read 
        permission = models.FilePermissions(read=True)
        layers_signautre = self.file_service.generate_file_shared_access_signature(
            'data', 
            directory_name=project_id+'/Output/PredictionResults', 
            file_name='susceptibility_map_color.tif', 
            permission=permission,
            expiry=datetime.now() + timedelta(minutes=1),
        )
        ovr_signautre = self.file_service.generate_file_shared_access_signature(
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

    @route('/download', methods=['GET'])
    # return a list of performance file URI
    def download_performance_file(self):
        project_id = request.args.get('project_id')

        # query the file URI from azure
        files = {'files': [
            {
                'file_name': 'str',
                'file_location': 'str',
                'file_sas': 'str',
                'file_acc': 'str'
            }
        ]}

        return files
