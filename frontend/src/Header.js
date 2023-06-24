import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";

function Header() {
    const [displayusername, displayusernameupdate] = useState('');
    const [showhome, showhomeupdate] = useState(false);
    const usenavigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        if (location.pathname === '/login' || location.pathname === '/register') {
            showhomeupdate(false);
        } else {
            showhomeupdate(true);
            let username = sessionStorage.getItem('username');
            if (username === '' || username === null) {
                usenavigate('/login');
            } else {
                displayusernameupdate(username);
            }
        }

    }, [location])
  return (
    <div>
            {showhome &&
                <div className="header">

                    <Link to={'/'}>Home</Link>
                    <span style={{ marginLeft: '70%' }}>Welcome <b>{displayusername}</b></span>
                    <Link style={{ float: 'right' }} to={'/login'}>Logout</Link>
                </div>
            }
        </div>
  )
}

export default Header