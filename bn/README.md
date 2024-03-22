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

5.**Running the Application**
Ensure your virtual environment is activated.  

Run the Flask application using:  
```
bash
flask run
```
By default, the application will run on http://127.0.0.1:5000/. You can access it using a web browser or through API testing tools like Postman.  

Features  
Request Routing: Routes API requests to specific Azure services.  
Security: Utilizes environment variables to securely manage and access Azure credentials.  
