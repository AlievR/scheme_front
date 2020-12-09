import React, { useState, useRef } from 'react'
import './Table.css'


function TableSheme({ _id, name, fileSrc, size, updatedAt, dowlandScheme, removeScheme, editScheme }) {


    const [clickEdit, setclickEdit] = useState(false)
    const [clickMore, setclickMore] = useState(false)
    const [editText, seteditText] = useState("")

    const date = (updatedAt.replace("T", " ").replace(/\..*/,''))

    const mainRef = useRef(null)

    const onClickHandlerMore = async () => {
        if (clickMore === true) {
            await setclickMore(false)
        }
        else {
            await setclickMore(true)
            mainRef.current.focus()
        }
    }

    const onClickHandlerDowland = () => {
        dowlandScheme(_id, name)
        setclickMore(false)
    }

    const onClickHandlerDelete = () => {
        removeScheme(_id, fileSrc,name)
        setclickMore(false)
    }

    const onClickHandlerEdit = () => {
        setclickEdit(true)
        setclickMore(false)
        seteditText(name)
    }

    const changeHandler = event => {
        seteditText(event.target.value)
    }

    const changeFocus = () => {
        editScheme(_id, editText)
        setclickEdit(false)
    }

    const changeFocusMore = () => {
        setclickMore(false)
    }

    const handleKeyPress = (event) => {
        if (event.key == 'Enter') {
            editScheme(_id, editText)
            setclickEdit(false)
        }
    }

    return (
        <tr key={_id} className="content__items">
            {
                clickEdit === false ?
                    <td className="content__block">
                        <span></span>
                        <span className="table__tetx">{name}</span>
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
                            value={editText} />
                    </td>
            }

            <td className="content__block">
                <span className="table__tetx">{size}</span>
            </td>
            <td className="content__block">
                <span className="table__tetx">Алиев Р.М.</span>
            </td>
            <td className="content__block">
                <span className="table__tetx">{date}</span>
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
                        className="window__more schema">
                        <ul className="list__vidj">
                            <li
                                className="vidj__post"
                                onClick={onClickHandlerDowland}
                            >Скачать</li>
                            <li
                                className="vidj__post"
                                onClick={onClickHandlerEdit}
                            >Переименовать</li>
                            <li
                                className="vidj__post"
                                onClick={onClickHandlerDelete}
                            >Удалить</li>
                        </ul>
                    </div>
                    : false
                }
            </td>
        </tr>

    )
}

export default TableSheme
