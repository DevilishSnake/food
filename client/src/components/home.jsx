import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDiets, getRecipes } from '../redux/actions';
import { Link } from 'react-router-dom';
import  Card  from './Card';

export default function Home () {
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes);
    const allDiets = useSelector(state => state.diets);

    useEffect(() => {
        dispatch(getRecipes());
        dispatch(getDiets());
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


            <div className='cartas' >
                {
                    allRecipes && allRecipes.map(recipe => {
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