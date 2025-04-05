// src/pages/Login.jsx
import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { signIn } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async e => {
    e.preventDefault();
    try {
      await signIn(email, password);
      navigate('/admin');
    } catch (err) {
      setError('Email o contraseña incorrectos');
    }
  };

  return (
    <Container className="mt-4" style={{ maxWidth: '400px' , paddingTop:'34px' }}>
      <h2>Login operador</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" onChange={e => setEmail(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" onChange={e => setPassword(e.target.value)} required />
        </Form.Group>
        <Button type="submit" variant="primary">Ingresar</Button>
      </Form>
    </Container>
  );
};

export default Login;
