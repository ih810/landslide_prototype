import re
from Util.azure_file_share import Get_File_Service

def Read_Txt(folder_name, file_name):
    file_service = Get_File_Service()
    try:
        txt_content = file_service.get_file_to_text(share_name='data', directory_name=folder_name, file_name=file_name).content
        txt_list = re.split('\n|\r', txt_content)
        filtered_list = list(filter(None, txt_list))
        return filtered_list
    except:
        return False