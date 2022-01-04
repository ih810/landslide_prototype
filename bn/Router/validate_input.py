from flask import request
from flask_classy import FlaskView, route

class Validate_Input_Route(FlaskView):
    @route('/layers', methods=['GET'])
    # return a list of uploaded file
    def get_layers(self):
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

    @route('/run', methods=['POST'])
    # return void
    def run_project(self):
        project_id = request.args.get('project_id')

        # run model

        return project_id