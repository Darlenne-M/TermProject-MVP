import axios from 'axios';

const RECIPES_API_BASE_URL = import.meta.env.VITE_API_URL;

class RecipesService{
    getRecipes(){
        return axios.get(RECIPES_API_BASE_URL + "/");     
    }

    createRecipe(recipe){
        return axios.post(RECIPES_API_BASE_URL + "/", recipe);     
    }

    getRecipeById(id){
        return axios.get(`${RECIPES_API_BASE_URL}/${id}`);
    }

    getRecipesByType(type){
        return axios.get(`${RECIPES_API_BASE_URL}/type/${type}`);
    }

    deleteRecipe(id){
        return axios.delete(`${RECIPES_API_BASE_URL}/${id}`);
    }
}

export default new RecipesService();