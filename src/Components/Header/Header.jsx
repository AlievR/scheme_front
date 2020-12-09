import React from 'react';
import './Header.css'


function Header() {
    return (
        <div className="header">
            <div className="header__intro">
                <a className="header__link" href="/">
                    <div className="header__logo">cit-schemes</div>
                    <span className="header__file"><i class="far fa-file"></i></span>
                </a>
            </div>
        </div>
    );
}

export default Header;
