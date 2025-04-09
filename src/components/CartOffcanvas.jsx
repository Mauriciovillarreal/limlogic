import { Offcanvas, Button, ListGroup } from 'react-bootstrap';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import CartItem from './CartItem';
import '../styles/Cart.css';

const CartOffcanvas = ({ show, handleClose }) => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Carrito de compras</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {cart.length === 0 ? (
          <p className='msjCartEmpty'>No hay productos en el carrito</p>
        ) : (
          <>
            <div className="cart-content-scroll">
              <ListGroup className="mb-3">
                {cart.map(item => (
                  <CartItem key={item.id} item={item} onRemove={removeFromCart} />
                ))}
              </ListGroup>
            </div>

            <div className="bottomCart">
              <h5>Total: ${total}</h5>
              <Button
                variant="dark"
                onClick={() => {
                  handleClose();
                  navigate('/checkout');
                }}
                className="me-2"
              >
                Terminar compra
              </Button>
              <Button variant="danger" onClick={clearCart}>
                Vaciar carrito
              </Button>
            </div>
          </>
        )}
      </Offcanvas.Body>

    </Offcanvas>
  );
};

export default CartOffcanvas;
