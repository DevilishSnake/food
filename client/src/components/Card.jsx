import React from 'react';

export default function Card ({image, title, diets}) {
    return (
        <div>
            <h3>{title}</h3>
            <img src={image} alt="Recipe" />
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