from flask import request
from flask_classy import FlaskView, route

#test
class Homepage_Route(FlaskView):
    def index(self):
        return self

    @route('/admin-dashboard', methods=['GET'])
    # return all project available
    def get_all_project(self):
        user_id = request.args.get('user_id')
        return user_id

    @route('/user-dashboard', methods=['GET'])
    # return all project of the user
    def get_user_project(self):
        user_id = request.args.get('user_id')
        return user_id

    @route('/undo-project', methods=['PUT'])
    # return void/all project?
    def undo_project(self):
        project_id = request.args.get('project_id')
        return project_id

    @route('/delete-project', methods=['DELETE'])
    # return void/all project?
    def delete_project(self):
        project_id = request.args.get('project_id')
        return project_id
