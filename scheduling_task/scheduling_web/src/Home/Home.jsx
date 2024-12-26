import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Paper,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import "./Home.css";
import AddUserPopup from "./AddUserPopup";
import CreateSchedule from "./CreateSchedule";
import { getUserData } from "../service/userApi";
const Home = () => {
  const [rowData, setRowData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [openAddUserPopup, setOpenAddUserPopup] = useState(false);
  const [openSchedulePopup, setOpenSchedulePopup] = useState(false);
  const [adminData, setAdminData] = useState(null);
  const [selectUser, setSelectUser] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      setAdminData(user);
    }
  }, []);
  const getUserList = async()=>{
    const result = await getUserData({adminId :adminData.id})
    setRowData(result);
  }
  useEffect(() => {
    if(adminData && !openAddUserPopup && !openSchedulePopup){
      getUserList()
    }
  }, [adminData,openAddUserPopup,openSchedulePopup]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rowData.map((row) => row.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const createSchedule = () => {
    const selectedUsers = rowData.filter((row) => selected.includes(row.id));
    setSelectUser(selectedUsers);
    setOpenSchedulePopup(true);
  };

  const handleAddUser = () => {
    setOpenAddUserPopup(true);
  };

  return (
    <Grid
      container
      spacing={3}
      justifyContent="center"
      style={{ marginTop: "20px" }}
    >
      <Grid item xs={12} md={8}>
        <Paper sx={{ width: "100%", padding: "20px" }}>
          <Typography
            className="form-title"
            variant="h6"
            gutterBottom
            align="center"
          >
            User Details
          </Typography>

          {/* Add User Button */}
          <Grid
            container
            justifyContent="flex-end"
            gap={2}
            style={{ marginBottom: "10px" }}
          >
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                disabled={selected.length === 0}
                onClick={createSchedule}
              >
                Create Schedule
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddUser}
              >
                Add User
              </Button>
            </Grid>
          </Grid>

          {/* Table */}
          <TableContainer style={{ maxHeight: "400px", overflow: "auto" }}>
            <Table
              sx={{ minWidth: 650 }}
              aria-labelledby="tableTitle"
              size="medium"
            >
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      indeterminate={
                        selected.length > 0 && selected.length < rowData.length
                      }
                      checked={
                        rowData.length > 0 && selected.length === rowData.length
                      }
                      onChange={handleSelectAllClick}
                      inputProps={{
                        "aria-label": "select all users",
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">First Name</TableCell>
                  <TableCell align="center">Last Name</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Is Scheduled</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rowData.map((row) => {
                  const isItemSelected = isSelected(row.id);
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": row.id,
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">{row.first_name}</TableCell>
                      <TableCell align="center">{row.last_name}</TableCell>
                      <TableCell align="center">{row.email}</TableCell>
                      <TableCell align="center">
                        {row.isScheduled
                          ? "Already Scheduled"
                          : "Not Schedule yet"}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
      {openAddUserPopup && (
        <AddUserPopup
          open={openAddUserPopup}
          setOpen={setOpenAddUserPopup}
          adminData={adminData}
        />
      )}
      {openSchedulePopup && (
        <CreateSchedule
          open={openSchedulePopup}
          setOpen={setOpenSchedulePopup}
          adminData={adminData}
          selectUser={selectUser}
        />
      )}
    </Grid>
  );
};

export default Home;
