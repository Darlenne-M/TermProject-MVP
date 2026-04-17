import { useState, useEffect } from 'react';
import RecipesService from '../RecipesService';
import '../index.css';
import { Link, useParams } from 'react-router-dom';


const RecipeDetailsComponent = () => {
    
const {id} = useParams();
const [recipe, setRecipe] = useState([]);


useEffect(() => {
    document.title = "Recipe Details";
    RecipesService.getRecipeById(id).then((res) => {
        setRecipe(res.data);
    });

}, [id]);

return(
    <div>
        <h2 className='text-center'>Recipe Details</h2>
        <Link to="/add" className='btn btn-outline-primary'>Add Recipe</Link>
        <div id="details-container">
            <div className='card-holder'>
                <h3>{recipe.name}</h3>
                <p>Time: {recipe.time}</p>
                <p>Type: {recipe.type}</p>
                <p>Servings: {recipe.servings}</p>
                <p>Dificulty: {recipe.mode}</p>
                <p>Calories: {recipe.calories}</p>
                <p>Ingredients: {recipe.ingredients}</p>
                <p>Instructions: {recipe.instructions}</p>

            </div>
            <div className='card-footer text body-secondary'>
                <Link to="/recipes" className="card-link">Recipe List</Link>
            </div>
        </div>
    
    
    </div>
);


}; export default RecipeDetailsComponent;