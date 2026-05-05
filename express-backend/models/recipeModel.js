"use strict";
const pool = require('./dbConnection');

async function getAllRecipes(){
    const queryText = "SELECT * FROM recipes";
    const result = await pool.query(queryText);
    return result.rows;
}

async function getOneRecipeById(id){
    
    console.log(id);
    const queryText = "SELECT * FROM recipes where id=$1";
    const values = [id];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}

async function getRecipesByType(type){
    const queryText = "SELECT * FROM recipes where type=$1";
    const values = [type];
    const result = await pool.query(queryText, values);
    return result.rows;
}

async function getRecipesByUser(user_id){
    const queryText = "SELECT * FROM recipes where user_id=$1";
    const values = [user_id];
    const result = await pool.query(queryText, values);
    return result.rows;
}

async function deleteRecipe(id){
    let queryText = "DELETE FROM recipes WHERE id=$1";
    const values = [id];
    const result = await pool.query(queryText, values);
    return result.rowCount;
}

async function addRecipe(user_id, name, time, servings, mode, calories, ingredients, instructions, type){
    let queryText = "INSERT INTO recipes (user_id, name, \"time\", servings, mode, calories, ingredients, instructions, type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *";
    let values = [user_id, name, time, servings, mode, calories, ingredients, instructions, type];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}

async function updateRecipe(id, name, time, servings, mode, calories, ingredients, instructions, type) {
    const queryText = "UPDATE recipes SET name=$1, \"time\"=$2, servings=$3, mode=$4, calories=$5, ingredients=$6, instructions=$7, type=$8 WHERE id=$9 RETURNING *";
    const values = [name, time, servings, mode, calories, ingredients, instructions, type, id];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}

module.exports = {
    getAllRecipes,
    getOneRecipeById,
    getRecipesByType,
    getRecipesByUser,
    deleteRecipe,
    addRecipe,
    updateRecipe
};