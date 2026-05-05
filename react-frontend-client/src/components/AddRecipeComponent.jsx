import { useState, useEffect } from 'react';
import RecipesService from '../RecipesService';
import '../index.css';
import { useNavigate } from 'react-router-dom';

const AddRecipeComponent = () => {
    
    const [name, setName] = useState('');
    const [time, setTime] = useState('');
    const [servings, setServings] = useState('');
    const [mode, setMode] = useState('');
    const [calories, setCalories] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const [type, setType] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const newRecipe = { 
                name, 
                time, 
                servings, 
                mode, 
                calories, 
                ingredients, 
                instructions, 
                type 
            };
            await RecipesService.createRecipe(newRecipe)
                navigate('/recipes')
            
        } catch (error) {
            console.error("Error creating recipe:", error);
        }
    };

    useEffect(() => {
        document.title = 'Add Recipe';
    }, []);

    return (
        <div>
            <h2 className='text-center'>Add Recipe</h2>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Name of Dish:  </label>
                    <input type='text' className='form-control' value={name}
                        onChange={(e) => setName(e.target.value)} required>
                    </input>
                    <label>Total Time to Prepare:  </label>
                    <input type='text' className='form-control' value={time}
                        onChange={(e) => setTime(e.target.value)} required>
                    </input>

                    <label>Total Servings:  </label>
                    <input type='text' className='form-control' value={servings}
                        onChange={(e) => setServings(e.target.value)} required>
                    </input>

                    <label>Difficulty:  </label>
                    <input type='text' className='form-control' value={mode}
                        onChange={(e) => setMode(e.target.value)} required>
                    </input>

                    <label>Total NO. Calories:  </label>
                    <input type='text' className='form-control' value={calories}
                        onChange={(e) => setCalories(e.target.value)} required>
                    </input>

                    <label>List all Ingredients:  </label>
                    <textarea type='text' className='form-control ingredients-box' value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)} required>
                    </textarea>

                    <label>Instructions to Prepare:  </label>
                    <textarea type='text' className='form-control instructions-box' value={instructions}
                        onChange={(e) => setInstructions(e.target.value)} required>
                    </textarea>

                    <label>Type of Food:  </label>
                    <input type='text' className='form-control' value={type}
                        onChange={(e) => setType(e.target.value)} required>
                    </input>


                </div>
                <button type="submit" className="add">Add Recipe</button>



            </form>
        </div>
    )


}
export default AddRecipeComponent;