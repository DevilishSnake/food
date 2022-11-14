import axios from "axios";

export const GET_RECIPES = 'GET_RECIPES';
export const GET_RECIPE_BY_RECIPE_NAME = 'GET_RECIPE_BY_RECIPE_NAME';
export const GET_RECIPE_DETAILS = 'GET_RECIPE_DETAILS';
export const GET_DIETS = 'GET_DIETS';
export const POST_RECIPE = 'POST_RECIPE';
export const FILTER_RECIPES_BY_DIET_TYPE = 'FILTER_RECIPES_BY_DIET_TYPE';
export const FILTER_RECIPES_BY_API_OR_CREATED = 'FILTER_RECIPES_BY_API_OR_CREATED';
export const ORDER_RECIPES_BY_RECIPE_NAME = 'ORDER_RECIPES_BY_RECIPE_NAME';
export const ORDER_RECIPES_BY_HEALTH_SCORE = 'ORDER_RECIPES_BY_HEALTH_SCORE';


export function getRecipes() {
    return function(dispatch) {
        return fetch('http://localhost:3001/recipes')
        .then(res => res.json())
        .then(objRecipes => dispatch({type: GET_RECIPES, payload: objRecipes}));
    }
}

export function getRecipesByRecipeName(name) {
    console.log('entra a getRecipesByRecipeName y el name es: ' + name);
    // return function(dispatch) {
    //     try {
    //         return fetch(`http://localhost:3001/recipes?name=${name}`)
    //         .then(res => res.json())
    //         .then(objRecipes => dispatch({type: GET_RECIPE_BY_RECIPE_NAME, payload: objRecipes}));
            
    //     } catch (error) {
    //         console.log('Ocurrió el error: ' + error);
    //     }
    // }
    return async function (dispatch) {
        try {
            let json = await axios.get(`http://localhost:3001/recipes?name=${name}`);
            return dispatch ({
                type: GET_RECIPE_BY_RECIPE_NAME,
                payload: json.data
            })
        } catch (error) {
            console.log('Ocurrió el error: ' + error);
        }
    }
}

export function getRecipeDetails(id) {
    return function(dispatch) {
        return fetch(`http://localhost:3001/recipes/${id}`)
        .then(res => res.json())
        .then(objRecipeDetails => dispatch({type: GET_RECIPE_DETAILS, payload: objRecipeDetails}));
    }
}

export function getDiets() {
    return function(dispatch) {
        return fetch(`http://localhost:3001/diets`)
        .then(res => res.json())
        .then(objDiets => dispatch({type: GET_DIETS, payload: objDiets}));
    }
}

export function postRecipe(recipeToPost) {
    return function(dispatch) {
        return fetch('http://localhost:3001/recipes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                
            },
            body: JSON.stringify(recipeToPost)
        })
        .then(res => res.json())
        .then(response => dispatch({type: POST_RECIPE, payload: response}))
    }
}

export function filterRecipesByDietType(diet) {
    console.log('diet recibido en action: ' + diet);
    return {
        type: FILTER_RECIPES_BY_DIET_TYPE,
        payload: diet
    }
}

export function filterRecipesByAPIOrDB(apiOrDb) {
    console.log('apiOrDb recibido en action: ' + apiOrDb);
    return {
        type: FILTER_RECIPES_BY_API_OR_CREATED,
        payload: apiOrDb
    }
}

export function orderRecipesByRecipeName(ascOrDes) {
    console.log('asc Or desc? ' + ascOrDes);
    return {
        type: ORDER_RECIPES_BY_RECIPE_NAME,
        payload: ascOrDes
    }
}

export function orderRecipesByHealthScore(ascOrDes) {
    console.log('asc Or desc ' + ascOrDes);
    return {
        type: ORDER_RECIPES_BY_HEALTH_SCORE,
        payload: ascOrDes
    }
}
