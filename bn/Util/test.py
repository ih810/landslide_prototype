import datetime
import os
import json
from os.path import join, dirname
from dotenv import load_dotenv
from datetime import timedelta
from azure.storage.file.models import FilePermissions
from azure.storage.fileshare import ShareServiceClient, generate_account_sas, ResourceTypes, AccountSasPermissions, generate_file_sas,FileSasPermissions

dotenv_path = join(dirname(__file__), '../.env')
load_dotenv(dotenv_path)

ACC_NAME = os.environ.get("ACC_NAME")
ACC_KEY = os.environ.get("ACC_KEY")
CONN_STR = os.environ.get("CONN_STR")

lmao = str(datetime.date.today() + datetime.timedelta(days=1))
lmao2 = datetime.datetime.now()

print(lmao)
print(lmao2)
print(ACC_NAME)

from azure_file_share import Get_File_Service

lmao = Get_File_Service()
read = FilePermissions(read=True, write=True)
perm = lmao.generate_file_shared_access_signature(
    'data', 
    directory_name='HongKongLiDAR2011_DEMO/Output/Visualizations', 
    file_name='TrainProgress.png', 
    permission=read,
    expiry=datetime.datetime.now() + timedelta(minutes=1),
    )
print(perm)

# t = {"sampleHeight": 2000000, "sampleWidth": 2000000, "negativeSampleRatio": 80, "lowContrastNegativeRatio": 20, "trainingSampleRatio": 80, "validateSampleRatio": 10, "testSampleRatio": 10, "convolutionalLayers": "", "denseLayers": "", "convolutionalKernelSize": "", "maxPoolingLayerSize": "", "dropOutRate": ""}
# txt = json.dumps(t)
# print(txt)
# print(type(txt))
# parsed = json.loads(txt)
# print('parsed: ', parsed)
# print('parsed: ', type(parsed))
