from flask import request
from flask import request
from flask_classy import FlaskView, route

class Login_Route(FlaskView):
    @route('/login', methods=['POST'])
    def post(self):
        login_data = request.form
        print(login_data['username'])
        print(login_data['password'])
        return login_data