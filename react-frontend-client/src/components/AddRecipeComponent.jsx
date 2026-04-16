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

    const handleSubmit = (e) => {
    
    }


}   
