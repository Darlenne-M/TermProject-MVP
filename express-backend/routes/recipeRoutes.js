"use strict";
const express = require("express");
const router = express.Router();
const recipeController = require('../controllers/recipeController');


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Not authenticated' });
}



router.get("/type/:type", recipeController.fetchRecipesByType);
router.get("/my", ensureAuthenticated, recipeController.fetchRecipesByUser);
router.get("/", recipeController.fetchAllRecipes);
router.get("/:id", recipeController.fetchRecipeById);
router.post("/", ensureAuthenticated,recipeController.createRecipe);
router.delete("/:id", ensureAuthenticated, recipeController.removeRecipe);
module.exports = router;