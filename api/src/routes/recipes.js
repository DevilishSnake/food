require('dotenv').config();
const { Op } = require("sequelize");
const { KEY } = process.env;
const { Router } = require('express');
const router = Router();
const axios = require('axios');
const { Recipe, Diet } = require('../db');

const API_getRecipes = async (name = undefined) => {
    if(name !== undefined) {
        console.log('Entra a name !== undefined');
        const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${name}&addRecipeInformation=true&apiKey=${KEY}`);
        

    } else {
        console.log('Entra a name === undefined');
        const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&apiKey=${KEY}`);
        //console.log(response.data.results);
        return response.data.results;
    }
};

const getAllRecipes = async (name = undefined) => {
    console.log('Entra a getAllRecipes')
    const API_recipes = await API_getRecipes(name);
    //Hacer el get a la DB acá, después concatenarlo con los de la API
    console.log('API_recipes es igual a: ' + API_recipes);
    return API_recipes;
}

router.get('/', async (req, res) => {
    console.log('Hola mundo desde get de Recipes');
    try {
        if (req.query.name !== undefined) {
            const { name } = req.query;
            let newResponse = await getAllRecipes(name);
            return res.status(200).json(newResponse);
        } else {
            let newResponse = await getAllRecipes();
            return res.status(200).json(newResponse);
        }
    } catch (error) {
        return res.send('Error: ' + error);
    }
})

module.exports = router;