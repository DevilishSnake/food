import React from 'react';
import defaultImage from '../resources/genericFoodImage.webp';
import styles from './card.module.css';

export default function Card ({image, title, diets, healthScore}) {
    return (

        <div className={styles.card}>
            <div className={styles.titlePlusImage}>


                <h3 className={styles.cardTitle}>{title}</h3>
                <img className={styles.image} src={image ? image : defaultImage} alt="Recipe" />
            </div>
            <div className={styles.info}>
                <span className={styles.filler}></span>
                <p>Health Score: {healthScore}</p>
                <span className={styles.filler}></span>
                <p>Diets:</p>
                <ul className={styles.listaNombres}>
                    {diets && diets.map(diet => {
                        return (
                            <li className={styles.dietNames} key={diets.indexOf(diet)}>{diet}</li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}