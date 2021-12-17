from azure.storage.fileshare import ShareServiceClient, generate_account_sas, ResourceTypes, AccountSasPermissions
from datetime import datetime, timedelta

sas_token = generate_account_sas(
    account_name="aiat3landslidestg",
    account_key="6QNKIjgfPhOlYyR32LqV50gBjPSLJScibFVfNmJxfdOGz2zcAKvfxuJwAgEzSky9W6UlnQrCgbRwCSFQP7VW7Q==",
    resource_types=ResourceTypes(service=True),
    permission=AccountSasPermissions(read=True),
    expiry=datetime.utcnow() + timedelta(hours=1)
)

service = ShareServiceClient(
    account_url="https://aiat3landslidestg.file.core.windows.net/", credential=sas_token)
parentDir = service.from_connection_string(
    conn_str="DefaultEndpointsProtocol=https;AccountName=aiat3landslidestg;AccountKey=6QNKIjgfPhOlYyR32LqV50gBjPSLJScibFVfNmJxfdOGz2zcAKvfxuJwAgEzSky9W6UlnQrCgbRwCSFQP7VW7Q==;EndpointSuffix=core.windows.net",
    share_name="home",
    directory_path="/"
)

project_name = 'HongKongLiDAR2011_DEMO'

demo_service = parentDir.get_share_client('data/'+project_name+'/Output/PredictionResults')
demo_list = demo_service.list_directories_and_files()

print(demo_service)
for item in demo_list:
    print(item)