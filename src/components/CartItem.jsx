// src/components/CartItem.jsx
import React from 'react';
import { Button, ListGroup } from 'react-bootstrap';

const CartItem = ({ item, onRemove }) => {
  return (
    <ListGroup.Item className="d-flex justify-content-between align-items-center">
      <div>
        {item.name} x {item.quantity}
      </div>
      <img src={item.img} alt="" style={{ width: '50px' }} />

      <div>

      </div>
      <div>
        ${item.price * item.quantity}
        <Button variant="danger" size="sm" onClick={() => onRemove(item.id)} className="ms-2">
          Eliminar
        </Button>
      </div>
    </ListGroup.Item>
  );
};

export default CartItem;
