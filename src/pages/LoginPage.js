import React, { useState } from 'react';
import axios from 'axios';
import URL from '../services/ip';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form, Button, Alert } from 'react-bootstrap';
import './LoginPage.scss';
import BackgroundImage from '../assets/background.png'; // Đường dẫn tới ảnh nền
import Logo from '../images/logo.png';


const LoginPage = () => {
  const [inputUsername, setInputUsername] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${URL}/api/auth/login_admin/`, {
        username: inputUsername,
        password: inputPassword,
      });
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      localStorage.setItem('username', inputUsername);
      localStorage.setItem('roles', JSON.stringify(response.data.roles));
      window.location.href = '/home'; 
    } catch (error) {
      setShow(true);
      toast.error('Login failed: ' + (error.response?.data?.detail || 'Invalid credentials'));
    } finally {
      setLoading(false);
    }
  };

  const handlePassword = () => {
    toast.info("Password recovery isn't available right now.");
  };

  return (
    <div
      className="sign-in__wrapper"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      {/* Overlay */}
      <div className="sign-in__backdrop"></div>
      {/* Form */}
      <Form className="shadow p-4 bg-white rounded" onSubmit={handleLogin}>
        {/* Header */}
        <img
          className="img-thumbnail mx-auto d-block mb-2"
          src={Logo}
          alt="logo"
        />
        <div className="h4 mb-2 text-center">Sign In</div>
        {/* Alert */}
        {show ? (
          <Alert
            className="mb-2"
            variant="danger"
            onClose={() => setShow(false)}
            dismissible
          >
            Incorrect username or password.
          </Alert>
        ) : (
          <div />
        )}
        <Form.Group className="mb-2" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={inputUsername}
            placeholder="Username"
            onChange={(e) => setInputUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={inputPassword}
            placeholder="Password"
            onChange={(e) => setInputPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="checkbox">
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group>
        {!loading ? (
          <Button className="w-100" variant="primary" type="submit">
            Log In
          </Button>
        ) : (
          <Button className="w-100" variant="primary" type="submit" disabled>
            Logging In...
          </Button>
        )}
        <div className="d-grid justify-content-end">
          <Button
            className="text-muted px-0"
            variant="link"
            onClick={handlePassword}
          >
            Forgot password?
          </Button>
        </div>
      </Form>
      {/* Footer */}
      <div className="w-100 mb-2 position-absolute bottom-0 start-50 translate-middle-x text-white text-center">
        Made by KaiO | &copy;2024
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
