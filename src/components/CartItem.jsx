// src/components/CartItem.jsx
import React from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { Trash2 } from 'lucide-react';

const CartItem = ({ item, onRemove }) => {
  return (
    <ListGroup.Item className="d-flex justify-content-between align-items-center">
      <div>
      <img src={item.img} alt="" style={{ width: '40px' }} />
        {item.name} x {item.quantity}
      </div>

      <div>

      </div>
      <div>
        ${item.price * item.quantity}
        <Button variant="danger" size="sm" onClick={() => onRemove(item.id)} className="ms-2">
        <Trash2 size={16} />
        </Button>
      </div>
    </ListGroup.Item>
  );
};

export default CartItem;
