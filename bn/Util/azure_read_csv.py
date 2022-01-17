from email import header
import pandas as pd
from Util.azure_file_share import Get_File_Service

def Read_csv(folder_name, file_name):
    file_service = Get_File_Service()

    try:
        # azure return string inside csv
        csv_content = file_service.get_file_to_text(share_name='data', directory_name=folder_name, file_name=file_name).content
        
        # make df from string
        df = pd.DataFrame([x.split(',') for x in csv_content.split('\n')])
        
        # set header for df
        new_header = df.iloc[0]
        df = df[1:]
        df.columns = new_header
        
        # turn df into obj
        data = list(df.T.to_dict().values())

        return data
    except Exception as e:
        print(e)
        return 