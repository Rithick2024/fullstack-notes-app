Prerequisites
Node.js and npm installed

Python 3 installed

MongoDB account and cluster (link provided below)

Installation and Setup
Clone the repository

bash
git clone <repository-url>
cd project-folder

Frontend Setup

bash
cd frontend
npm install
npm run dev
The frontend will start running on the default local server.

Backend Setup
bash
cd ../backend
python -m venv env
# Activate virtual environment:
# On Windows:
env\Scripts\activate
# On macOS/Linux:
source env/bin/activate

uvicorn main:app --reload
The backend server will start with hot reload enabled.

Database Setup
Use MongoDB cloud service for the database. Access your cluster here:
https://cloud.mongodb.com/v2/6819dee202b7a1316c39f782#/overview

Make sure to configure your backend to connect to your MongoDB cluster.
