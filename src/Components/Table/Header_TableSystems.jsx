import React from 'react'

function Header_Table({ SortByUp, SortByDown }) {

    const handleByUp = (param) => {
        SortByUp(param)
    }

    const handleByDown = (param) => {
        SortByDown(param)
    }


    return (
        <thead >
            <tr>
                <th className="title__head">
                    <div className="table__sort">
                        <span className="header__text"> Наименование </span>
                        <div className="sort__vidg">
                            <button className="sort__up" onClick={() => handleByUp('name')}><i class="fas fa-sort-alpha-up-alt"></i></button>
                            <button className="sort__down" onClick={() => handleByDown('name')}><i class="fas fa-sort-alpha-down-alt"></i></button>
                        </div>
                    </div>
                </th>
                <th className="title__head">
                    <span className="header__text"> Адрес сети </span>
                </th>
                <th className="title__head">
                    <div className="table__sort">
                        <span className="header__text"> Дата создания </span>
                        <div className="sort__vidg">
                            <button className="sort__up" onClick={() => handleByUp('createdAt')}><i class="fas fa-sort-alpha-up-alt"></i></button>
                            <button className="sort__down" onClick={() => handleByDown('createdAt')}><i class="fas fa-sort-alpha-down-alt"></i></button>
                        </div>
                    </div>
                </th>
                <th className="title__head">
                    <span className="header__text">Виджеты</span>
                </th>
            </ tr>
        </thead>
    )
}

export default Header_Table
