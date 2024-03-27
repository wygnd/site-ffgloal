import React, {FC} from 'react';
import {Link} from "react-router-dom";
import './Navbar.scss';
import clsx from "clsx";

interface INavbar {
  className?: string | string[]
}

const Navbar: FC<INavbar> = ({className}) => {
  return (
    <nav className={clsx(className, "navbar-holder")}>
      <ul className="navbar-holder_menu">
        <li className="navbar-holder_item">
          <Link to="#" className="navbar-holder_item-link">Прайс-лист</Link>
        </li>
        <li className="navbar-holder_item">
          <Link to="#" className="navbar-holder_item-link">Услуги</Link>
        </li>
        <li className="navbar-holder_item">
          <Link to="#" className="navbar-holder_item-link">Отзывы</Link>
        </li>
        <li className="navbar-holder_item">
          <Link to="#" className="navbar-holder_item-link">О нас</Link>
        </li>
        <li className="navbar-holder_item">
          <Link to="#" className="navbar-holder_item-link">Контакты</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;