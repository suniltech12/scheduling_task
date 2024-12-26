import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
} from "@mui/material";
import "./Home.css";
import { createUser } from "../service/userApi";

const AddUserPopup = (props) => {
  const { open, setOpen , adminData } = props;

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {
      first_name: "",
      last_name: "",
      email: "",
    };

    if (!formData.first_name) {
      newErrors.first_name = "First Name is required";
    }
    if (!formData.last_name) {
      newErrors.last_name = "Last Name is required";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    setErrors(newErrors);

    return !newErrors.first_name && !newErrors.last_name && !newErrors.email;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const payload = {
          ...formData,
          adminId :adminData.id
        }
        const response = await createUser(payload);
        if(response){
          setOpen(false);
          setFormData({ first_name: "", last_name: "", email: "" });
          setErrors({ first_name: "", last_name: "", email: "" });
        }
      } catch (error) {
        console.error("Error creating user:", error);
      }
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Register User</DialogTitle>
      <DialogContent>
        <FormControl fullWidth className="inputField">
          <Typography mb={1}>First Name</Typography>
          <TextField
            id="first_name"
            name="first_name"
            fullWidth
            autoComplete="off"
            placeholder="Enter Your First Name"
            value={formData.first_name}
            onChange={handleChange}
            error={!!errors.first_name}
            helperText={errors.first_name}
          />
        </FormControl>

        <FormControl fullWidth className="inputField">
          <Typography mb={1}>Last Name</Typography>
          <TextField
            id="last_name"
            name="last_name"
            fullWidth
            autoComplete="off"
            placeholder="Enter Your Last Name"
            value={formData.last_name}
            onChange={handleChange}
            error={!!errors.last_name}
            helperText={errors.last_name}
          />
        </FormControl>

        <FormControl fullWidth className="inputField">
          <Typography mb={1}>Email</Typography>
          <TextField
            id="email"
            name="email"
            fullWidth
            autoComplete="off"
            placeholder="Enter Your Email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Box className="login">
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="success"
            fullWidth
            className="submitButton"
            onClick={handleSubmit}
          >
            Save
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default AddUserPopup;
