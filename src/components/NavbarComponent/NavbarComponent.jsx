import React, { useContext, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import CartOffcanvas from '../CartOffcanvas';
import { ShoppingBag } from "lucide-react";
import './NavbarComponent.css';

const NavbarComponent = () => {
    const { cart } = useContext(CartContext);
    const [showCart, setShowCart] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <>
            <nav className="navbar-custom">
                <Container className="navbar-layout">
                    {/* Botón carrito */}
                    <button
                        variant="outline-dark"
                        className="cart-button"
                        onClick={() => setShowCart(true)}
                    >
                        <ShoppingBag size={24} color="#000" />
                        {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
                    </button>

                    {/* Logo central */}
                    <Link to="/" className="logo-center">
                        <h1>
                            <div>LIM</div>
                            <div className='logoAzul'>LOGIC</div>
                        </h1>
                    </Link>

                    {/* Links visibles solo en escritorio */}
                    <div className="nav-links-desktop">
                        <Link to="/">Inicio</Link>
                        <Link to="/productos">Productos</Link>
                        <Link to="/contacto">Contacto</Link>
                    </div>

                    {/* Menú hamburguesa visible solo en mobile */}
                    <div className="hamburger mobile-only" onClick={() => setMenuOpen(!menuOpen)}>
                        <input type="checkbox" checked={menuOpen} readOnly />
                        <svg viewBox="0 0 32 32">
                            <path className="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22" />
                            <path className="line" d="M7 16 27 16" />
                        </svg>
                    </div>
                </Container>

                {/* Dropdown solo en mobile */}
                {menuOpen && (
                    <div className="dropdown-menu-custom mobile-only">
                        <Link to="/" onClick={() => setMenuOpen(false)}>Inicio</Link>
                        <Link to="/productos" onClick={() => setMenuOpen(false)}>Productos</Link>
                        <Link to="/contacto" onClick={() => setMenuOpen(false)}>Contacto</Link>
                    </div>
                )}

                <CartOffcanvas show={showCart} handleClose={() => setShowCart(false)} />
            </nav>
        </>
    );
};

export default NavbarComponent;