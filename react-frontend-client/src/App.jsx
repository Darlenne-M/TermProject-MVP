import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import AddRecipeComponent from './components/AddRecipeComponent';

function App() {


  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/add" element={<AddRecipeComponent />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
