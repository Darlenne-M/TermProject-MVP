import React, { useState, useEffect } from 'react';
import RecipesService from '../RecipesService';
import '../index.css';
import { Link, useParams } from 'react-router-dom';

const RecipesListComponent = () => {
    const { type } = useParams();
    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState('');

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

    const filteredRecipes = recipes.filter(recipe => {
        const term = search.toLowerCase().trim();

        if (!term) return true;

        return (recipe.name.toLowerCase().includes(term) ||
            recipe.type.toLowerCase().includes(term)
        );
    });

    return (
        <>
            <h2 className='text-center'>{type ? type + ' List' : 'Make your own food, stay at home'}</h2>
            
        
            <input type='text' placeholder='🔍︎ Search recipes'
                value={search} onChange={(e) => setSearch(e.target.value)} className='form-control search-box'>
                    
            </input>
            <main className='items-container'>
                {filteredRecipes.length === 0 ? (
                    <p>No recipes found</p>
                ):(
                filteredRecipes.map(recipe => (
                    <article className="item" key={recipe.id}>
                        <div className='text'>
                            <h3>{recipe.name}</h3>
                            <p>Time: {recipe.time}</p>
                            <p>Difficulty: {recipe.mode}</p>
                            <p>Servings: {recipe.servings}</p>
                            <p><Link to={`/recipes/type/${recipe.type}`}>{recipe.type}</Link></p>
                            <p><Link className="detail-button" to={`/recipes/${recipe.id}`}>View</Link></p>
                        </div>

                    </article>
                ))
            )}



            </main>


        </>
    )



}; export default RecipesListComponent;