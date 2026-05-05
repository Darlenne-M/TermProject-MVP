import React, { useState, useEffect } from 'react';
import RecipesService from '../RecipesService';
import '../index.css';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from './auth/AuthContext.jsx';

const RecipesListComponent = () => {
    const { type } = useParams();
    const { user } = useAuth();
    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState('');


    useEffect(() => {
        const fetchData = async () => {
            try {
                if (search.trim()) {
                    const res = await RecipesService.searchExternalRecipes(search);

                    console.log("API DATA:", res.data);

                    const formatted = res.data.map(r => ({
                        id: r.id,
                        name: r.title,
                        time: r.readyInMinutes,
                        servings: r.servings,
                        image: r.image,
                        external: true
                    }));

                    console.log("FORMATTED:", formatted);

                    setRecipes(formatted);
                    return;
                }
                if (!user) {
                    setRecipes([]);
                    return;
                }

                if (type) {
                    const res = await RecipesService.getRecipesByType(type);
                    setRecipes(res.data);
                    document.title = `Recipes: ${type}`;
                    return;
                }


                const res = await RecipesService.getMyRecipes();
                setRecipes(res.data);
                document.title = 'My Recipes';

            } catch (error) {
                console.error("Error fetching recipes:", error);
            }

        };
        fetchData();

    }, [search, type, user]);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this recipe?")) {
            return;
        }
        try {
            await RecipesService.deleteRecipe(id);
            setRecipes(prev => prev.filter(recipe => recipe.id !== id));
        } catch (error) {
            console.error("Error deleting recipe:", error);
        }
    };



    return (
        <>
            <h2 className='text-center'>{type ? type + ' Recipes' : 'Make your own food, stay at home'}</h2>


            <input type='text' placeholder='🔍︎ Search recipes'
                value={search} onChange={(e) => setSearch(e.target.value)} className='form-control search-box'>

            </input>
            <main className='items-container'>
                {recipes.length === 0 ? (
                    <p>Login to view your recipes.</p>
                ) : (
                    recipes.map((recipe, index) => (
                        <article className="item" key={recipe.id || index}>
                            <div className='text'>
                                <h3>{recipe.name || recipe.title} </h3>
                                <p> Time: {recipe.time || 'N/A'}</p>
                                {recipe.mode && recipe.mode !== 'N/A' && <p>Difficulty: {recipe.mode}</p>}
                                <p>Servings: {recipe.servings || 'N/A'}</p>

                                {recipe.type && (
                                    <p><Link to={`/recipes/type/${recipe.type}`}>
                                        {recipe.type}</Link>
                                    </p>
                                )}

                                {recipe.id && (
                                    <p><Link
                                        className='detail-button'
                                        to={`/recipes/${recipe.id}`}
                                        state={{ external: recipe.external }}
                                    >
                                        View
                                    </Link></p>
                                )}
                                {user && !recipe.external && (
                                    <button className='detail-button delete-button' onClick={() => handleDelete(recipe.id)}>
                                        Delete
                                    </button>
                                )}
                            </div>
                        </article>
                    ))
                )}

            </main>


        </>
    )



}; export default RecipesListComponent;