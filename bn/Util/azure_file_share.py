import os
from dotenv import load_dotenv
from os.path import join, dirname
from datetime import datetime, timedelta
from azure.storage.fileshare import ShareServiceClient, generate_account_sas, ResourceTypes, AccountSasPermissions, generate_file_sas, FileSasPermissions
from azure.storage.file.fileservice import FileService

# load dotenv
dotenv_path = join(dirname(__file__), '../.env')
load_dotenv(dotenv_path)

ACC_NAME = os.environ.get("ACC_NAME")
ACC_KEY = os.environ.get("ACC_KEY")

def Get_Account_Client():
    # Generate Azure Table Client 
    service_client = ShareServiceClient(account_url="https://"+ACC_NAME+".file.core.windows.net/", credential=ACC_KEY)
    return service_client

def Get_Share_Client():
    acc_client = Get_Account_Client()
    share_client = acc_client.get_share_client('data')
    return share_client

acc_sas_token = generate_account_sas(
    account_name=ACC_NAME,
    account_key=ACC_KEY,
    resource_types=ResourceTypes(service=True),
    permission=AccountSasPermissions(read=True),
    expiry=datetime.utcnow() + timedelta(hours=1)
)

def Get_File_Service():
    file_service = FileService(account_name=ACC_NAME, account_key=ACC_KEY, sas_token=acc_sas_token, protocol='https')
    return file_service