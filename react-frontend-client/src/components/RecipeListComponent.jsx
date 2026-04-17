import React, { useState, useEffect } from 'react';
import RecipesService from '../RecipesService';
import '../index.css';
import { Link, useParams } from 'react-router-dom';

const RecipesListComponent = () => {
    const { type } = useParams();
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        if (type) {
            RecipesService.getRecipesByType(type).then((res) => {
                setRecipes(res.data);
                document.title = `Recipes of type ${type}`;
            });
        } else {
            RecipesService.getRecipes().then((res) => {
                setRecipes(res.data);
                document.title = 'Recipes List';
            });
        }
    }, [type]);

    return (
        <>
            <h2 className='text-center'>{type ? type + ' List' : 'Recipes List'}</h2>
            {type && <Link to="/recipes" className="card-link">Recipe List</Link>}

            <div className='row'>
                {type && <Link to="/add" className='btn btn-outline-primary'>Add Recipe</Link>}
            </div>
            <main className='items-container'>
                {recipes.map(recipe => (
                    <article className="item" key={recipe.id}>
                        <div className='text'>
                            <h3>
                                {recipe.name}
                            </h3>
                            <p>Time: {recipe.time}</p>
                            <p>Difficulty: {recipe.mode}</p>
                            <p>Servings: {recipe.servings}</p>
                            <p><Link to={`/recipes/type/${recipe.type}`}>{recipe.type}</Link></p>
                            <p><Link className="detail-button" to={`/recipes/${recipe.id}`}>View</Link></p>
                        </div>

                    </article>
                ))}



            </main>


        </>
    )



}; export default RecipesListComponent;