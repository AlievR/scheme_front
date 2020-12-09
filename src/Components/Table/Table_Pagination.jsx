import React, { useState } from 'react'
import './Table.css'

function Table_Pagination({ postsPerPage, totalPosts, paginate }) {
    const [currentPage, setCurrentPage] = useState(1)
    const pageNumber = []
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumber.push(i)
    }


    const checkPaginateNumber = (number) => {
        console.log(number)
        setCurrentPage(number)
        paginate(number)
    }

    const nextPaginateNumber = () => {
        if (currentPage != pageNumber.length) {
            checkPaginateNumber(currentPage + 1)
        }
    }


    const previousPaginateNumber = () => {
        if (currentPage > 1) {
            checkPaginateNumber(currentPage - 1)
        }
    }


    return (
        <nav className="nav__pagination">
            <span className="text__pagination">
                {
                    //доделать после добавления поиска и выбора 
                    currentPage === 1 
                    ? `Showing 1 to ${postsPerPage} of ${totalPosts} entries`
                    : `Showing ${postsPerPage + 1} to ${postsPerPage+postsPerPage} of ${totalPosts} entries`
                }
            </span>
            <ul className="table__pagination">
                <li className="page__item">
                    <button onClick={previousPaginateNumber} className="page__link">
                        Previous
                    </button>
                </li>
                {
                    pageNumber.map(number =>

                        <li key={number} className="page__item">
                            <button onClick={() => checkPaginateNumber(number)}
                                className={(currentPage === number)
                                    ? 'page__link active'
                                    : 'page__link'}
                            >
                                {number}
                            </button>
                        </li>
                    )
                }
                <li className="page__item">
                    <button onClick={nextPaginateNumber}
                        className="page__link">
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    )
}

export default Table_Pagination
