"use strict";
const express = require("express");
const router = express.Router();
const recipeController = require('../controllers/recipeController');

const cors = require('cors');

const corsOptions = {
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true // Allow cookies and authentication headers
};

router.use(cors(corsOptions));

router.get("/type/:type", recipeController.fetchRecipesByType);
router.get("/user/:user", recipeController.fetchRecipesByType);
router.get("/:id", recipeController.fetchRecipeById);
router.get("/", recipeController.fetchAllRecipes);
router.post("/", recipeController.createRecipe);
router.delete("/:id", recipeController.removeRecipe);
module.exports = router;