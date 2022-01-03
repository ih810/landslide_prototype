from flask import request
from flask_classy import FlaskView, route
from Util.auth import azure_login_query

class Login_Route(FlaskView):
    @route('/login', methods=['POST'])
    def login(self):
        print('in login')
        login_data = request.get_json()
        print('login', login_data)
        auth_result = azure_login_query(login_data['username'], login_data['password'])
        print(type(auth_result))
        print(auth_result)
        return {'data':auth_result}