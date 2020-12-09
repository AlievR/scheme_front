import React, { useState } from 'react'
import './AddSystem.css'


function AddSystem({ PostInfoSystem }) {
    const [Score, SetScore] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [form, setForm] = useState({
        name: '', gateway: ''
    })

    const OpenForm = () => {
        SetScore(true)
    }

    const CloseForm = () => {
        SetScore(false)
    }


    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const addForm = () => {
        PostInfoSystem('POST', { ...form })
        SetScore(false)
    }

    return (
        <div className="menu_system">
            <button onClick={OpenForm} className="add__btn">
                Добавить новую ИС
            </button>
            {
                Score ?
                    <div className="system__create">
                        <div className="system__info">
                            <span className="system__title">
                                Добавление новой ИС
                            </span>

                            <span onClick={CloseForm} className="system__close"></span>
                        </div>

                        <form className="Form__system">
                            <ul className="group__items">
                                <li>
                                    <input
                                        className="system__name"
                                        type="text"
                                        name="name"
                                        placeholder="Наименование ИС"
                                        onChange={changeHandler}
                                        value={form.name} />
                                </li>
                                <li>
                                    <input className="system__name"
                                        type="text"
                                        name="gateway"
                                        placeholder="Сеть"
                                        onChange={changeHandler}
                                        value={form.gateway} />
                                </li>
                                <li>
                                    <button className="system__btn"
                                        type="submit"
                                        onClick={addForm}
                                    > Добавить </button>
                                </li>
                            </ul>
                        </form>
                    </div>
                    : false
            }
        </div>
    )
}

export default AddSystem
