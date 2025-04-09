import { useState, useContext } from 'react';
import { Container, Form, ListGroup } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

import '../styles/Checkout.css';
const Checkout = () => {
    const { cart, clearCart } = useContext(CartContext);
    const [envio, setEnvio] = useState('');
    const [pago, setPago] = useState('');
    const navigate = useNavigate();

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const fechaHoy = new Date().toLocaleDateString('es-AR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
    });


    const descontarStock = async () => {
        for (const item of cart) {
            const docRef = doc(db, 'products', item.id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const currentStock = docSnap.data().stock || 0;
                const nuevoStock = Math.max(currentStock - item.quantity, 0);

                await updateDoc(docRef, {
                    stock: nuevoStock
                });
            }
        }
    };


    const handleSubmit = async () => {
        // Guardamos primero el mensaje y la URL
        const productos = cart
            .map(item => `- ${item.name} x${item.quantity} = $${item.price * item.quantity}`)
            .join('\n');
    
        const mensaje = `Hola! Quiero hacer este pedido:\n\n${productos}\n\nTotal: $${total}\n\nMétodo de envío: ${envio}\nMétodo de pago: ${pago}`;
        const url = `https://wa.me/5491140507287?text=${encodeURIComponent(mensaje)}`;
    
        // 👇 Abrimos el WhatsApp primero
        window.open(url, '_blank');
    
        // 👇 Luego descontamos el stock (esto ya no bloquea el popup)
        await descontarStock();
        clearCart();
        navigate('/');
    };
    


    return (
        <div className="checkout">
            <Container style={{ marginTop: '0px' }}>
                <h2>
                    <img src="./img/entreypago.png" alt="" />
                    <div>

                        Entrega y pago
                    </div>
                </h2>

                {cart.length === 0 ? (
                    <p>No hay productos en el carrito</p>
                ) : (
                    <>
                        <h3 className="mt-4">Detalles de mi compra</h3>
                        <div className="mb-4 productos-checkout">
                            {cart.map(item => (
                                <ListGroup.Item key={item.id}>
                                    <div className='detail-checkout'>
                                        <div>
                                            <img src={item.img} alt="" style={{ width: '50px' }} />
                                        </div>
                                        <div className='detail-item'>
                                            {item.name} x{item.quantity}

                                        </div>

                                        <div className='detail-price'>
                                            ${item.price * item.quantity}
                                        </div>
                                    </div>

                                </ListGroup.Item>
                            ))}
                            <h5>Total: ${total}</h5>
                        </div>

                        <Form className="mt-4">
                            <Form.Group className="mb-3">
                                <h3>Entrega</h3>

                                <div>
                                    <div className='container-option'>
                                        <Form.Check
                                            type="radio"
                                            label="Retiras en Lim Logic local"
                                            name="envio"
                                            value="Retiras en Lim Logic local"
                                            onChange={(e) => setEnvio(e.target.value)}
                                        />
                                        <h6>Retira a partir de hoy {fechaHoy}</h6>
                                        <h6>En Dr. Nicolás Repetto 266, Ituzaingó. Provincia de Buenos Aires</h6>
                                        <h6>Horarios de 09hs a 20hs</h6>
                                    </div>
                                    <div className="container-option">

                                        <Form.Check
                                            type="radio"
                                            label="Envío a domicilio"
                                            name="envio"
                                            value="Envío a domicilio"
                                            onChange={(e) => setEnvio(e.target.value)}
                                        />
                                        <h6>Cordinar horarios y precio con el vendedor</h6>
                                    </div>
                                </div>
                            </Form.Group>

                            <Form.Group className="mb-4">
                                <h3>Pago</h3>
                                <div>
                                    <div className="container-option">
                                        <Form.Check
                                            type="radio"
                                            label="Efectivo"
                                            name="pago"
                                            value="Efectivo"
                                            onChange={(e) => setPago(e.target.value)}
                                        />
                                        <h6>Se abona la totalidad en la sucursal o al momento de recivir</h6>
                                    </div>
                                    <div className="container-option">
                                        <Form.Check
                                            type="radio"
                                            label="Mercado Pago"
                                            name="pago"
                                            value="Mercado Pago"
                                            onChange={(e) => setPago(e.target.value)}
                                        />
                                        <h6>Se abona la totalidad en la sucursal</h6>
                                        <h6>O por transferencia</h6>
                                        <h6>Alias: limlogic.mp</h6>
                                        <h6>Enviar comprobante al WhatsApp</h6>
                                    </div>
                                    <div className="container-option">
                                        <Form.Check
                                            type="radio"
                                            label="Tarjeta"
                                            name="pago"
                                            value="Tarjeta"
                                            onChange={(e) => setPago(e.target.value)}
                                        />
                                        <h6>Se abona la totalidad en la sucursal o al momento de recibir</h6>
                                    </div>



                                </div>
                            </Form.Group>

                            <button
                                type="button" 
                               
                                onClick={handleSubmit}
                                disabled={!envio || !pago}
                            >
                                Finalizar pedido
                            </button>

                        </Form>
                    </>
                )}
            </Container>
        </div>

    );
};

export default Checkout;
