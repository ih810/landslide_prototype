from datetime import datetime
from flask import request
from flask_classy import FlaskView, route
import re
import json
from Util.azure_file_share import Get_Share_Client
from Util.azure_table_query import Get_Table_Client
from azure.core.exceptions import ResourceExistsError
from azure.data.tables import UpdateMode


class New_Project_Route(FlaskView):
    def __init__(self):
        self.table_client = Get_Table_Client()
        self.share_client = Get_Share_Client()

    # return project info
    @route('/new-project', methods=['POST'])
    def new_project(self):
        project_config = request.get_json()
        project_id = request.args.get('project_name')

        # create directory in azure
        try:
            self.share_client.create_directory(project_id)
        except ResourceExistsError:
            return {'data': 'resource already exist'}
        except:
            return {'data': 'something went wrong'}

        # get the lenght of the table 
        eTag = self.table_client.get_entity('ID', 'ID')
        eTag['len'] += 1

        # insert new row to azure table
        try:
            self.table_client.create_entity({
                    "PartitionKey": 'ownership',
                    "RowKey": str(eTag['len']),
                    "username": project_config['username'],
                    "project_name": project_id,
                })
        except:
            return {'data': 'something went wrong'}

        # update the length of the table
        self.table_client.update_entity(entity=eTag, mode=UpdateMode.REPLACE)

        # construct response object
        response_json = {
            'project_name': project_id
        }

        return response_json
