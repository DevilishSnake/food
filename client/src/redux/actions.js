export const GET_RECIPES = 'GET_RECIPES';
export const GET_RECIPE_BY_RECIPE_NAME = 'GET_RECIPE_BY_RECIPE_NAME';
export const GET_RECIPE_DETAILS = 'GET_RECIPE_DETAILS';
export const GET_DIETS = 'GET_DIETS';
export const POST_RECIPE = 'POST_RECIPE';
export const FILTER_RECIPES_BY_DIET_TYPE = 'FILTER_RECIPES_BY_DIET_TYPE';
export const FILTER_RECIPES_BY_API_OR_CREATED = 'FILTER_RECIPES_BY_API_OR_CREATED';


export function getRecipes() {
    return function(dispatch) {
        return fetch('http://localhost:3001/recipes')
        .then(res => res.json())
        .then(objRecipes => dispatch({type: GET_RECIPES, payload: objRecipes}));
    }
}

export function getRecipesByRecipeName(name) {
    return function(dispatch) {
        return fetch(`http://localhost:3001/recipes?name=${name}`)
        .then(res => res.json())
        .then(objRecipes => dispatch({type: GET_RECIPE_BY_RECIPE_NAME, payload: objRecipes}));
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

