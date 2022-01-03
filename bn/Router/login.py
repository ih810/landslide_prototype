from flask import request
from flask import request
from flask_classy import FlaskView, route

class Login_Route(FlaskView):
    def index(self):
        return self

    @route('/login', methods=['POST'])
    def login(self):
        login_data = request.form
        print(login_data['username'])
        print(login_data['password'])
        return login_data