from flask import request
from flask_classy import FlaskView, route
from Util.auth import azure_login_query

class Login_Route(FlaskView):
    @route('/user-login', methods=['POST'])
    def login(self):
        login_data = request.get_json()
        auth_result = azure_login_query(login_data['username'], login_data['password'], False)
        return {'data':auth_result}
        
    @route('/admin-login', methods=['POST'])
    def admin_login(self):
        login_data = request.get_json()
        print(login_data)
        auth_result = azure_login_query(login_data['username'], login_data['password'], True)
        return {'data':auth_result}