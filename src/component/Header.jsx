import React from 'react';
import { Link } from 'react-router-dom';
import { CgShoppingCart, CgList, CgProfile } from 'react-icons/cg';
import { GrLogin,GrLogout } from 'react-icons/gr';
import "../styles/components/Header.css";

function Header({ state,setUser, user, setState }) {
    const { cart } = state;

    const logOutAction = () => {
        localStorage.setItem('token', null);
        setUser(null);
        setState({
            ...state,cart:[]
        })
    }

    return (
        <div>   
        <div className='Header'>
            <h1 className='Header-title'>
                <Link to="/">
                    PlatziConf Merch
                </Link>
            </h1>
            <ul className='Header-menu'>
                <li><Link to="/orders">
                    <span className='my-orders'>mis compras</span><CgList size="30"/>
                </Link>
                </li>
                <li>
                <Link to="/profile">
                        <span className='my-orders'>mi cuenta</span> <CgProfile size="30"/>
                    </Link>
                </li>
                <li>
                <Link to="/checkout" >
                   <span className='my-orders'>carrito</span> <CgShoppingCart size="30px"/>    
                </Link>
                <div className='Header-checkout'>
                {cart.length > 0 ? <div className='Header-alert'>{cart.length}</div>: <div className='Header-alert-empty'></div>}
            </div>
                </li>
                <li>
                    {(user == null) ? <Link to="/login">
                        <span className='my-orders'>Log in</span> <GrLogin size="30"/>
                    </Link> :<Link to="/" onClick={logOutAction}>
                        <span className='my-orders'>cerrar sesión</span> <GrLogout size="30"/>
                    </Link> }
                </li>
               
            </ul>
        
        </div>
        </div>
    )
}

export default Header