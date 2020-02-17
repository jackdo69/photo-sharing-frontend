import React from 'react';

import Logo from './Logo';
import SearchBar from './SearchBar';
import MainNav from './MainNav';

const Header = () => {
    return <div className="header">
        <Logo />
        <SearchBar />
        <MainNav />
    </div>;
}
 
export default Header;