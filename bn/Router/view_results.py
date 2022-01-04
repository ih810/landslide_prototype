from flask import request
from flask_classy import FlaskView, route

class View_Results_Route(FlaskView):
    @route('/layers', methods=['GET'])
    # return a list of layer file URI
    def list_result_layer(self):
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