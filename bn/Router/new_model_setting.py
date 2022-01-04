from flask import config, request
from flask_classy import FlaskView, route

class New_Model_Config_Route(FlaskView):
    @route('/new-model-config', methods=['POST'])
    # return void
    def user_select_config(self):
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