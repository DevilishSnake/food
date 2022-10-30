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
        const newResponse = response.data.results.map(data => {
            let instructionsString = "";
            let diets = [];
            data.vegetarian && diets.push('vegetarian');
            data.vegan && diets.push('vegan');
            data.glutenFree && diets.push('gluten free');
            data.dairyFree && diets.push('dairy free');
            if(data.analyzedInstructions.length > 0) {
                data.analyzedInstructions[0].steps.forEach(instruction => {
                    instructionsString = instructionsString + `Paso ${instruction.number}, ${instruction.step}\n`;
                })
            } else {
                instructionsString = "No hay instrucciones para esta receta";
            }
            
            const objRecipe = {
                id: data.id,
                title: data.title,
                dishType: [...data.dishTypes],
                diets: [...diets, ...data.diets],
                image: data.image,
                summary: data.summary,
                healthScore: data.healthScore,
                steps: instructionsString
            }
            objRecipe.diets = objRecipe.diets.filter((item, index) => {
                return objRecipe.diets.indexOf(item) === index;
            });
            return objRecipe;
        });
        return newResponse;

    } else {
        console.log('Entra a name === undefined');
        const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&apiKey=${KEY}`);
        //console.log(response.data.results[0].analyzedInstructions);
        const newResponse = response.data.results.map(data => {
            let instructionsString = "";
            let diets = [];
            data.vegetarian && diets.push('vegetarian');
            data.vegan && diets.push('vegan');
            data.glutenFree && diets.push('gluten free');
            data.dairyFree && diets.push('dairy free');
            if(data.analyzedInstructions.length > 0) {
                data.analyzedInstructions[0].steps.forEach(instruction => {
                    instructionsString = instructionsString + `Paso ${instruction.number}, ${instruction.step}\n`;
                })
            } else {
                instructionsString = "No hay instrucciones para esta receta";
            }
            
            const objRecipe = {
                id: data.id,
                title: data.title,
                dishType: [...data.dishTypes],
                diets: [...diets, ...data.diets],
                image: data.image,
                summary: data.summary,
                healthScore: data.healthScore,
                steps: instructionsString
            }
            objRecipe.diets = objRecipe.diets.filter((item, index) => {
                return objRecipe.diets.indexOf(item) === index;
            });
            return objRecipe;
        });
        return newResponse;
    }
};

const getAllRecipes = async (name = undefined) => {
    console.log('Entra a getAllRecipes')
    const API_recipes = await API_getRecipes(name);
    //Hacer el get a la DB acá, después concatenarlo con los de la API
    console.log('API_recipes es igual a: ' + API_recipes);
    return API_recipes;
}

const API_getRecipe = async (idReceta) => {
    const recipeDetails = await axios.get(`https://api.spoonacular.com/recipes/${idReceta}/information?apiKey=${KEY}`);
    console.log('Detalle de la receta de la API: ' + recipeDetails.data);
    let instructionsString = "";
    if(recipeDetails.data.analyzedInstructions.length > 0) {
        recipeDetails.data.analyzedInstructions[0].steps.forEach(instruction => {
            instructionsString = instructionsString + `Paso ${instruction.number}, ${instruction.step}\n`;
        })
    } else {
        instructionsString = "No hay instrucciones para esta receta";
    }
    let diets = [];
    recipeDetails.data.vegetarian && diets.push('vegetarian');
    recipeDetails.data.vegan && diets.push('vegan');
    recipeDetails.data.glutenFree && diets.push('gluten free');
    recipeDetails.data.dairyFree && diets.push('dairy free');
    const objRecipe = {
        id: recipeDetails.data.id,
        title: recipeDetails.data.title,
        dishType: [...recipeDetails.data.dishTypes],
        diets: [...diets, ...recipeDetails.data.diets],
        image: recipeDetails.data.image,
        summary: recipeDetails.data.summary,
        healthScore: recipeDetails.data.healthScore,
        steps: instructionsString
    };
    objRecipe.diets = objRecipe.diets.filter((item, index) => {
        return objRecipe.diets.indexOf(item) === index;
    });
    return objRecipe;
}

const DB_getRecipe = async (idReceta) => {
    //Buscar la receta en la base por ID y devolver el resultado
}

const getRecipe = async (idReceta) => {
    console.log('Entra a getRecipe');
    if(idReceta.includes('-') === false) {
        const API_recipe = await API_getRecipe(idReceta);
        if(API_recipe !== undefined) return API_recipe;
    } else {
        const DB_recipe = await DB_getRecipe(idReceta);
        if(DB_recipe !== undefined) console.log('DB_recipe: ' + DB_recipe); return DB_recipe;
    }
}


router.get('/', async (req, res) => {
    console.log('Hola mundo desde get de /recipes');
    try {
        if (req.query.name !== undefined) {
            const { name } = req.query;
            let newResponse = await getAllRecipes(name);
            return res.status(200).json(newResponse);
        } else {
            let newResponse = await getAllRecipes();
            console.log(`newResponse de la API sin name en la query: ${newResponse}`);
            return res.status(200).json(newResponse);
        }
    } catch (error) {
        return res.send('Error: ' + error);
    }
})

router.get('/:idReceta', async (req, res) => {
    console.log('Hola mundo desde get de /recipes/idReceta');
    const { idReceta } = req.params;
    try {
        let newResponse = await getRecipe(idReceta);
        
        return res.status(200).json(newResponse);
    } catch (error) {
        return res.send('Error: ' + error);
    }
})

router.post('/', async (req, res) => {
    console.log('Entra al POST de /diets');
    const {title, resume, healthScore, steps, diets} = req.body;

    try {
        const newRecipe = await Recipe.create({
            title: title,
            resume: resume,
            healthScore, healthScore,
            steps: steps
        });
        const dietsFromDB = diets.map(async (diet) => {
            return await Diet.findByPk(diet.id);
        });
        dietsFromDB.forEach(async (diet) => {
            await newRecipe.addDiet(diet, {through: 'recipe_diet'});
        });
        return res.status(200).send(`Recipe ${newRecipe.title} created`);

    } catch (error) {
        return res.status(500).send(`Error: ${error}`);
    }
})


module.exports = router;