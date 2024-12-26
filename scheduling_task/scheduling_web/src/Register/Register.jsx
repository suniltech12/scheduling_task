import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Link } from '@mui/material';
import "./Register.css";
import { registerUser } from '../service/userApi';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigator = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    first_name: '',
    last_name: '',
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
    const newErrors = { username: '', first_name: '', last_name: '', email: '', password: '' };

    if (!formData.username) {
      newErrors.username = 'Username is required';
    }
    if (!formData.first_name) {
      newErrors.first_name = 'First Name is required';
    }
    if (!formData.last_name) {
      newErrors.last_name = 'Last Name is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);

    return !newErrors.username && !newErrors.first_name && !newErrors.last_name && !newErrors.email && !newErrors.password;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await registerUser(formData);
         if(response){
          navigator('/login')
         }
      } catch (error) {
        console.error('Error registering user:', error);
      }
    }
  };

  return (
    <Box className="addUser">
      <Typography variant="h6" className="form-title">
        Register Admin
      </Typography>
      <form className="addUserForm" onSubmit={handleSubmit}>
        <Box className="inputGroup">
          <TextField
            id="username"
            name="username"
            fullWidth
            autoComplete="off"
            placeholder="Enter Your Username"
            className="inputField"
            value={formData.username}
            onChange={handleChange}
            error={!!errors.username}
            helperText={errors.username}
          />
          <TextField
            id="first_name"
            name="first_name"
            fullWidth
            autoComplete="off"
            placeholder="Enter Your First Name"
            className="inputField"
            value={formData.first_name}
            onChange={handleChange}
            error={!!errors.first_name}
            helperText={errors.first_name}
          />
          <TextField
            id="last_name"
            name="last_name"
            fullWidth
            autoComplete="off"
            placeholder="Enter Your Last Name"
            className="inputField"
            value={formData.last_name}
            onChange={handleChange}
            error={!!errors.last_name}
            helperText={errors.last_name}
          />
          <TextField
            id="email"
            name="email"
            fullWidth
            autoComplete="off"
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
            autoComplete="off"
            placeholder="Enter Your Password"
            className="inputField"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />
          <Button
            type="submit"
            variant="contained"
            color="success"
            fullWidth
            className="submitButton"
          >
            Sign Up
          </Button>
        </Box>
      </form>
      <Box className="login">
        <Typography variant='body2'>Already have an account?</Typography>
        <Link href="/login" className="register">
          Sign In
        </Link>
      </Box>
    </Box>
  );
};

export default Register;
