import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Link } from '@mui/material';
import "./AuthForm.css";
import { loginUser } from '../service/userApi';
import { useNavigate } from 'react-router-dom';

const AuthForm = ({setIsLoggedIn}) => {
  const navigator = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = { email: '', password: '' };

    if (!formData.email) {
      newErrors.email = 'Email is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);

    return !newErrors.email && !newErrors.password;
  };

  const handleLogin = async () => {
    if (validateForm()) {
      const result = await loginUser(formData);
      localStorage.setItem('user', JSON.stringify(result));
      localStorage.setItem('token', JSON.stringify(result.token));
      setIsLoggedIn(true);
      navigator('/home')
    }
  };

  return (
    <Box className="addUser">
      <Typography variant="h6" className="form-title">
        Login Admin
      </Typography>
      <form className="addUserForm" onSubmit={(e) => e.preventDefault()}>
        <Box className="inputGroup">
          <TextField
            id="email"
            name="email"
            fullWidth
            autoComplete="email"
            required
            placeholder="Enter Your Email"
            className="inputField"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            id="password"
            name="password"
            type="password"
            fullWidth
            required
            autoComplete="password"
            placeholder="Enter Your Password"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            className="inputField"
          />
          <Button
            variant="contained"
            color="success"
            fullWidth
            className="submitButton"
            onClick={handleLogin}
          >
            Sign In
          </Button>
        </Box>
      </form>
      <Box className="login">
        <Typography variant='body2'>Don't have an account?</Typography>
        <Link href="/register" className="register">
          Register Now
        </Link>
      </Box>
    </Box>
  );
};

export default AuthForm;
