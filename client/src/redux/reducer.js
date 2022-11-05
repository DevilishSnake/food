import { GET_RECIPES, GET_RECIPE_DETAILS, GET_RECIPE_BY_RECIPE_NAME, POST_RECIPE, GET_DIETS } from "./actions";

const initialState = {
    recipes: [],
    allRecipes: [],
    recipeDetails: {},
    diets: []
}

export default function reducer (state = initialState, action) {
    switch (action.type) {
        case GET_RECIPES: 
            if (state.recipes.length === 0) {
                return {
                    ...state,
                    recipes: action.payload,
                    allRecipes: action.payload
                }
            } else {
                return {
                    ...state
                }
            }
        case GET_DIETS:
            return {
                ...state,
                diets: action.payload
            }
        default:
            return state;
    }
}