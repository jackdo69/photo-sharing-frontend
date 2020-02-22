import React from 'react';

import './Logo.css';

import {NavLink} from 'react-router-dom';

const Logo = () => {
    return ( 
        <div className="logo">
            <NavLink to="/">
            <i className="fas fa-camera-retro"></i>
            </NavLink>
            
            <span className="slogan">Free high quality photos</span>
        </div>
     );
}
 
export default Logo;