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

async function getRecipesByType(params){
    const queryText = "SELECT * FROM recipes where type=$1";
    const result = await pool.query(queryText, params);
    return result.rows;
}

async function getRecipesUser(user_id){
    const queryText = "SELECT * FROM recipes where user_id=$1";
    const values = [user_id];
    const result = await pool.query(queryText, values);
    return result.rows;
}

async function deleteRecipe(id){
    let queryText = "DELETE FROM recipes WHERE recipeid=$1";
    const values = [id];
    const result = await pool.query(queryText, values);
    return result.rowCount;
}

async function addRecipe(user_id, name, time, servings, mode, calories, ingredients, instructions, type){
    let queryText = "INSERT INTO recipes (user_id, name, time, servings, mode, calories, ingredients, instructions, type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *";
    let values = [user_id, name, time, servings, mode, calories, ingredients, instructions, type];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}

module.exports = {
    getAllRecipes,
    getOneRecipeById,
    getRecipesByType,
    getRecipesUser,
    deleteRecipe,
    addRecipe
};