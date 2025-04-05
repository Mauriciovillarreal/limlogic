// src/pages/Cart.jsx
import React, { useContext } from 'react';
import { Container, ListGroup, Button } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';
import CartItem from '../components/CartItem';

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = () => {
    const message = cart
      .map(item => `- ${item.name} x${item.quantity} = $${item.price * item.quantity}`)
      .join('\n') + `\n\nTotal: $${total}`;

    const url = `https://wa.me/549XXXXXXXXXX?text=${encodeURIComponent('Hola! Quiero hacer este pedido:\n\n' + message)}`;
    window.open(url, '_blank');
  };

  return (
    <Container className="mt-4">
      <h2>Tu carrito</h2>
      {cart.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <>
          <ListGroup className="mb-3">
            {cart.map(item => (
              <CartItem key={item.id} item={item} onRemove={removeFromCart} />
            ))}
          </ListGroup>
          <h4>Total: ${total}</h4>
          <Button variant="success" onClick={handleCheckout} className="me-2">Finalizar pedido por WhatsApp</Button>
          <Button variant="secondary" onClick={clearCart}>Vaciar carrito</Button>
        </>
      )}
    </Container>
  );
};

export default Cart;
