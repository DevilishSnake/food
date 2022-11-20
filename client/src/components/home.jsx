import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterRecipesByAPIOrDB, filterRecipesByDietType, getDiets, getRecipes, getRecipesByRecipeName, orderRecipesByHealthScore, orderRecipesByRecipeName } from '../redux/actions';
import { Link } from 'react-router-dom';
import  Card  from './Card';
import Loading from "./Loading";
import Pagination from "./Pagination";
import SearchBar from './SearchBar';
import styles from './home.module.css';

import axios from 'axios';

export default function Home () {
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes); //Ver si no lo cambio por .recipes en vez de .allRecipes
    const allDiets = useSelector(state => state.diets);

    //const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage, setRecipesPerPage] = useState(1);

    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    const [pageNumberLimit, setPageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

    const [ordenNombre, setOrdenNombre] = useState('');
    const [ordenHealthScore, setOrdenHealthScore] = useState('');

    //const [recipeToSearch, setRecipeToSearch] = useState('');


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
    }, [dispatch, setCurrentPage]);

    // function handleInputChange(e) {
    //     //e.preventDefault();
    //     setRecipeToSearch(e.target.value);
    //     //e.target.value = recipeToSearch;
    // }

    // function handleSubmit(e) {
    //     e.preventDefault();
    //     dispatch(getRecipesByRecipeName(recipeToSearch));
    //     //setRecipeToSearch('');
    //     setCurrentPage(1);
    // }

    function handleClick(e) {
        e.preventDefault();
        dispatch(getRecipes());
        setCurrentPage(1);
    }

    function handleSortByName(e) {
        e.preventDefault();
        dispatch(orderRecipesByRecipeName(e.target.value));
        setCurrentPage(1);
        setOrdenNombre(`ordenado ${e.target.value}`);
    }

    function handleSortByHealthScore(e) {
        e.preventDefault();
        dispatch(orderRecipesByHealthScore(e.target.value));
        setCurrentPage(1);
        setOrdenHealthScore(`ordenado ${e.target.value}`);
    }

    function handleFilterDiet(e) {
        e.preventDefault();
        setCurrentPage(1);
        dispatch(filterRecipesByDietType(e.target.value));

    }

    function handleFilterDatabase(e) {
        e.preventDefault();
        setCurrentPage(1);
        dispatch(filterRecipesByAPIOrDB(e.target.value));
    }
    return (
        <div className={styles.home}>
            <span className={styles.filler}></span>
            <Link className={styles.crearReceta} to='/recipe'>Crear Receta</Link>
            <h1>My Recipes Website</h1>
            {/* <form action="submit">
                <label htmlFor=''>Buscar receta</label>
                <input type='text' placeholder='Ingrese nombre a buscar...' onChange={e => {handleInputChange(e)}}/>
                <button onClick={e => handleSubmit(e)}>Buscar</button>
            </form> */}
            <SearchBar />
            <button className={styles.reloadButton} onClick={e => { handleClick(e) }}>
                Reload Recipes
            </button>
            <div className={styles.controls}>
                <div>
                    <p>Ordenamientos:</p>
                    <label htmlFor="">Nombre</label>
                    <select className={styles.selectOrder} onChange={e => handleSortByName(e)} name="" id="">
                        <option value="asc">Ascendente</option>
                        <option value="des">Descendente</option>
                    </select>
                    <label htmlFor="">Health score</label>
                    <select className={styles.selectOrder} onChange={e => handleSortByHealthScore(e)} name="" id="">
                        <option value="asc">Ascendente</option>
                        <option value="des">Descendente</option>
                    </select>
                </div>
                <div>
                    <p>Filtros:</p>
                    <label htmlFor=''>Dieta:</label>
                    <select className={styles.selectDiet} onChange={e => handleFilterDiet(e)} name="" id="">
                        <option value='All'>Todas</option>
                        {
                            allDiets && allDiets.map(diet => {
                                return (
                                    <option key={diet.id} value={diet.name}>{diet.name}</option>
                                );
                            })
                        }
                    </select>
                    <label htmlFor=''>Filtrar creados o API:</label>
                    <select className={styles.selectCreadoOAPI} onChange={e => handleFilterDatabase(e)} name="" id="">
                        <option className={styles.optionHover} value="All">Todos</option>
                        <option value="created">Creados</option>
                        <option value="api">API</option>
                    </select>
                </div>
                <span className={styles.filler}></span>
            </div>

            <div className={styles.cartas} >
                {
                    loading? <Loading /> :
                    currentRecipes && currentRecipes.map(recipe => {
                        return (

                            <Link className={styles.carta} to={"/home/" + recipe.id} key={recipe.id}>
                                <Card  title={recipe.title} image={recipe.image} diets={recipe.diets} healthScore={recipe.healthScore}  />
                            </Link>


                        );
                    })
                }
            </div>


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
            <span className={styles.filler}></span>
        </div>
    );

}