from flask import request
from flask_classy import FlaskView, route

class Pretrain_List_Route(FlaskView):
    @route('/model-info', methods=['GET'])
    # return list of pretrain model
    def list_pretrained(self):
        # list dir from azure
        response_json = {'model_info':
                        [{
                            "model_name": "hong kong1",
                            "location": "Hong Kong",
                            "Percentage": "93%",
                            "image": "url/base64"
                        }, {
                            "model_name": "hong kong2",
                            "location": "Hong Kong",
                            "Percentage": "94%",
                            "image": "url/base64"
                        }, {
                            "model_name": "hong kong3",
                            "location": "Hong Kong",
                            "Percentage": "95%",
                            "image": "url/base64"
                        }, ]
                        }
        return response_json


    @route('/select-model', methods=['POST'])
    # return list of pretrain model
    def select_pretrained(self):
        # select a pretrained model for the project
        project_id = request.args.get('project_id')
        model_id = request.args.get('model_id')

        response_json = {
            "project_id": project_id,
            "model_id": model_id,
        }
        return response_json
