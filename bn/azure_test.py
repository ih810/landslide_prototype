from azure.storage.fileshare import ShareServiceClient, generate_account_sas, ResourceTypes, AccountSasPermissions
from datetime import datetime, timedelta
import os
from os.path import join, dirname
from dotenv import load_dotenv
def List(path):
    dotenv_path = join(dirname(__file__), '.env')
    load_dotenv(dotenv_path)

    ACC_NAME = os.environ.get("ACC_NAME")
    ACC_KEY = os.environ.get("ACC_KEY")
    CONN_STR = os.environ.get("CONN_STR")

    sas_token = generate_account_sas(
        account_name=ACC_NAME,
        account_key=ACC_KEY,
        resource_types=ResourceTypes(service=True),
        permission=AccountSasPermissions(read=True),
        expiry=datetime.utcnow() + timedelta(hours=1)
    )
    service = ShareServiceClient(
        account_url="https://" + ACC_NAME + ".file.core.windows.net/", credential=sas_token)
    parentDir = service.from_connection_string(
        conn_str=CONN_STR,
        share_name="data",
        directory_path="/"
    )

    project_name = 'HongKongLiDAR2011_DEMO'

    demo_service = parentDir.get_share_client(
        path)
    demo_list = demo_service.list_directories_and_files()
    for item in demo_list:
        return demo_list
    # for item in demo_list:
    #     print(item)
