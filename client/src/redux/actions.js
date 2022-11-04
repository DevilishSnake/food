export const GET_RECIPES = 'GET_RECIPES';
export const GET_RECIPE_DETAILS = 'GET_RECIPE_DETAILS';
export const POST_RECIPE = 'POST_RECIPE';
export const GET_RECIPE_BY_RECIPE_NAME = 'GET_RECIPE_BY_RECIPE_NAME';

export function getRecipes() {
    return function(dispatch) {
        return fetch('http://localhost:3001/recipes')
        .then(res => res.json())
        .then(objRecipes => dispatch({type: GET_RECIPES, payload: objRecipes}));
    }
}