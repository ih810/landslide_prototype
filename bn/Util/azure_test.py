from azure.storage.fileshare import ShareServiceClient, generate_account_sas, ResourceTypes, AccountSasPermissions, generate_file_sas,FileSasPermissions
from datetime import datetime, timedelta

import os
from os.path import join, dirname
from dotenv import load_dotenv

def List(path):
    dotenv_path = join(dirname(__file__), '../.env')
    load_dotenv(dotenv_path)

    ACC_NAME = os.environ.get("ACC_NAME")
    ACC_KEY = os.environ.get("ACC_KEY")
    CONN_STR = os.environ.get("CONN_STR")

    # sas_token = generate_account_sas(
    #     account_name=ACC_NAME,
    #     account_key=ACC_KEY,
    #     resource_types=ResourceTypes(service=True),
    #     permission=AccountSasPermissions(read=True),
    #     expiry=datetime.utcnow() + timedelta(minutes=1)
    # )
    # service = ShareServiceClient(
    #     account_url="https://" + ACC_NAME + ".file.core.windows.net/", credential=sas_token)
    # parentDir = service.from_connection_string(
    #     conn_str=CONN_STR,
    #     share_name="data",
    #     directory_path="/"
    # )
    # print(sas_token)
    # demo_service = parentDir.get_share_client(
    #     path)
    # demo_list = demo_service.list_directories_and_files()
    # for item in demo_list:
    #     print(item)

    file_sas_token = generate_file_sas(
        account_name=ACC_NAME,
        account_key=ACC_KEY,
        share_name= 'data',
        file_path='HongKongLiDAR2011_DEMO/Output/Visualizations/TrainProgress.png',
        permission= FileSasPermissions(read = True),
        expiry=datetime.utcnow() + timedelta(minutes=1),
        content_type='image/png'
    )
    print(file_sas_token)
    project_name = 'HongKongLiDAR2011_DEMO'
    
    'https://${account}.file.core.windows.net/file/data/HongKongLiDAR2011_DEMO/Output/Visualizations/TrainProgress.png'
    url = 'https://'+ACC_NAME+".file.core.windows.net/data/HongKongLiDAR2011_DEMO/Output/Visualizations/TrainProgress.png?"+file_sas_token
    
    return url

List('/')