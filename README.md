# TermProject-MVP

#Getting Started
1. Clone the repository and navigate to the project directory. Add environment variables for the backend and frontend:
  -Create a .env file in the express-backend directory with the following       content:
   
    DATABASE_URL='YOUR_DATABASE_URL_HERE'
    CLIENT_BASE_URL='http://localhost:5173'
    clientID='client-id-from-google-console'
    clientSecret='client-secret-from google-console'

  -Create a .env file in the react-frontend-client directory with the following content:
    VITE_API_URL=http://localhost:3000
    
2. Install dependencies for both the backend and frontend:
  -For the backend:
    cd express-backend
    npm install
  -For the frontend:
    cd react-frontend-client
    npm install
3. Start the backend server:
    cd express-backend
    node server.js
   
4. In a separate terminal, start the frontend development server:
    cd react-frontend-client
    npm run dev
5. Open your browser and navigate to http://localhost:5173 to view the application.

Frontend Framework

I used React (Vite) because it provides fast development, reusable components, and efficient state management using hooks. Vite was chosen for its fast build times and modern tooling.

Backend Structure

I used Node.js with Express. The backend is structured into:

routes (API endpoints)
models (database logic)
auth (Passport Google OAuth)
server.js (main entry point)

This separation keeps the code modular and easier to maintain.

Database Schema

I used a relational database (PostgreSQL). The schema includes:

Users table (Google OAuth users)
Recipes table (user-created recipes)
Relationships between users and their recipes

This allows each user to manage their own recipes securely.

Challenges
1. Google OAuth redirect issues

I faced a redirect_uri_mismatch error due to incorrect callback URLs between localhost and production. This was fixed by properly configuring:

Google Cloud Console redirect URIs
environment variables in Render
Passport callbackURL setup
2. Deployment structure issues

Initially, Render could not find the correct root directory and build scripts. This was fixed by correctly separating:

express-backend (backend service)
react-frontend-client (frontend build)
3. Environment variable issues

Frontend variables (VITE_API_URL) were not updating because Vite embeds them at build time. This required rebuilding the frontend after changes.

Learning Outcomes
Learned full-stack architecture (frontend + backend separation)
Understood OAuth authentication flow using Google Passport
