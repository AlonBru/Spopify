import React from 'react';
import { NavLink } from "react-router-dom";
function Nav(){
    return(
        <nav className='Nav'>
            <NavLink to='/'
            activeClassName='selected'
            isActive={(match,location) => {
                return (
                    location.pathname.slice(1) ==='/home'
                    ||
                    location.pathname.slice(1) === ''
                )
            }}>
                HOME
            </NavLink>
            <NavLink to='/adder'
            activeClassName='selected'>
                Add
            </NavLink>
        </nav>
    )
}
export default Nav;
