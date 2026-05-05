import axios from 'axios';

const RECIPES_API_BASE_URL = import.meta.env.VITE_API_URL + '/recipes' || 'http://localhost:3000/recipes';

class RecipesService {
    getRecipes() {
        return axios.get(RECIPES_API_BASE_URL + "/");
    }

    getMyRecipes() {
        return axios.get(`${RECIPES_API_BASE_URL}/my`, { withCredentials: true });
    }

    searchExternalRecipes(query) {
        return axios.get(`${RECIPES_API_BASE_URL}/search`, { params: { q: query }});
    }
    getExternalRecipeById(id) {
        return axios.get(`${RECIPES_API_BASE_URL}/external/${id}`);
    }

    createRecipe(recipe) {
        return axios.post(RECIPES_API_BASE_URL + "/", recipe, { withCredentials: true });
    }

    getRecipeById(id) {
        return axios.get(`${RECIPES_API_BASE_URL}/${id}`);
       
    }

    getRecipesByType(type) {
        return axios.get(`${RECIPES_API_BASE_URL}/type/${type}`);
        
    }

    updateRecipe(id, recipe) {
        return axios.put(`${RECIPES_API_BASE_URL}/${id}`, recipe, { withCredentials: true });
    }

    deleteRecipe(id) {
        return axios.delete(`${RECIPES_API_BASE_URL}/${id}`, { withCredentials: true });
     
    }
}

export default new RecipesService();