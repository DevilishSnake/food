import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDiets, getRecipes } from '../redux/actions';
import { Link } from 'react-router-dom';
import  Card  from './Card';
import Loading from "./Loading";
import Pagination from "./Pagination";

import axios from 'axios';

export default function Home () {
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.allRecipes); //Ver si no lo cambio por .recipes en vez de .allRecipes
    const allDiets = useSelector(state => state.diets);

    //const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage, setRecipesPerPage] = useState(9);

    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    const [pageNumberLimit, setPageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    }


//    useEffect(() => {
//        const fetchRecipes = async () => {
//            setLoading(true);
//            const res = await axios.get('');
//        }
//    })

    useEffect(() => {
        setLoading(true);
        dispatch(getRecipes());
        dispatch(getDiets());
        setLoading(false);
    }, [dispatch]);

    function handleClick(e) {
        e.preventDefault();
        dispatch(getRecipes());
    }

    function handleSortByName(e) {
        e.preventDefault();

    }

    function handleSortByHealthScore(e) {
        e.preventDefault();
    }

    function handleFilterDiet(e) {
        e.preventDefault();

    }

    function handleFilterDatabase(e) {
        e.preventDefault();
    }
    return (
        <div>
            <Link to='/recipe'>Crear Receta</Link>
            <h1>My Recipes Website</h1>
            <button onClick={e => {handleClick(e)}}>
                Reload Recipes
            </button>
            <label htmlFor="">Ordenar por nombre</label>
            <select onChange={e => handleSortByName(e)} name="" id="">
                <option value="asc">Ascendente</option>
                <option value="des">Descendente</option>
            </select>
            <label htmlFor="">Ordenar por health score</label>
            <select onChange={e => handleSortByHealthScore(e)} name="" id="">
                <option value="asc">Ascendente</option>
                <option value="des">Descendente</option>
            </select>
            <select onChange={e => handleFilterDiet(e)} name="" id="">
                {
                allDiets && allDiets.map(diet => {
                    return (
                        <option key={diet.id} value={diet.name}>{diet.name}</option>
                    );
                })
                }
            </select>
            <select onChange={e => handleFilterDatabase(e)} name="" id="">
                <option value="All">Todos</option>
                <option value="created">Creados</option>
                <option value="api">API</option>
            </select>

            <Pagination
                recipesPerPage={recipesPerPage}
                allRecipes={allRecipes.length}
                paginado={paginado}
                currentPage={currentPage}
                maxPageNumberLimit={maxPageNumberLimit}
                setMaxPageNumberLimit={setMaxPageNumberLimit}
                minPageNumberLimit={minPageNumberLimit}
                setMinPageNumberLimit={setMinPageNumberLimit}
                pageNumberLimit={pageNumberLimit}
            />

            <div className='cartas' >
                {
                    loading? <Loading /> :
                    currentRecipes && currentRecipes.map(recipe => {
                        return (

                            <Link to={"/home/" + recipe.id} key={recipe.id}>
                                <Card  title={recipe.title} image={recipe.image} diets={recipe.diets} />
                            </Link>


                        );
                    })
                }
            </div>

        </div>
    );

}