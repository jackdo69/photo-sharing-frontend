import React from 'react';

import './Logo.css';

import {NavLink} from 'react-router-dom';

const Logo = () => {
    return ( 
        <div className="logo">
            <NavLink to="/">
            <i class="fas fa-camera-retro"></i>
            </NavLink>
            
            <span class="slogan">Free high quality photos</span>
        </div>
     );
}
 
export default Logo;