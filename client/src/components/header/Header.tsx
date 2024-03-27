import React from 'react';
import Navbar from "@/components/navbar/Navbar";
import Logo from "@/components/logo/Logo";
import Container from "@/components/container/Container";
import Button from "@/components/button/Base-button";
import ArrowRight from '@/assets/images/arrow-right.svg';
import './Header.scss';

const Header = () => {
  return (
    <header id="header" className="header">
      <Container>
        <div className="header-holder">
          <Logo/>
          <div className="header-holder_content">
            <Navbar className="header-holder_navbar"/>
            <Button className="header-holder_button btn primary">
              Заказать звонок
              <ArrowRight/>
            </Button>
            <div className="header-holder_burger-menu">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;