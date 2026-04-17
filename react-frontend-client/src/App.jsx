import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import AddRecipeComponent from './components/AddRecipeComponent';
import RecipesListComponent from './components/RecipeListComponent';
import RecipeDetailsComponent from './components/RecipeDetailsComponent';


function App() {

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<RecipesListComponent />} />
          <Route path="/recipes" element={<RecipesListComponent />} />
          <Route path="/recipes/type/:type" element={<RecipesListComponent />} />
          <Route path="/add" element={<AddRecipeComponent />} />
          <Route path="/recipes/:id" element={<RecipeDetailsComponent />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
