import React from 'react';
import './Logo.scss';
import logo_icon from '@/assets/images/logo-icon.png';

const Logo = () => {
    return (
        <a href="/" rel="noreferrer" className="logo-holder">
            <img src={logo_icon} alt="site-logo" className="logo-icon"/>
            <span className="logo-title">FFGlobal</span>
        </a>
    );
};

export default Logo;