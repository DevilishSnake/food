import { GET_RECIPES, GET_RECIPE_DETAILS, GET_RECIPE_BY_RECIPE_NAME, POST_RECIPE, GET_DIETS, FILTER_RECIPES_BY_DIET_TYPE, FILTER_RECIPES_BY_API_OR_CREATED } from "./actions";

const initialState = {
    recipes: [],
    allRecipes: [],
    apiOrDb: "All",
    dietType: "All",
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
        case GET_RECIPE_BY_RECIPE_NAME:
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            }
        case GET_RECIPE_DETAILS:
            return {
                ...state,
                recipeDetails: action.payload
            }
        case GET_DIETS:
            return {
                ...state,
                diets: action.payload
            }
        case FILTER_RECIPES_BY_DIET_TYPE:
            console.log('action.payload en el reducer es: ' + action.payload);
            if (action.payload === 'All') {
                if (state.apiOrDb === 'All') {
                    let allRecipes = state.allRecipes;
                    let filteredRecipes = state.allRecipes;
                    return {
                        ...state,
                        dietType: action.payload,
                        allRecipes: allRecipes,
                        recipes: filteredRecipes
                    }
                } else if (state.apiOrDb === 'created') {
                    let allRecipes = state.allRecipes;
                    let filteredRecipes = state.allRecipes.filter((recipe) => {
                        return recipe.createdInDb;
                    });
                    return {
                        ...state,
                        dietType: action.payload,
                        allRecipes: allRecipes,
                        recipes: filteredRecipes
                    }
                } else if (state.apiOrDb === 'api') {
                    let allRecipes = state.allRecipes;
                    let filteredRecipes = state.allRecipes.filter((recipe) => {
                        return !recipe.createdInDb;
                    });
                    return {
                        ...state,
                        dietType: action.payload,
                        allRecipes: allRecipes,
                        recipes: filteredRecipes
                    }
                }
            } else {
                let allRecipes = state.allRecipes;
                let filteredRecipes = state.allRecipes.filter((recipe) => {
                    console.dir(recipe);
                    console.log(`recipe incluye ${action.payload}? ${recipe.diets.includes(action.payload)}`);
                    return recipe.diets.includes(action.payload);
                });
                console.log(filteredRecipes);
                if (state.apiOrDb === 'All') {
                    return {
                        ...state,
                        dietType: action.payload,
                        allRecipes: allRecipes,
                        recipes: filteredRecipes
                    }
                } else if (state.apiOrDb === 'created') {
                    filteredRecipes = filteredRecipes.filter((recipe) => {
                        return recipe.createdInDb;
                    });
                    return {
                        ...state,
                        dietType: action.payload,
                        allRecipes: allRecipes,
                        recipes: filteredRecipes
                    }
                } else if (state.apiOrDb === 'api') {
                    filteredRecipes = filteredRecipes.filter((recipe) => {
                        return !recipe.createdInDb;
                    });
                    return {
                        ...state,
                        dietType: action.payload,
                        allRecipes: allRecipes,
                        recipes: filteredRecipes
                    }
                }
            }
        case FILTER_RECIPES_BY_API_OR_CREATED:
            console.log('action.payload en el reducer es: ' + action.payload);
            if (action.payload === 'All') {
                if (state.dietType === 'All') {
                    let allRecipes = state.allRecipes;
                    let filteredRecipes = state.allRecipes;
                    return {
                        ...state,
                        apiOrDb: action.payload,
                        allRecipes: allRecipes,
                        recipes: filteredRecipes
                    }
                } else if (state.dietType !== 'All') {
                    let allRecipes = state.allRecipes;
                    let filteredRecipes = state.allRecipes.filter((recipe) => {
                        console.dir(recipe);
                        console.log(`recipe incluye ${state.dietType}? ${recipe.diets.includes(state.dietType)}`);
                        return recipe.diets.includes(state.dietType);
                    });
                    console.log(filteredRecipes);
                    return {
                        ...state,
                        apiOrDb: action.payload,
                        allRecipes: allRecipes,
                        recipes: filteredRecipes
                    }
                }
            } else if (action.payload === 'created') {
                let allRecipes = state.allRecipes;
                let filteredRecipes = state.allRecipes.filter((recipe) => {
                    return recipe.createdInDb;
                });
                if (state.dietType === 'All') {
                    return {
                        ...state,
                        apiOrDb: action.payload,
                        allRecipes: allRecipes,
                        recipes: filteredRecipes
                    }
                } else if (state.dietType !== 'All') {
                    filteredRecipes = filteredRecipes.filter((recipe) => {
                        console.dir(recipe);
                        console.log(`recipe incluye ${state.dietType}? ${recipe.diets.includes(state.dietType)}`);
                        return recipe.diets.includes(state.dietType);
                    });
                    return {
                        ...state,
                        apiOrDb: action.payload,
                        allRecipes: allRecipes,
                        recipes: filteredRecipes
                    }
                }
            } else if (action.payload === 'api') {
                let allRecipes = state.allRecipes;
                let filteredRecipes = state.allRecipes.filter((recipe) => {
                    return !recipe.createdInDb;
                });
                if (state.dietType === 'All') {
                    return {
                        ...state,
                        apiOrDb: action.payload,
                        allRecipes: allRecipes,
                        recipes: filteredRecipes
                    }
                } else if (state.dietType !== 'All') {
                    filteredRecipes = filteredRecipes.filter((recipe) => {
                        console.dir(recipe);
                        console.log(`recipe incluye ${state.dietType}? ${recipe.diets.includes(state.dietType)}`);
                        return recipe.diets.includes(state.dietType);
                    });
                    return {
                        ...state,
                        apiOrDb: action.payload,
                        allRecipes: allRecipes,
                        recipes: filteredRecipes
                    }
                }
            }
        default:
            return state;
    }
}