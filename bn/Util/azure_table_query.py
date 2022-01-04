import os
from dotenv import load_dotenv
from os.path import join, dirname
from azure.data.tables import TableServiceClient
from azure.core.credentials import AzureNamedKeyCredential

# load dotenv
dotenv_path = join(dirname(__file__), '../.env')
load_dotenv(dotenv_path)

# environment var for security credential
ACC_NAME = os.environ.get("ACC_NAME")
ACC_KEY = os.environ.get("ACC_KEY")

def Get_Table_Client():
    # Generate Azure Table Client 
    credential = AzureNamedKeyCredential(ACC_NAME, ACC_KEY)
    service = TableServiceClient(endpoint="https://"+ACC_NAME+".table.core.windows.net/", credential=credential)
    table = service.get_table_client(table_name="landslide")
    return table