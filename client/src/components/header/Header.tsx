import React, {useState} from 'react';
import Navbar from "@/components/navbar/Navbar";
import Logo from "@/components/logo/Logo";
import Container from "@/components/container/Container";
import Button from "@/components/button/Base-button";
import ArrowRight from '@/assets/images/arrow-right.svg';
import './Header.scss';
import clsx from "clsx";
import {modalStore} from "@/store/modal-store";

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState<boolean>(false);
  const {setModalForm} = modalStore();

  return (
    <header id="header" className="header">
      <Container>
        <div className="header-holder">
          <Logo/>
          <div className="header-holder_content">
            <a href="tel:+79361360000" className="header-holder_phone">+7 (936) 136-00-00</a>
            <Navbar className="header-holder_navbar"/>
            <Button className="header-holder_button btn primary" onClick={() => setModalForm(true)}>
              Заказать звонок
              <ArrowRight/>
            </Button>
            <div
              className={clsx("header-holder_burger-menu", mobileMenu && "opened")}
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </Container>
      <div id="mobile-menu" className={clsx("mobile-menu", mobileMenu && "opened")}>
        <div className="mobile-menu_close-button" onClick={() => setMobileMenu(false)}>&times;</div>
        <Logo/>
        <Navbar type="mobile" className="mobile-menu_navbar" closeMobile={() => setMobileMenu(false)}/>
      </div>
    </header>
  );
};

export default Header;