# Backend
# Python Flask Azure Interface  
  
This Python Flask application acts as an interface between users and Azure services, routing requests to Azure and handling responses. It utilizes environment variables for secure credential management and requires specific setup and configuration to operate correctly.  
  
## Getting Started  
  
These instructions will guide you through the setup and deployment of the Python Flask Azure Interface.  
  
### Prerequisites  
  
Before you begin, ensure you have the following installed:  
- Python 3.6 or later  
- pip (Python package installer)  
- A text editor or IDE of your choice  
- An Azure account with appropriate permissions  
   
### Installation  
  
1. **Clone the Repository**: Clone this repository to your local machine using `git clone` or download the ZIP file.  
  
2. **Set Up a Virtual Environment**: Navigate to the project directory and set up a Python virtual environment. This keeps your dependencies organized and isolated from other projects.  
  
```bash
python -m venv venv  
source venv/bin/activate  # On Windows use `venv\Scripts\activate`  
```

3. **Install Dependencies**: Install the project dependencies listed in the requirements.txt file.  
  
```bash  
Copy code  
pip install -r requirements.txt  
```  
  
4. **Set Up Environment Variables**: Create a .env file in the root directory of the project. Populate it with the following structure, replacing the placeholders with your actual Azure account details:  
```dotenv  
# environment variables for security credentials  
ACC_NAME=your_azure_account_name  
ACC_KEY=your_azure_account_key  
CONN_STR=your_azure_connection_string  
```
Ensure that the .env file is included in your .gitignore to prevent sensitive information from being committed to version control.  

5. **Running the Application**
Ensure your virtual environment is activated.  

Run the Flask application using:  
```
bash
flask run
```
By default, the application will run on http://127.0.0.1:5000/. You can access it using a web browser or through API testing tools like Postman.  

## Features  
Request Routing: Routes API requests to specific Azure services.  
Security: Utilizes environment variables to securely manage and access Azure credentials.  

# Frontend

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
