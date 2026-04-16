"use strict";
const model = require('../models/recipeModel');

async function fetchAllRecipes(req, res) {
    try {
        const recipes = await model.getAllRecipes();
        res.json(recipes);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}

async function fetchRecipeById(req, res) {
    const id = req.params.id;
    if (id) {
        try {
            const recipe = await model.getOneRecipeById(id);
            res.json(recipe);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing required id param!");
    }
}

async function fetchRecipesByType(req, res) {
    const type = req.params.type;
    let params;
    if (type) {
        try {
            params = [type];
            const recipes = await model.getRecipesByType(params);
            res.json(recipes);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing required type param!");
    }
}

async function removeRecipe(req, res) {
    const id = req.params.id;
    if (id) {
        try {
            const deletedCount = await model.deleteRecipe(id);
            if (deletedCount > 0) {
                res.send(`Recipe with id ${id} deleted successfully.`);
            } else {
                res.status(404).send("Recipe not found");
            }
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing required type param!");
    }
}

async function createRecipe(req, res) {
    const { name, time, servings, mode, calories, ingredients, instructions, type } = req.body;
    if (name && time && servings && mode && calories && ingredients && instructions && type) {
        try {
            const newRecipe = await model.addRecipe(name, time, servings, mode, calories, ingredients, instructions, type);
            res.status(201).json(newRecipe);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing required product fields!");
    }
}

module.exports = {
    fetchAllRecipes,
    fetchRecipeById,
    fetchRecipesByType,
    removeRecipe,
    createRecipe
};