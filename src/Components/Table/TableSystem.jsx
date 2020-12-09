import React, { useState, useRef } from 'react'
import './Table.css'
import { Link } from 'react-router-dom'


function TableSystem({ _id, name, gateway, createdAt, removeScheme, editScheme }) {

    const date = (createdAt.replace("T", " ").replace(/\..*/,''))
    const [clickEdit, setclickEdit] = useState(false)
    const [editText, seteditText] = useState({
        name: name, gateway: gateway
    })

    const [clickMore, setclickMore] = useState(false)
    const mainRef = useRef(null)

    const editHandler = () => {
        setclickEdit(true)
    }

    const deleteHandler = () => {
        removeScheme(_id, 'DELETE')
    }

    const changeFocus = () => {
        editScheme(_id, editText)
        setclickEdit(false)
    }

    const changeHandler = event => {
        seteditText(event.target.value)
    }

    const handleKeyPress = (event) => {
        if (event.key == 'Enter') {
            editScheme(_id, editText)
            setclickEdit(false)
        }
    }

    const onClickHandlerMore = async () => {
        if (clickMore === true) {
            await setclickMore(false)
        }
        else {
            await setclickMore(true)
            mainRef.current.focus()
        }
    }

    const changeFocusMore = () => {
        setclickMore(false)
    }

    return (
        <tr key={_id} className="content__items">
            {
                clickEdit === false ?
                    <td className="content__block">
                        <Link
                            className="systems__name"
                            to={{
                                pathname: `/system/${_id}`,
                                name: name,
                                gateway: gateway,
                                createdAt: createdAt
                            }} >
                            <div className="system__icon">
                                <div className="icon__folder" />
                                <span className="table__tetx">{name}</span>
                            </div>
                        </Link>
                    </td>
                    :
                    <td className="content__block">
                        <input
                            autoFocus
                            className="edit__name"
                            type="text"
                            name="name"
                            onBlur={changeFocus}
                            onChange={changeHandler}
                            onKeyPress={handleKeyPress}
                            value={editText.name} />
                    </td>
            }

            <td className="content__block">
                <Link
                    className="systems__name"
                    to={{
                        pathname: `/system/${_id}`,
                        name: name,
                        gateway: gateway,
                        createdAt: createdAt
                    }} >
                    <span className="table__tetx">{gateway}</span>
                </Link>
            </td>
            <td className="content__block">
                <Link
                    className="systems__name"
                    to={{
                        pathname: `/system/${_id}`,
                        name: name,
                        gateway: gateway,
                        createdAt: createdAt
                    }} >
                    <span className="table__tetx">{date}</span>
                </Link>
            </td>
            <td className="content__block">
                <span
                    onClick={onClickHandlerMore}
                    className="icon__more" />
                {clickMore === true
                    ?
                    <div
                        ref={mainRef}
                        tabIndex="1"
                        onBlur={changeFocusMore}
                        className="window__more systems">
                        <ul className="list__vidj">
                            <li
                                className="vidj__post"
                                onClick={editHandler}
                            >Переименовать</li>
                            <li
                                className="vidj__post"
                                onClick={deleteHandler}
                            >Удалить</li>
                        </ul>
                    </div>
                    : false
                }
            </td>
        </tr>
    )
}

export default TableSystem
