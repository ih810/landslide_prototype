from azure.storage.file.models import File, Directory
from Util.azure_file_share import Get_File_Service

def recursive_delete(azure_dir_content, dir_name, cache):
    file_client = Get_File_Service()
    present_working_dir = '/'.join(cache)
    print('present_working_dir: ', present_working_dir)
    print('contenttype: ', azure_dir_content)
    for item in azure_dir_content:
        print('item: ', item)
        if type(item) == File:
            print('is file', item.name)
            file_client.delete_file('data', directory_name=present_working_dir, file_name=item.name)
            print('deleted file', item.name)
        elif type(item) == Directory:
            print('is folder: ', item.name)
            print('folder path: ',present_working_dir+'/'+item.name)

            directory_content = file_client.list_directories_and_files('data', directory_name=present_working_dir+'/'+item.name)
            cache.append(item.name)

            print('cache', cache)
            recursive_delete(directory_content, item.name, cache)

    file_client.delete_directory('data', directory_name=present_working_dir)