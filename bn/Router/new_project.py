from datetime import datetime
from flask import request
from flask_classy import FlaskView, route
import re
import json
import Util
from azure.core.exceptions import ResourceExistsError
from azure.data.tables import UpdateMode


class New_Project_Route(FlaskView):
    def __init__(self):
        self.table_client = Util.Get_Table_Client()
        self.share_client = Util.Get_Share_Client()
        self.file_service = Util.Get_File_Service()
    
    # return project info
    @route('/new-project', methods=['POST'])
    def new_project(self):
        project_config = request.get_json()
        try:
            # create directory in azure
            self.file_service.create_directory('data', 'ProjectsData/'+project_config['project_name'])

            # get the lenght of the table for RowKey insertion 
            eTag = self.table_client.get_entity('ID', 'ID')
            eTag['len'] += 1

            # insert new row to azure table
            self.table_client.create_entity({
                    "PartitionKey": 'ownership',
                    "RowKey": str(eTag['len']),
                    "username": project_config['username'],
                    "project_name": project_config['project_name'],
                    "start_date":  datetime.today(),
                    'progress': '0'
                })
        except ResourceExistsError:
            return {'data': 'resource already exist'}
        except Exception as e:
            return {'data': 'backend team fucked up'}
            
        # update the length of the table
        self.table_client.update_entity(entity=eTag, mode=UpdateMode.REPLACE)

        # construct response object
        response_json = {
            'data': project_config['project_name']
        }

        return response_json
