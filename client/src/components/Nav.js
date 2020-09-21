import logo from '../icons/spopify_logo.svg'
import React from 'react';
import { NavLink } from "react-router-dom";
function Nav(){
    return(
        <nav className='Nav'>
            <img id='logo' src={logo} />
            <span>
            <strong style={{fontSize:'x-large'}}>⌂ </strong>
            <NavLink to='/'
            activeClassName='selected'
            isActive={(match,location) => {
                return (
                    location.pathname.slice(1) === ''
                )
            }}>
                 HOME
            </NavLink>
            </span>
            <span>
            <strong style={{fontSize:'x-large'}}>+ </strong>
            <NavLink to='/adder'
            activeClassName='selected'>
                 Add
            </NavLink>
            </span>
        </nav>
    )
}
export default Nav;
