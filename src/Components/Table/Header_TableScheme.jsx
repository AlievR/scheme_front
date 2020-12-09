import React from 'react'

function Header_Table({ SortByUp, SortByDown }) {

    const handleByUp = (param) => {
        SortByUp(param)
    }

    const handleByDown = (param) => {
        SortByDown(param)
    }

    return (
        <thead>
            <tr>
                <th className="title__head">
                    <div className="table__sort">
                        <span className="table__tetx"> Наименование файла </span>
                        <div className="sort__vidg">
                            <button className="sort__up" onClick={() => handleByUp('name')}><i class="fas fa-sort-alpha-up-alt"></i></button>
                            <button className="sort__down" onClick={() => handleByDown('name')}><i class="fas fa-sort-alpha-down-alt"></i></button>
                        </div>
                    </div>
                </th>
                <th className="title__head">
                    <span className="table__tetx">Размер</span>
                </th>
                <th className="title__head">
                    <div className="table__sort">
                        <span className="table__tetx">Автор</span>
                        <div className="sort__vidg">
                            <button className="sort__up" onClick={() => handleByUp('owner')}><i class="fas fa-sort-alpha-up-alt"></i></button>
                            <button className="sort__down" onClick={() => handleByDown('owner')}><i class="fas fa-sort-alpha-down-alt"></i></button>
                        </div>
                    </div>
                </th>
                <th className="title__head">
                    <div className="table__sort">
                        <span className="table__tetx">Дата изменения</span>
                        <div className="sort__vidg">
                            <button className="sort__up" onClick={() => handleByUp('updatedAt')}><i class="fas fa-sort-alpha-up-alt"></i></button>
                            <button className="sort__down" onClick={() => handleByDown('updatedAt')}><i class="fas fa-sort-alpha-down-alt"></i></button>
                        </div>
                    </div>
                </th>
                <th className="title__head">
                    <span className="table__tetx">Виджеты</span>
                </th>
            </ tr>
        </thead>
    )
}

export default Header_Table
