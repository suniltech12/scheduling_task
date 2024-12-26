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
import { createScheduleTask } from "../service/userApi";

const CreateSchedule = (props) => {
  const { open, setOpen, adminData, selectUser  } = props;
  console.log("selectUser",selectUser)
  const [scheduleData, setScheduleData] = useState({
    date: "",
    time: "",
    comment: "",
  });

  const [errors, setErrors] = useState({
    date: "",
    time: "",
    comment: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setScheduleData({
      ...scheduleData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {
      date: "",
      time: "",
      comment: "",
    };

    if (!scheduleData.date) {
      newErrors.date = "Date is required";
    }
    if (!scheduleData.time) {
      newErrors.time = "Time is required";
    }
    if (!scheduleData.comment) {
      newErrors.comment = "Comment is required";
    }

    setErrors(newErrors);

    return !newErrors.date && !newErrors.time && !newErrors.comment;
  };

  const handleSubmit = async() => {
    if (validateForm()) {
        const userId = selectUser.map(elem=>elem.id)
        const payload = {
        ...scheduleData,
        adminId :adminData.id,
        userIds:userId
        }
      const responce = await createScheduleTask(payload)
      if(responce){
        setScheduleData({ date: "", time: "", comment: "" });
        setErrors({ date: "", time: "", comment: "" });
        setOpen(false);
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create Schedule</DialogTitle>
      <DialogContent>
        {/* Date Field */}
        <FormControl fullWidth className="inputField">
          <Typography mb={1}>Date</Typography>
          <TextField
            id="date"
            name="date"
            type="date"
            value={scheduleData.date}
            onChange={handleInputChange}
            error={!!errors.date}
            helperText={errors.date}
            fullWidth
            autoComplete="off"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>

        {/* Time Field */}
        <FormControl fullWidth className="inputField">
          <Typography mb={1}>Time</Typography>
          <TextField
            id="time"
            name="time"
            type="time"
            value={scheduleData.time}
            onChange={handleInputChange}
            error={!!errors.time}
            helperText={errors.time}
            fullWidth
            autoComplete="off"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>

        {/* Comment Field */}
        <FormControl fullWidth className="inputField">
          <Typography mb={1}>Comment</Typography>
          <TextField
            id="comment"
            name="comment"
            value={scheduleData.comment}
            onChange={handleInputChange}
            error={!!errors.comment}
            helperText={errors.comment}
            fullWidth
            autoComplete="off"
            variant="outlined"
            multiline
            rows={4}
            placeholder="Enter your comments or message"
          />
        </FormControl>
      </DialogContent>

      <DialogActions>
        <Box className="login">
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="success"
            className="submitButton"
          >
            Save
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default CreateSchedule;
