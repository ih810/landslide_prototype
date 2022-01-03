from flask import request
from flask_classy import FlaskView, route

class View_Performance(FlaskView):
    @route('/info', methods=['GET'])
    # return performance metrics
    def model_performance_info(self):
        project_id = request.args.get('project_id')

        # query azure for specific model performance
        model_performance={'model_performance':[
            {
                'accuracy': 'float',
                'metrics': {
                    'recall': {
                        'landslide': 'float',
                        'no_landslide': 'float',
                    },
                    'precision': {
                        'landslide': 'float',
                        'no_landslide': 'float',
                    },
                    'f1_score': {
                        'landslide': 'float',
                        'no_landslide': 'float',
                    },
                    'support': {
                        'landslide': 'float',
                        'no_landslide': 'float',
                    },
                },
                'confusion_matrix':{
                    'true_pos': 'int',
                    'false_pos': 'int',
                    'true_neg': 'int',
                    'false_neg': 'int',
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
        files = {'files':[
            {
                'file_name': 'str',
                'file_location': 'str',
                'file_sas': 'str',
                'file_acc': 'str'
            }
        ]}

        return files
