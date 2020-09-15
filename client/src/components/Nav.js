import React from 'react';
import { NavLink } from "react-router-dom";
function Nav(){
    return(
        <nav className='Nav'>
            <NavLink exact to='/'
            activeClassName='selected'>
                HOME
            </NavLink>
            <NavLink exact to='/adder'
            activeClassName='selected'>
                Add
            </NavLink>
        </nav>
    )
}
export default Nav;
