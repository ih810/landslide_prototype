from flask import Flask, request, json
from azure.storage.fileshare import ShareServiceClient, generate_account_sas, ResourceTypes, AccountSasPermissions
from datetime import datetime, timedelta
import os
from os.path import join, dirname
from dotenv import load_dotenv

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
print(sas_token)
service = ShareServiceClient(
    account_url="https://" + ACC_NAME + ".file.core.windows.net/", credential=sas_token)
parentDir = service.from_connection_string(
    conn_str=CONN_STR,
    share_name="home",
    directory_path="/"
)

project_name = 'HongKongLiDAR2011_DEMO'

demo_service = parentDir.get_share_client(
    'data/'+project_name+'/Output/PredictionResults')
demo_list = demo_service.list_directories_and_files()

app = Flask(__name__)


@app.route('/', methods=['POST'])
def getAzureUrl():
    content_type = request.headers.get('Content-Type')
    json = request.get_json()
    return 'Hello, World!'

@app.route('/post_form', methods=['POST'])
def process_form():
    data = request.form
    print(data['username'])
    print(data['password'])    
    return data


if __name__ == '__main__':
    # run app in debug mode on port 5000
    app.run(debug=True, port=5000)