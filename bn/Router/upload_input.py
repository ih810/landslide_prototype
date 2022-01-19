from email.mime import image
from flask import request
from flask_classy import FlaskView, route
import Util
import json

class Upload_Input_Route(FlaskView):
    def __init__(self):
        self.file_service = Util.Get_File_Service()

    @route('/list', methods=['GET'])
    # return a list of uploaded file
    def list_uploaded_file(self):
        project_id = request.args.get('project_id')

        # list files from azure
        elevation_uploaded_files = self.file_service.list_directories_and_files('data', directory_name='ProjectsData/'+project_id+'/Elevation')
        training_data_uploaded_files = self.file_service.list_directories_and_files('data', directory_name='ProjectsData/'+project_id+'/Landslide')
        optional_uploaded_files = self.file_service.list_directories_and_files('data', directory_name='ProjectsData/'+project_id+'/UrbanAreaSHP')

        # construct response json
        response_json = {
            "elevation": [],
            "shp": [],
            "traning": []
        }

        for file in elevation_uploaded_files:
            response_json['elevation'].append(file.name)
        for file in training_data_uploaded_files:
            response_json['traning'].append(file.name)
        for file in optional_uploaded_files:
            response_json['shp'].append(file.name)
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
        file_name = request.args.get('file_name')
        
        # set input type base on input id
        if input_type == 'model':
            target_folder = '/Elevation'
        elif input_type == 'optional':
            target_folder = '/UrbanAreaSHP'
        elif input_type == 'training':
            target_folder = '/Landslide'
        else:
            return {'error': 'cannot recognize file type'}

        try:
            self.file_service.create_file_from_bytes('data', 'ProjectsData/'+project_id+target_folder, file_name, request.data)
        except Exception as e:
            print(e)
        # # after upload return what?

        return json.dumps({'data': project_id+input_type+file_name})

    @route('/file', methods=['POST'])
    def upload_files(self):
        file = request.files['file']
        print(file)
        return "fuck"