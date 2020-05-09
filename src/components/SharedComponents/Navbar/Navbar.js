import React, { useState } from 'react';
import { ReactComponent as Logo } from '../../styles/logo/logo.svg';
import { Link } from 'react-router-dom';
import { IoIosMenu } from 'react-icons/io';
import { IoMdClose } from 'react-icons/io';
import './navbar.scss';


function Navbar() {

  const [navExpand, setNavExpand] = useState(false);

  const toggleNavExpand = () => {
    setNavExpand(!navExpand)
  }

  return (
    <div className={navExpand ? "navbar-expand" : "navbar"}>
      {!navExpand ? <IoIosMenu className='burger-menu' onClick={toggleNavExpand}/> : <IoMdClose className='burger-menu' onClick={toggleNavExpand} />}
      <ul className="items">
        <li className="link"><Link to="/ingredients">Ingredients</Link></li>
        <li className="link"><Link to="/recipes">Recipes</Link></li>
      </ul>
    </div>
  );
}

export default Navbar;
