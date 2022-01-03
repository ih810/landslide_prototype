import requests
import os
from os.path import join, dirname
from dotenv import load_dotenv
from azure.core.credentials import AzureNamedKeyCredential
from azure.data.tables import TableServiceClient

# load dotenv
dotenv_path = join(dirname(__file__), '../.env')
load_dotenv(dotenv_path)

# environment var for security credential
ACC_NAME = os.environ.get("ACC_NAME")
ACC_KEY = os.environ.get("ACC_KEY")
CONN_STR = os.environ.get("CONN_STR")
credential = AzureNamedKeyCredential(ACC_NAME, ACC_KEY)
service = TableServiceClient(endpoint="https://"+ACC_NAME+".table.core.windows.net/", credential=credential)

table = service.get_table_client(table_name="landslide")
entities = table.query_entities("username gt '' and password gt ''")
for entity in entities:
    print(entity)