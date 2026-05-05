import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'

import AddRecipeComponent from './components/AddRecipeComponent';
import RecipesListComponent from './components/RecipeListComponent';
import RecipeDetailsComponent from './components/RecipeDetailsComponent';
import LoginPage from './components/auth/LoginComponent';
import { Link } from 'react-router-dom';
import ProtectedLayout from './components/auth/ProtectedLayout.jsx';
import ProfilePage from './components/auth/ProfilePage.jsx';
import { useAuth } from './components/auth/AuthContext.jsx';

function App() {
  const { isAuthenticated, logout } = useAuth(); // <-- Get state and functions from context

  return (
    <Router>
      <div className="container">
        <nav className='navbar'>
          <Link to="/">Home</Link> | 

          {!isAuthenticated? (
            <Link to="/login">Login</Link>
          ) : (
            <> 
              <button onClick={logout}>Logout</button> 
              | <Link to="/profile">Profile</Link>
              | <Link to="/add">Add Recipe</Link>
        
            </>
          )}
            
        </nav>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedLayout />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/add" element={<AddRecipeComponent />} />
        
          </Route>
          <Route path="/" element={<RecipesListComponent />} />
          <Route path="/recipes" element={<RecipesListComponent />} />
          <Route path="/recipes/type/:type" element={<RecipesListComponent />} />
          <Route path="/recipes/:id" element={<RecipeDetailsComponent />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
