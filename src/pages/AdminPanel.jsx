// src/pages/AdminPanel.jsx
import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import { getAllProducts, deleteProduct, addProduct, updateProduct } from '../services/productService';

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    img: '',
    descripcion: '',
    categoria: '',
    stock: ''
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await getAllProducts();
    setProducts(data);
  };

  const handleSave = async () => {
    if (editId) {
      await updateProduct(editId, formData);
    } else {
      await addProduct(formData);
    }
    setShowForm(false);
    setFormData({ nombre: '', precio: '', img: '', descripcion: '' });
    setEditId(null);
    loadProducts();
  };

  const handleEdit = (product) => {
    setFormData(product);
    setEditId(product.id);
    setShowForm(true);
  };

  return (
    <Container className="mt-4">
      <Button variant="primary" onClick={() => setShowForm(true)}>Agregar producto</Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Stock</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map(prod => (
            <tr key={prod.id}>
              <td>{prod.nombre}</td>
              <td>{prod.stock}</td>
              <td>${prod.precio}</td>
              <td>
                <Button size="sm" onClick={() => handleEdit(prod)}>Editar</Button>{' '}
                <Button size="sm" variant="danger" onClick={() => deleteProduct(prod.id).then(loadProducts)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>

      </Table>

      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editId ? 'Editar' : 'Agregar'} producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Nombre</Form.Label>
              <Form.Control value={formData.nombre} onChange={e => setFormData({ ...formData, nombre: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Precio</Form.Label>
              <Form.Control type="number" value={formData.precio} onChange={e => setFormData({ ...formData, precio: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                value={formData.stock}
                onChange={e => setFormData({ ...formData, stock: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Imagen (URL)</Form.Label>
              <Form.Control value={formData.img} onChange={e => setFormData({ ...formData, img: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Descripción</Form.Label>
              <Form.Control value={formData.descripcion} onChange={e => setFormData({ ...formData, descripcion: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Categoría</Form.Label>
              <Form.Select
                value={formData.categoria}
                onChange={e => setFormData({ ...formData, categoria: e.target.value })}
              >
                <option value="">Seleccionar categoría</option>
                <option value="Limpieza Institucional">Limpieza Institucional</option>
                <option value="Herramientas de Limpieza">Herramientas de Limpieza</option>
                <option value="Papeleria">Papeleria</option>
                <option value="Perfumeria">Perfumeria</option>
                <option value="Descartables">Descartables</option>
                <option value="Promos">Promos</option>
              </Form.Select>
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowForm(false)}>Cancelar</Button>
          <Button variant="primary" onClick={handleSave}>Guardar</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminPanel;
