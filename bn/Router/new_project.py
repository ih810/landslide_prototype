from flask import request
from flask_classy import FlaskView, route

class New_Project_Route(FlaskView):
    # return project info
    @route('/new-project', methods=['POST'])
    def new_project(self):
        body_json = request.get_json()

        # construct response object
        response_json = {
            'project_id': 1,
            'project_name': body_json["project_name"]
        }

        return response_json