import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { postRecipe } from '../redux/actions';
import { getDiets } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import styles from './recipe.module.css';

export default function Recipe() {
    const dispatch = useDispatch();
    const diets = useSelector((state) => state.diets);
    const history = useHistory();
    console.log(diets);

    const [input, setInput] = useState({
        title: '',
        resume: '',
        healthScore: 0,
        steps: '',
        diets: []
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(getDiets());
    }, [dispatch]);
    //     alert('Recipe created!');
    //         setInput({
    //             title: '',
    //             resume: '',
    //             healthScore: 0,
    //             steps: '',
    //             diets: []
    //         });

    //    history.push('/home');
    function handleInputChange(e) {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
    }

    // function handleSelect(e) {
    //     e.preventDefault();
    //     if (e.target.value !== '---') {
    //         setInput({
    //             ...input,
    //             diets: [...input.diets, e.target.value]
    //         });
    //         setErrors(validate({
    //             ...input,
    //             diets: [...input.diets, e.target.value]
    //         }));
    //     }
    // }

    function handleCheckBoxChange(e) {
        
        if(e.target.checked) {
            if(!input.diets.includes(e.target.value)) {
                setInput({
                    ...input,
                    diets: [...input.diets, e.target.value]
                });
                setErrors(validate({
                    ...input,
                    diets: [...input.diets, e.target.value]
                }));
            }
        } else if (!e.target.checked) {
            setInput({
                ...input,
                diets: input.diets.filter(diet => {
                    return diet !== e.target.value
                })
            });
            setErrors(validate({
                ...input,
                diets: input.diets.filter(diet => {
                    return diet !== e.target.value
                })
            }));
        }
    }

    function validate(inputToValidate) {
        let errors = {};
        if (inputToValidate.title === '') {
            errors.title ?
            errors.title = errors.title + " Recipe name must not be empty," :
            errors.title = " Recipe name must not be empty,";
        }
        if (/^\d+$/.test(inputToValidate.title)) {
            errors.title ?
            errors.title = errors.title + " Recipe name must not contain only numbers," :
            errors.title = " Recipe name must not contain only numbers,";
        }
        if (inputToValidate.resume === '') {
            errors.resume ? 
            errors.resume = errors.resume + " Recipe summary must not be empty," :
            errors.resume = " Recipe summary must not be empty,";
        }
        if (/^\d+$/.test(inputToValidate.resume)) {
            errors.resume ?
            errors.resume = errors.resume + " Recipe summary must not contain only numbers," :
            errors.resume = " Recipe summary must not contain only numbers,";
        }
        if (!/^\d+$/.test(inputToValidate.healthScore)) {
            errors.healthScore ? 
            errors.healthScore = errors.healthScore + " Recipe's Health Score must contain only numbers," : 
            errors.healthScore = " Recipe's Health Score must contain only numbers,";
        }
        if (inputToValidate.healthScore < 0 || inputToValidate.healthScore > 100) {
            errors.healthScore ?
            errors.healthScore = errors.healthScore + " Recipe's Health Score must be a number equal to or above 0 and equal to or below 100," :
            errors.healthScore = " Recipe's Health Score must be a number equal to or above 0 and equal to or below 100,";
        }
        if (inputToValidate.steps === '') {
            errors.steps ?
            errors.steps = errors.steps + " Steps must not be empty," : 
            errors.steps = " Steps must not be empty,";
        }
        if (/^\d+$/.test(inputToValidate.steps)) {
            errors.steps ?
            errors.steps = errors.steps + " Steps must not contain only numbers," : 
            errors.steps = " Steps must not contain only numbers,";
        }
        if (inputToValidate.diets.length === 0) {
            errors.diets ? 
            errors.diets = errors.diets + " You must select at least one diet type," :
            errors.diets = " You must select at least one diet type,";
        }
        return errors;
    }


    function handleSubmit(e) {
        e.preventDefault();
        if (Object.keys(errors).length > 0) {
            alert('Please, verify the provided information');
        } else if (!input.title || !input.resume || input.healthScore === '' || !input.steps || input.diets.length === 0) {
            alert('Please, complete all fields before submitting');
        } else {
            dispatch(postRecipe(input));
            alert('Recipe created!');
            setInput({
                title: '',
                resume: '',
                healthScore: 0,
                steps: '',
                diets: []
            });

            history.push('/home');
        }
    }
    return (
            <div className={styles.container}>
                <span className={styles.filler}></span>
                <Link className={styles.button} to='/home'>Volver atrás...</Link>
                <h1>Creación de nueva receta</h1>
                <form>
                    <div className={styles.form}>
                        <label htmlFor="">Título</label>
                        <input className={styles.input} placeholder="Título de la receta..." type="text" value={input.title} name='title' onChange={(e) => handleInputChange(e)}/>
                        {errors.title && <span className={styles.error}>*{errors.title}</span>}
                        <label htmlFor="">Resumen</label>
                        <input className={styles.input} placeholder="Resumen de la receta..." type="text" value={input.resume} name='resume' onChange={(e) => handleInputChange(e)}/>
                        {errors.resume && <span className={styles.error}>*{errors.resume}</span>}
                        <label htmlFor="">Health Score</label>
                        <input className={styles.input} placeholder="0 a 100" type="number" value={input.healthScore} name='healthScore' onChange={(e) => handleInputChange(e)} />
                        {errors.healthScore && <span className={styles.error}>*{errors.healthScore}</span>}
                        <label htmlFor="">Pasos</label>
                        <textarea className={styles.inputArea} placeholder="Pasos a seguir..." value={input.steps} name='steps' onChange={(e) => handleInputChange(e)} />
                        {errors.steps && <span className={styles.error}>*{errors.steps}</span>}
                        {/* <select className={styles.input} name="" id="" onChange={(e) => {handleSelect(e)}}>
                            <option value='---'>---</option>
                            {diets?.map((diet, index) => {
                                return (
                                    <option key={index} value={diet.name}>{diet.name}</option>
                                )
                            })}
                        </select> */}
                        
                        {diets?.map((diet, index) => {
                            return (
                                <div key={index}>
                                    <input type="checkbox" value={diet.name} id={diet.name} onChange={(e) => {handleCheckBoxChange(e)}} />
                                    <label  htmlFor={diet.name}>{diet.name}</label>
                                </div>
                            )
                        })}
                        {errors.diets && <span className={styles.error}>*{errors.diets}</span>}

                        <p>Dietas: {input.diets.map((dieta) => {
                            return `${dieta}, `;
                        })}</p>
                        <span className={styles.filler}></span>
                        <span className={styles.filler}></span>
                        <button className={styles.button} onClick={(e) => {handleSubmit(e)}}>Crear Receta</button>
                    </div>
                </form>
                <span className={styles.filler}></span>
            </div>
    )
}