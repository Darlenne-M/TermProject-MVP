import { useState, useEffect } from 'react';
import RecipesService from '../RecipesService';
import '../index.css';
import { Link, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const RecipeDetailsComponent = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState({});
    const [editRecipe, setEditRecipe] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const location = useLocation();

    const normalizeRecipe = (data, external = false) => {
        if (external) {
            return {
                id: data.id,
                name: data.title,
                time: data.readyInMinutes || 'N/A',
                servings: data.servings || 'N/A',
                mode: data.mode || 'N/A',
                calories: data.calories || 'N/A',
                ingredients: data.extendedIngredients
                    ? data.extendedIngredients.map(i => i.original).join(', ')
                    : 'N/A',
                instructions: data.instructions || 'N/A',
                type: 'External'
            };
        } 

        return {
            id: data.id,
            name: data.name,
            time: data.time,
            servings: data.servings,
            mode: data.mode,
            calories: data.calories,
            ingredients: data.ingredients,
            instructions: data.instructions,
            type: data.type
        };
    };
useEffect(() => {
    const fetchRecipe = async () => {
        try {
            if (!id) return;

            const external = location.state?.external;

            let res;

            if (external) {
                res = await RecipesService.getExternalRecipeById(id);
            } else {
                res = await RecipesService.getRecipeById(id);
            }

            const normalized = normalizeRecipe(res.data, external);

            setRecipe(normalized);
            setEditRecipe(normalized);
            document.title = "Recipe Details";

        } catch (error) {
            console.error("Error fetching recipe:", error);
        }
    };

    fetchRecipe();
}, [id, location.state]);

    const handleChange = (e) => {
        setEditRecipe({
            ...editRecipe,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdate = async () => {
        try {
            if(recipe.type === 'External') {
                alert("External recipes cannot be edited.");
                return;
            }

            const res = await RecipesService.updateRecipe(id, editRecipe);

            setRecipe(res.data);
            setIsEditing(false);
            setEditRecipe(res.data);

        } catch (error) {
            console.error("Error updating recipe:", error);
        }
    };

    const handleCancel = () => {
        setEditRecipe(recipe);
        setIsEditing(false);
    };

    const isExternal = recipe.type === 'External';
    
    return (
        <div>
            <h2 className='text-center'>Recipe Details</h2>
            <div id="details-container">
                <div className='card-holder'>

                    {isEditing ? (
                        <div className='form-group'>
                            <label>Name of Dish:  </label>
                            <input type='text' name='name' value={editRecipe.name || ''} onChange={handleChange} className='form-control' />
                            <label>Time:  </label>
                            <input type='text' name='time' value={editRecipe.time || ''} onChange={handleChange} className='form-control' />
                            <label>Servings:  </label>
                            <input type='text' name='servings' value={editRecipe.servings || ''} onChange={handleChange} className='form-control' />
                            <label>Mode:  </label>
                            <input type='text' name='mode' value={editRecipe.mode || ''} onChange={handleChange} className='form-control' />
                            <label>Calories:  </label>
                            <input type='text' name='calories' value={editRecipe.calories || ''} onChange={handleChange} className='form-control' />
                            <label>Ingredients:  </label>
                            <textarea name='ingredients' value={editRecipe.ingredients || ''} onChange={handleChange} className='form-control ingredients-box' />
                            <label>Instructions:  </label>
                            <textarea name='instructions' value={editRecipe.instructions || ''} onChange={handleChange} className='form-control instructions-box' />
                            <label>Type:  </label>
                            <input type='text' name='type' value={editRecipe.type || ''} onChange={handleChange} className='form-control' />

                            <div className='button-row'>
                                <button onClick={handleUpdate} className='save'>Save</button>
                                <button onClick={handleCancel} className='cancel'>Cancel</button>
                            </div>
                        </div>

                    ) : (
                        <>
                            <h3>{recipe.name}</h3>
                            <p><b>Time:</b> {recipe.time}</p>
                            {!isExternal &&(
                                <p><b>Type:</b> {recipe.type}</p>
                            )}
                            {!isExternal && (
                                <p><b>Servings:</b> {recipe.servings}</p>

                            )}

                            {!isExternal && (
                                <p><b>Calories:</b> {recipe.calories}</p>
                            )}
                            <p><b>Ingredients:</b> {recipe.ingredients}</p>
                            <p><b>Instructions:</b></p>
                            <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
                            {recipe.type !== 'External' && (
                                <button
                                onClick={() => {
                                    setEditRecipe(recipe);
                                    setIsEditing(true);
                                }}
                                className='detail-button edit-button'
                            >
                                Edit
                            </button>)}

                        </>
                    )}
                </div>
            </div>
        </div>
    );


}; export default RecipeDetailsComponent;