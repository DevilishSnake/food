//require('dotenv').config();
//const { Op } = require("sequelize");
//const { KEY } = process.env;
const { Router } = require('express');
const router = Router();
//const axios = require('axios');
const { Recipe, Diet } = require('../db');


router.get('/', async (req, res) => {
    try {
        console.log("Entra a /diets");
        const dietasDB = await Diet.findAll();
        console.log("Hizo findAll a Diet");
        if(dietasDB.length === 0) {
            console.log("No había datos en Diet, procede a crearlas en la DB");
            const dietas = ["gluten free", "ketogenic", "vegetarian", "lacto-vegetarian", "ovo-vegetarian", "vegan", "pescetarian", "paleo", "primal", "low fodmap", "whole30"];
            for (let i = 0; i < dietas.length; i++) {
                console.log(`Intenta crear la Dieta ${i}, la cual es ${dietas[i]}`);
                const dietasGuardadas = await Diet.create({
                    name: dietas[i]
                });
            }
            
            return res.status(200).send("Se guardaron correctamente todas las dietas de spoonacular en la Base de Datos");

        } else {
            return res.status(200).send(dietasDB);
        }
    } catch (error) {
        return res.status(500).send("Could not fetch any Diets");
    }
})

module.exports = router;