import os
import json
import jwt
from os.path import join, dirname
from dotenv import load_dotenv
from azure.core.credentials import AzureNamedKeyCredential
from azure.data.tables import TableServiceClient
from Util.hash import hash_password

# load dotenv
dotenv_path = join(dirname(__file__), '../.env')
load_dotenv(dotenv_path)

# environment var for security credential
ACC_NAME = os.environ.get("ACC_NAME")
ACC_KEY = os.environ.get("ACC_KEY")
CONN_STR = os.environ.get("CONN_STR")
SECRET_SALT = os.environ.get("SECRET_SALT")

# Generate Azure Table Client 
credential = AzureNamedKeyCredential(ACC_NAME, ACC_KEY)
service = TableServiceClient(endpoint="https://"+ACC_NAME+".table.core.windows.net/", credential=credential)
table = service.get_table_client(table_name="landslide")

# Query
def azure_login_query(username, password):
    # hash input for compare
    hashed_pw = hash_password(password)
    entities = table.query_entities("username gt '' and password gt ''")
    for entity in entities:
        if username == entity["username"]:
            if hashed_pw == entity["password"]:
                result = jwt.encode({'username':username}, SECRET_SALT, algorithm="HS256")
                print(result)
                return json.dumps(result.decode('utf-8'))
            else:
                return 'auth failed'
    return 'user does not exist'
