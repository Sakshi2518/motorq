import React, { useState } from 'react';
import './Header.css';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const [navSelected, setNavSelected] = useState(location.pathname);

  React.useEffect(() => {
    setNavSelected(location.pathname);
  }, [location.pathname]);

  return (
    <div className='home-nav'>
      <div className='home-nav-logo'>Logo</div>
      <div className='home-nav-el'>
        <Link
          className={navSelected === '/driver-list' ? 'active' : ''}
          to='/driver-list'
        >
          DRIVER LIST
        </Link>
        <Link
          className={navSelected === '/add-driver' ? 'active' : ''}
          to='/add-driver'
        >
          ADD DRIVER
        </Link>
        
      </div>
    </div>
  );
}

export default Header;
