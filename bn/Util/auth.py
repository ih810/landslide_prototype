import os
import jwt
import json
import datetime
from dotenv import load_dotenv
from os.path import join, dirname
from Util.hash import hash_password
from Util.azure_table_query import Get_Table_Client

# load dotenv
dotenv_path = join(dirname(__file__), '../.env')
load_dotenv(dotenv_path)

# environment var for security credential
SECRET_SALT = os.environ.get("SECRET_SALT")

# Query Table Storage
def azure_login_query(username, password, admin):
        
    # hash input for compare
    hashed_pw = hash_password(password)
    table = Get_Table_Client()
    print(hashed_pw)
    print(table)
    # Azure filter string https://docs.microsoft.com/en-us/visualstudio/azure/vs-azure-tools-table-designer-construct-filter-strings?view=vs-2022
    if admin:
        entities = table.query_entities("username gt '' and password gt '' and PartitionKey eq 'admininfo'")
    else:
        entities = table.query_entities("username gt '' and password gt '' and PartitionKey eq 'userinfo'")
    print(entities)
    for entity in entities:
        if username == entity["username"]:
            if hashed_pw == entity["password"]:
                expiray_date = datetime.date.today() + datetime.timedelta(days=1)
                str_expiry_date = expiray_date.strftime("%d-%b-%Y (%H:%M:%S.%f)")
                result = jwt.encode({ 'username':username, "exp": str_expiry_date }, SECRET_SALT, algorithm="HS256")
                return json.dumps(result.decode('utf-8'))
            else:
                return 'auth failed'
    return 'user does not exist'
