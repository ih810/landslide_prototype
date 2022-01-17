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
        filtered_confusion_matrix = filter(lambda column: column[""]!='', confusion_matrix)

        metrics = Util.Read_csv(
            project_id+'/Output/Visualizations', 'PrecisionRecallFscore.csv')
        filtered_metrics = filter(lambda column: column[""]!='', metrics)

        # query azure for specific model performance
        model_performance = {'model_performance': [
            {
                'accuracy': accuracy_txt[0],
                'metrics': list(filtered_metrics),
                'confusion_matrix': list(filtered_confusion_matrix)
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
