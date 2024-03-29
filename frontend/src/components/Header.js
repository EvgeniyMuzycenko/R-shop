import React, { useState } from 'react';
import './Header.css';
import UserBox from './UserBox';
import { FaHome } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaBars } from "react-icons/fa";

function Header({ setPage, setModalBox, token, setToken }) {

  const [isOpen, setOpen] = useState()

  return (
    <div className="Header">
      <div className='logo'><img src="./images/logo.png" alt="" /></div>
      <h1>Магазин ноутбуков <span>R-shop</span></h1>
      <div className={`nav ${isOpen ? 'active' : ''}`}>
        <ul className='nav-list'>
          <li className='nav-item' onClick={() => setPage('Main')}><FaHome size="25" /></li>
          <li className='nav-item' onClick={() => setPage('Basket')}><FaShoppingCart size="25" /></li>
          <UserBox className='nav-item' setModalBox={setModalBox} token={token}
            setToken={setToken} setPage={setPage} />
        </ul>
      </div>
      <button className='menu-btn'
        onClick={() => setOpen(!isOpen)}
      ><FaBars size="25" /></button>
    </div>
  );
}

export default Header;
