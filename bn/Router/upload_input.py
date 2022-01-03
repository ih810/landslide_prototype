from flask import request
from flask_classy import FlaskView, route

class Upload_Input(FlaskView):
    @route('/list', methods=['GET'])
    # return a list of uploaded file
    def list_uploaded_file(self):
        project_id = request.args.get('project_id')

        # list files from azure
        uploaded_files = [
            {'name': 'file1', 'azure': 'is dumb', 'ihate': 'microsoft'}, 
            {'name': 'file2', 'azure': 'is dumb', 'ihate': 'microsoft'},
            {'name': 'file3', 'azure': 'is dumb', 'ihate': 'microsoft'}
            ]

        # construct response json
        response_json = {"input_file": []}
        for file in uploaded_files:
            response_json["input_file"].append(file['name'])

        return response_json

    @route('/download', methods=['GET'])
    # return the request file URI
    def download_sample_file(self):
        sample_name = request.args.get('sample_name')

        # get the file URI from azure
        files = {'files':[
            {
                'file_name': 'str',
                'file_location': 'str',
                'file_sas': 'str',
                'file_acc': 'str'
            }
        ]}

        return files

    @route('/upload', methods=['POST'])
    # return a list of uploaded file
    def upload_file(self):
        project_id = request.args.get('project_id')
        input_type = request.args.get('input_type')

        # after upload return what?

        return ('', 200)