import React from "react";

export default function Pagination({ recipesPerPage, allRecipes, paginado, currentPage, maxPageNumberLimit, setMaxPageNumberLimit, minPageNumberLimit, setMinPageNumberLimit, pageNumberLimit }) {
    const pageNumbers = [];


    for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
        pageNumbers.push(i);
    }

    let diferencia = pageNumbers.length;
    while (diferencia - pageNumberLimit > 0) {
        diferencia = diferencia - pageNumberLimit;
    }

    const handleNextClick = function () {
        paginado(currentPage + 1);

        if (currentPage + 1 > maxPageNumberLimit) {
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    }

    const handlePrevClick = function () {
        paginado(currentPage - 1);

        if((currentPage - 1) % pageNumberLimit === 0) {
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    }

    return (
            <nav>
            <ul className="paginado">
                <li>
                    <button className="prevNext" onClick={() => (currentPage - 1 > 0) && handlePrevClick()/*() => (currentPage - 1 > minPageNumberLimit) && paginado(currentPage - 1)*/}>
                        Prev
                    </button>
                </li>
                {
                    currentPage - pageNumberLimit > 0 && <li><button>...</button></li>
                }
                {
                    pageNumbers && pageNumbers.map((number) => {
                        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
                        return (

                            <li className="number" key={number}>
                                <button className={currentPage === number ? "active" : null} href="" onClick={() => paginado(number)}>{number}</button>
                                {/*Agregarle className={currentPage === number ? "active" : null}*/}
                            </li>

                        )} else {
                            return null;
                        }
                    })
                }
                {
                    currentPage + diferencia <= pageNumbers.length && <li><button>...</button></li>
                }
                <li>
                    <button className="prevNext" onClick={() => (currentPage + 1 <= pageNumbers.length) && handleNextClick()/*() => (currentPage + 1 <= maxPageNumberLimit) && paginado(currentPage + 1)*/}>
                        Next
                    </button>
                </li>
            </ul>
            </nav>
    )
}