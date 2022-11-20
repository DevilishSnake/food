import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipesByRecipeName } from "../redux/actions";
import styles from './searchBar.module.css';

export default function SearchBar () {
    const dispatch = useDispatch();
    const [recipeTitle, setRecipeTitle] = useState('');

    function handleInputChange (e) {
        e.preventDefault();
        setRecipeTitle(e.target.value);
        console.log(recipeTitle);
    }
    function handleSubmit (e) {
        e.preventDefault();
        dispatch(getRecipesByRecipeName(recipeTitle));
    }

    return (
        <div>
            <input className={styles.searchInput} type="text" name="" id="" placeholder="Buscar receta..." onChange={e => {handleInputChange(e)}}/>
            <button className={styles.searchButton} type="submit" onClick={e => {handleSubmit(e)}}>Buscar</button>
        </div>
    )
}