import React from 'react'
import '../css/System_list.css'
import LongMenu from './LongMenu'


function Scheme_view({ name, createdAt }) {
    return (
        <div className="system_list">
            <div className="container">
                <li class="list-group-item">
                    <div className="system__schemes">
                        <a className="system__link">
                            <span className="system__text"> {name} </span>
                            <span className="system__text"> 52mb </span>
                            <span className="system__text"> {createdAt} </span>
                        </a>
                    </div>
                </li>
            </div>
        </div >
    )
}

export default Scheme_view
