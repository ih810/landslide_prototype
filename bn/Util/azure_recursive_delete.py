from azure.storage.file.models import File, Directory
from Util.azure_file_share import Get_File_Service

def recursive_delete(azure_dir_content, cache):
    file_client = Get_File_Service()

    # construct path to dir
    present_working_dir = '/'.join(cache)

    # for each folder in dir
    for dir_item in azure_dir_content:
        if type(dir_item) == File:
            file_client.delete_file('data', directory_name=present_working_dir, file_name=dir_item.name)
        elif type(dir_item) == Directory:
            # list all folder/files in target dir
            directory_content = file_client.list_directories_and_files('data', directory_name=present_working_dir+'/'+dir_item.name)
            # push the dirname into the cache list
            cache.append(dir_item.name)
            # recusion
            recursive_delete(directory_content, cache)
            # pop to handle multiple folder under one dir
            cache.pop()

    file_client.delete_directory('data', directory_name=present_working_dir)