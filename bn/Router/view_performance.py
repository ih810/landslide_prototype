import Util
from flask import request
from flask_classy import FlaskView, route


class View_Performance_Route(FlaskView):

    def __init__(self):
        self.file_client = Util.Get_File_Service()

    @route('/info', methods=['GET'])
    # return performance metrics
    def model_performance_info(self):
        project_id = request.args.get('project_id')

        # read from azure
        accuracy_txt = Util.Read_Txt(
            project_id+'/Output/Visualizations', 'Accuracy.txt')

        confusion_matrix = Util.Read_csv(
            project_id+'/Output/Visualizations', 'ConfusionMatrix.csv')

        metrics = Util.Read_csv(
            project_id+'/Output/Visualizations', 'PrecisionRecallFscore.csv')

        # query azure for specific model performance
        model_performance = {'model_performance': [
            {
                'accuracy': accuracy_txt[0],
                'metrics': {
                    'recall': {
                        'landslide': metrics[1]['Landslide'],
                        'no_landslide': metrics[1]['NotLandslide'],
                    },
                    'precision': {
                        'landslide': metrics[0]['Landslide'],
                        'no_landslide': metrics[0]['NotLandslide'],
                    },
                    'f1_score': {
                        'landslide': metrics[2]['Landslide'],
                        'no_landslide': metrics[2]['NotLandslide'],
                    },
                    'support': {
                        'landslide': metrics[3]['Landslide'],
                        'no_landslide': metrics[3]['NotLandslide'],
                    },
                },
                'confusion_matrix':{
                    'true_neg': confusion_matrix[0]['NotLandslide_pred'],
                    'true_pos': confusion_matrix[1]['Landslide_pred'],
                    'false_neg': confusion_matrix[1]['NotLandslide_pred'],
                    'false_pos': confusion_matrix[0]['Landslide_pred'],
                }
            }
        ]}
        return model_performance

    @route('/layers', methods=['GET'])
    # return a list of layer URI
    def model_performance_layer(self):
        project_id = request.args.get('project_id')

        # query layers from azure
        layers = {'layers': [
            {
                'layers_name': 'susceptibility_map.tif',
                'layers_url': 'url',
                'ovr_name': 'susceptibility_map.ovr.tif',
                'ovr_url': 'url'
            }
        ]}
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
