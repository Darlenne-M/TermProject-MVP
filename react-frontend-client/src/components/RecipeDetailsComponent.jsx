import { useState, useEffect } from 'react';
import RecipesService from '../RecipesService';
import '../index.css';
import { Link, useParams } from 'react-router-dom';


const RecipeDetailsComponent = () => {

    const { id } = useParams();
    const [recipe, setRecipe] = useState([]);
    const [editRecipe, setEditRecipe] = useState(null);
    const [isEditing, setIsEditing] = useState(false);


    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const res = await RecipesService.getRecipeById(id);
                setRecipe(res.data);
                
                setEditRecipe(res.data);
                document.title = "Recipe Details";
            } catch (error) {
                console.error("Error fetching recipe:", error);
            }
        };
        fetchRecipe();

    }, [id]);

    const handleChange = (e) => {
        setEditRecipe({
            ...editRecipe,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdate = async () => {
        try {
            const res =await RecipesService.updateRecipe(id, editRecipe);

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
        return (
            <div>
                <h2 className='text-center'>Recipe Details</h2>

                <div id="details-container">
                    <div className='card-holder'>

                        {isEditing ? (
                             <div className='form-group'>
                                <label>Name of Dish:  </label>
                                <input type='text' name='name' value={editRecipe.name} onChange={handleChange} className='form-control' />
                                <label>Time:  </label>
                                <input type='text' name='time' value={editRecipe.time} onChange={handleChange} className='form-control' />
                                <label>Servings:  </label>
                                <input type='text' name='servings' value={editRecipe.servings} onChange={handleChange} className='form-control' />
                                <label>Mode:  </label>
                                <input type='text' name='mode' value={editRecipe.mode} onChange={handleChange} className='form-control' />
                                <label>Calories:  </label>
                                <input type='text' name='calories' value={editRecipe.calories} onChange={handleChange} className='form-control' />
                                <label>Ingredients:  </label>
                                <textarea name='ingredients' value={editRecipe.ingredients} onChange={handleChange} className='form-control ingredients-box' />
                                <label>Instructions:  </label>
                                <textarea name='instructions' value={editRecipe.instructions} onChange={handleChange} className='form-control instructions-box' />
                                <label>Type:  </label>
                                <input type='text' name='type' value={editRecipe.type} onChange={handleChange} className='form-control' />
                               
                               <div className='button-row'>
                               <button onClick={handleUpdate} className='save'>Save</button>
                                <button onClick={handleCancel} className='cancel'>Cancel</button>
                               </div>
                            </div>
                            
                        ) : (
                            <>
                                <h3>{recipe.name}</h3>
                                <p>Time: {recipe.time}</p>
                                <p>Type: {recipe.type}</p>
                                <p>Servings: {recipe.servings}</p>
                                <p>Dificulty: {recipe.mode}</p>
                                <p>Calories: {recipe.calories}</p>
                                <p>Ingredients: {recipe.ingredients}</p>
                                <p>Instructions: {recipe.instructions}</p>
                                <button onClick={() => {
                                    setEditRecipe(recipe);
                                    setIsEditing(true);
                                }} className='detail-button edit-button'>Edit</button>

                            </>
                        )}
                        </div>
                    </div>
                </div>
        );


    }; export default RecipeDetailsComponent;