import React from 'react';
import defaultImage from '../resources/genericFoodImage.webp';

export default function Card ({image, title, diets, healthScore}) {
    return (
        
        <div>
            
            <h3>{title}</h3>
            <img src={image? image : defaultImage} alt="Recipe" />
            <p>Health Score: {healthScore}</p>
            <ul>
                { diets && diets.map(diet => {
                    return (
                        <li key={diets.indexOf(diet)}>{diet}</li>
                    )
                })}
            </ul>
            
        </div>
    )
}