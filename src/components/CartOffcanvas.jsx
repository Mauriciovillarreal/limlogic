import { Offcanvas, Button, ListGroup } from 'react-bootstrap';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import CartItem from './CartItem';

const CartOffcanvas = ({ show, handleClose }) => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = () => {
    const message = cart
      .map(item => `- ${item.name} x${item.quantity} = $${item.price * item.quantity}`)
      .join('\n') + `\n\nTotal: $${total}`;

    const url = `https://wa.me/5491140507287?text=${encodeURIComponent('Hola! Quiero hacer este pedido:\n\n' + message)}`;
    window.open(url, '_blank');
  };

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
            <ListGroup className="mb-3">
              {cart.map(item => (
                <CartItem key={item.id} item={item} onRemove={removeFromCart} />
              ))}
            </ListGroup>
            <h5>Total: ${total}</h5>
            <Button variant="success" onClick={handleCheckout} className="me-2">Finalizar pedido</Button>
            <Button variant="secondary" onClick={clearCart}>Vaciar carrito</Button>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CartOffcanvas;
