import React from "react";
import styles from './pagination.module.css';

export default function Pagination({ recipesPerPage, allRecipes, paginado, currentPage, maxPageNumberLimit, setMaxPageNumberLimit, minPageNumberLimit, setMinPageNumberLimit, pageNumberLimit }) {
    const pageNumbers = [];


    for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
        pageNumbers.push(i);
    }

    // let diferencia = pageNumbers.length;
    // while (diferencia - pageNumberLimit > 0) {
    //     diferencia = diferencia - pageNumberLimit;
    // }

    const handleNextClick = function () {
        paginado(currentPage + 1);

        // if (currentPage + 1 > maxPageNumberLimit) {
        //     setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
        //     setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        // }
    }

    const handlePrevClick = function () {
        paginado(currentPage - 1);

        // if((currentPage - 1) % pageNumberLimit === 0) {
        //     setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
        //     setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        // }
    }

    return (
        <nav>
            <ul className={styles.paginado}>
                <li className={styles.listItem}>
                    <button className={styles.prevNext} onClick={() => (currentPage - 1 > 0) && handlePrevClick()/*() => (currentPage - 1 > minPageNumberLimit) && paginado(currentPage - 1)*/}>
                        Prev
                    </button>
                </li>
                {/*
                    currentPage - pageNumberLimit > 0 && <li className={styles.listItem}><button className={styles.number}>...</button></li>
    */}
                {
                    pageNumbers && pageNumbers.map((number) => {
                        // if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
                            return (

                                <li className={styles.listItem} key={number}>
                                    <button className={currentPage === number ? styles.active : styles.number} href="" onClick={() => paginado(number)}>{number}</button>
                                    {/*Agregarle className={currentPage === number ? "active" : null}*/}
                                </li>

                            )
                        // } else {
                        //     return null;
                        // }
                    })
                }
                {/*
                    currentPage + diferencia <= pageNumbers.length && <li className={styles.listItem}><button className={styles.number}>...</button></li>
            */}
                <li className={styles.listItem}>
                    <button className={styles.prevNext} onClick={() => (currentPage + 1 <= pageNumbers.length) && handleNextClick()/*() => (currentPage + 1 <= maxPageNumberLimit) && paginado(currentPage + 1)*/}>
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    )
}