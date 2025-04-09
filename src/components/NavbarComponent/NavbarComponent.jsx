import React, { useContext, useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import CartOffcanvas from '../CartOffcanvas';
import { ShoppingBag } from "lucide-react";
import './NavbarComponent.css';

const NavbarComponent = () => {
    const { cart } = useContext(CartContext);
    const [showCart, setShowCart] = useState(false);

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <>
            <Navbar expand="lg" className="navbar-custom fixed-top">
                <Container>
                    <div className="navbar-layout">
                        <button
                            variant="outline-dark"
                            className="cart-button"
                            onClick={() => setShowCart(true)}
                        >
                            <ShoppingBag size={24} color="#000" />

                            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
                        </button>


                        <Navbar.Brand as={Link} to="/" className="logo-center">
                            <h1>
                                <div>
                                    LIM
                                </div>
                                <div className='logoAzul'>
                                    LOGIC
                                </div>
                            </h1>
                        </Navbar.Brand>

                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    </div>


                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav>
                            <Nav.Link as={Link} to="/nosotros">Nosotros</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <CartOffcanvas show={showCart} handleClose={() => setShowCart(false)} />
        </>
    );
};

export default NavbarComponent;
