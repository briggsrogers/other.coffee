import React from 'react';
import './Header.scss';

import logo from "../../assets/images/oof-logo.png";

function Header() {
  return (
    <div className="Header">
        <div className="Logo">
          <img src={logo} alt=""/>
        </div>
        {/* <div className="Info">i</div> */}
    </div>
  );
}

export default Header;
