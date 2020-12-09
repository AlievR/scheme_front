import React, { useState } from 'react'
import './Table.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddSystem from '../AddSystem/AddSystem'
import { useHttp } from '../../hooks/http.hook'

function Table_menu({ postsPerPage, newPostsPerPage, filterTable }) {

    const [searchName, setSearchName] = useState("")
    const url = "http://localhost:5000/api/systems"

    const { request, error, clearError } = useHttp()

    const handleChangeSelect = (event) => {
        console.log(event.target.value)
        newPostsPerPage(event.target.value)
    }

    const handleKeyPressSearch = (event) => {
        if (event.key == 'Enter') {
            filterTable(searchName)
        }
    }

    const onClickHandlerSearch = () => {
        filterTable(searchName)
    }


    const addSystem = async (request_type, formInfo) => {
        try {
            const data = await request(url, String(request_type), formInfo)
            toast.success(data.message)
        } catch (error) {
            toast.error(error)
        }
    }

    return (
        <div className="table__menu">
            <div className="select__entries">
                <AddSystem PostInfoSystem={addSystem} />
                <div className="select__intro">
                    Show
                    <span >
                        <select
                            className="select__value"
                            value={postsPerPage}
                            onChange={handleChangeSelect}
                        >
                            <option selected value="3">3</option>
                            <option value="5">5</option>
                            <option value="7">7</option>
                            <option value="All">All</option>
                        </select>
                    </span>
                    entries
                </div>
            </div>
            <div className="search__items">
                <div className="search__into" >
                    <div className="search__text">Search:</div>
                    <input
                        className="search__input"
                        type="search"
                        name="search"
                        onChange={(e) => setSearchName(e.target.value)}
                        onKeyPress={handleKeyPressSearch}
                    />
                    <button
                        className="search__btn"
                        type="submit"
                        onClick={onClickHandlerSearch}
                    >
                        <i class="fa fa-search"></i>
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Table_menu
