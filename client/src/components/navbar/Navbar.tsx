import React, {FC, MouseEvent, useRef} from 'react';
import './Navbar.scss';
import clsx from "clsx";

interface INavbar {
  className?: string | string[];
  type?: "desktop" | "mobile";
  closeMobile?: () => void
}

const Navbar: FC<INavbar> = ({className, type = "desktop", closeMobile}) => {

  const services_ref = useRef(null);

  function handleClickMenu(event: MouseEvent) {
    event.preventDefault();
    const target = event.target as HTMLLinkElement;
    const block_id = target.getAttribute("href").split('#')[1];
    const block: HTMLElement = document.getElementById(block_id)
    window.scrollTo({
      top: block.offsetTop - 100,
      behavior: "smooth"
    });

    if (type === "mobile") {
      closeMobile();
    }
  }

  if (type === "desktop") {
    return (
      <nav className={clsx(className, "navbar-holder")}>
        <ul className="navbar-holder_menu">
          <li className="navbar-holder_item">
            <a
              href="#services-block"
              className="navbar-holder_item-link"
              onClick={handleClickMenu}
              ref={services_ref}
            >Прайс-лист</a>
          </li>
          <li className="navbar-holder_item">
            <a href="#reviews-block" className="navbar-holder_item-link" onClick={handleClickMenu}>Отзывы</a>
          </li>
          <li className="navbar-holder_item">
            <a href="#advantages-block" className="navbar-holder_item-link" onClick={handleClickMenu}>О нас</a>
          </li>
          <li className="navbar-holder_item">
            <a href="#contacts-block" className="navbar-holder_item-link" onClick={handleClickMenu}>Контакты</a>
          </li>
        </ul>
      </nav>
    );
  } else if (type === "mobile") {
    return (
      <nav className={clsx(className, "navbar-holder-mobile")}>
        <ul className="navbar-holder-mobile_menu">
          <li className="navbar-holder-mobile_item" onClick={handleClickMenu}>
            <a href="#services-block" className="navbar-holder-mobile_item-link"
               onClick={handleClickMenu}>Прайс-лист</a>
          </li>
          <li className="navbar-holder-mobile_item">
            <a href="#reviews-block" className="navbar-holder-mobile_item-link" onClick={handleClickMenu}>Отзывы</a>
          </li>
          <li className="navbar-holder-mobile_item">
            <a href="#text-block-1" className="navbar-holder-mobile_item-link" onClick={handleClickMenu}>О нас</a>
          </li>
          <li className="navbar-holder-mobile_item">
            <a href="#contacts-block" className="navbar-holder-mobile_item-link" onClick={handleClickMenu}>Контакты</a>
          </li>
        </ul>
      </nav>
    )
  }
};

export default Navbar;