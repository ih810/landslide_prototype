from flask import request
from flask_classy import FlaskView, route

class New_Model_Config(FlaskView):
    @route('/new-model-config', methods=['POST'])
    # return void
    def new_model_config(self):
        # get needed data
        project_name = request.args.get('project_name')
        body_json = request.get_json()

        # construct response object
        response_json = {
            'project_name': project_name,
            'project_width': body_json["width"],
            'project_height': body_json["height"],
        }

        return ('', 200)