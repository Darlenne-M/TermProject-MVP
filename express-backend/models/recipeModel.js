"use strict";
const pool = require('./dbConnection');

async function getAllRecipes(){
    const queryText = "SELECT * FROM recipes";
    const result = await pool.query(queryText);
    return result.rows;
}

async function getOneRecipeById(id){
    const queryText = "SELECT * FROM recipes where recipeid=$1";
    const values = [id];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}

async function getRecipesByType(params){
    const queryText = "SELECT * FROM recipes where type=$1";
    const result = await pool.query(queryText, params);
    return result.rows;
}

async function deleteRecipe(id){
    let queryText = "DELETE FROM recipes WHERE recipeid=$1";
    const values = [id];
    const result = await pool.query(queryText, values);
    return result.rowCount;
}

async function addRecipe(name, time, servings, mode, calories, ingredients, instructions, type){
    let queryText = "INSERT INTO recipes (name, time, servings, mode, calories, ingredients, instructions, type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *";
    let values = [name, time, servings, mode, calories, ingredients, instructions, type];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}

module.exports = {
    getAllRecipes,
    getOneRecipeById,
    getRecipesByType,
    deleteRecipe,
    addRecipe
};