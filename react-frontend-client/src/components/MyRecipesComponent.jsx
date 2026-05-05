import { useState, useEffect } from 'react';
import RecipesService from '../RecipesService';
import '../index.css';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';
import { use } from 'react';

const MyRecipesComponent = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchMyRecipes = async () => {
            try {
                const res = await RecipesService.getMyRecipes();
                setRecipes(res.data);
                document.title = 'My Recipes';
            }catch (error) {
                console.error("Error fetching my recipes:", error);
            }
        };
        fetchMyRecipes();
    }, []);

    return (
        <>
            <h2 className='text-center'>My Recipes</h2>

            {recipes.length === 0 ? (
                <p>You have not added any recipes yet.</p>
            ) : (
                <main className='items-container'>
                    {recipes.map(recipe => (
                        <article className="item" key={recipe.id}>
                            <div className='text'>
                                <h3>{recipe.name}</h3>
                                <p>Time: {recipe.time}</p>
                                <p>Difficulty: {recipe.mode}</p>
                                <p>Servings: {recipe.servings}</p>

                                <p><Link to={`/recipes/${recipe.id}`}>View Recipe</Link></p>
                            </div>
                        </article>
                    ))}
                </main>
            )}
        </>
    );
};
export default MyRecipesComponent;