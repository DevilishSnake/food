import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRecipeDetails } from "../redux/actions";
import { useEffect } from "react";
import image from '../resources/genericFoodImage.webp';
import styles from './details.module.css';

export default function Details (props) {
    //console.log(props);
    const id = props.match.params.id;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRecipeDetails(id));
    }, [dispatch]);

    const recipeDetails = useSelector((state) => state.recipeDetails);
    console.dir(recipeDetails);
    return (
        <div className={styles.detailsContainer}>
            <span className={styles.filler}></span>
            <Link className={styles.volver} to='/home'>Volver atrás</Link>
            <h1>Detalles de la receta</h1>
            { recipeDetails.createdInDb? <div> 
                <h2>{recipeDetails.title}</h2>
                <div className={styles.imgPlusSummary}>
                    <img className={styles.img} src={image} alt={recipeDetails.title} />
                    <p>{recipeDetails.resume}</p>
                </div>
                <span className={styles.filler}></span>
                <div className={styles.healthDietDish}>
                <p>Health Score: {recipeDetails.healthScore}</p>
                <ul className={styles.listItems}>
                    Diets:
                    {recipeDetails.diets?.map((diet, index) => {
                        return (
                            <li key={index}>{diet.name}</li>
                        );
                    })}
                </ul>
                <ul className={styles.listItems}>
                    Dish Type:
                    {recipeDetails.dishType?.map((type, index) => {
                        return (
                            <li key={index}>{type}</li>
                        );
                    })}
                </ul>
                </div>
                <span className={styles.filler}></span>
                <div className={styles.steps}>
                    <h3>Pasos a Seguir</h3>
                    <p>{recipeDetails.steps}</p>
                </div>
                <span className={styles.filler}></span>
            </div> :
            <div>
                <h2>{recipeDetails.title}</h2>
                <div className={styles.imgPlusSummary}>
                    <img className={styles.img} src={recipeDetails.image} alt={recipeDetails.title} />
                    <p>{recipeDetails.summary}</p>
                </div>
                <span className={styles.filler}></span>
                <div className={styles.healthDietDish}>
                <p>Health Score: {recipeDetails.healthScore}</p>
                <ul className={styles.listItems}>
                    Diets:
                    {recipeDetails.diets?.map((diet, index) => {
                        return (
                            <li key={index}>{diet}</li>
                        );
                    })}
                </ul>
                <ul className={styles.listItems}>
                    Dish Type:
                    {recipeDetails.dishType?.map((type, index) => {
                        return (
                            <li key={index}>{type}</li>
                        );
                    })}
                </ul>
                </div>
                <span className={styles.filler}></span>
                <div className={styles.steps}>
                    <h3>Pasos a Seguir</h3>
                    <p>{recipeDetails.steps}</p>
                </div>
                <span className={styles.filler}></span>
            </div>
            }
            
        </div>
    )
}