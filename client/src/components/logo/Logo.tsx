import React, {FC} from 'react';
import './Logo.scss';
import logo_icon from '@/assets/images/logo-icon.png';
import clsx from "clsx";

interface ILogoProps {
  className?: string;
}

const Logo: FC<ILogoProps> = ({className}) => {
  return (
    <a href="/" rel="noreferrer" className={clsx("logo-holder", className)}>
      <img src={logo_icon} alt="site-logo" className="logo-icon"/>
      <span className="logo-title">FFGlobal</span>
    </a>
  );
};

export default Logo;