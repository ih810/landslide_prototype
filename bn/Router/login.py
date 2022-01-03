from flask import request
from flask_classy import FlaskView, route
from Util.auth import azure_login_query

class Login_Route(FlaskView):
    @route('/login', methods=['POST'])
    def login(self):
        login_data = request.form
        
        auth_result = azure_login_query(login_data['username'], login_data['password'])
        
        return auth_result