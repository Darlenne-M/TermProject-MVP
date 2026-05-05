# TermProject-MVP

Getting Started

1. Clone the repository and navigate to the project directory. Add environment variables for the backend and frontend:
 
    -Create a .env file in the express-backend directory with the following         content:
   
       DATABASE_URL='YOUR_DATABASE_URL_HERE'
   
       CLIENT_BASE_URL='http://localhost:5173'
   
       clientID='client-id-from-google-console'
   
       clientSecret='client-secret-from google-console'

    -Create a .env file in the react-frontend-client directory with the             following content:
   
       VITE_API_URL=http://localhost:3000
    
2. Install dependencies for both the backend and frontend:
   
    -For the backend:
   
       cd express-backend
   
       npm install
   
    -For the frontend:
   
       cd react-frontend-client
   
       npm install
   
4. Start the backend server:
   
       cd express-backend
   
       node server.js
   
6. In a separate terminal, start the frontend development server:
   
       cd react-frontend-client
   
       npm run dev
   
7. Open your browser and navigate to http://localhost:5173 to view the application.


FRONTEND FRAMEWORK

I used React (Vite) because it provides fast development, reusable components, and efficient state management using hooks. Vite was chosen for its fast build times and modern tooling.


BACKEND STRUCTURE

I used Node.js with Express. The backend is structured into:

routes (API endpoints)
models (database logic)
auth (Passport Google OAuth)
server.js (main entry point)



DATABASE SCHEMA

I used a relational database (PostgreSQL). The schema includes:

Users table (Google OAuth users)
Recipes table (user-created recipes)
Relationships between users and their recipes

This allows each user to manage their own recipes securely.


CHALLENGES

1. Google OAuth redirect issues

I faced a redirect_uri_mismatch error due to incorrect callback URLs between localhost and production. I fixed this by properly configuring:

Google Cloud Console redirect URIs
environment variables in Render


2. Deployment structure issues

Initially, Render could not find the correct root directory and build scripts. I fixed this by correctly separating:

express-backend 
react-frontend-client


LEARNING OUTCOMES

Learned full-stack architecture
Understood OAuth authentication flow using Google Passport

FUTURE WORK

If i had more time, I would have figured out a way for users to be able to upload photos of their recipes
