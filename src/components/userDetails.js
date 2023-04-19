import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import BasicModal from "./myModal";

const UserDetail = ({ userData, deleteEmployee }) => {
  const [openModal, setOpenModal] = useState(false);
  const [tempUserData, setTempUserData] = useState();

  return (
    <TableContainer component={Paper}>
      <Table aria-label="basic table">
        <TableHead className="tableHeading">
          <TableRow>
            <TableCell>No.</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Date of Joining</TableCell>
            <TableCell>Designation</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userData.map((employee, index) => (
            <TableRow>
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell component="th" scope="row">
                {employee.firstName}
              </TableCell>
              <TableCell>{employee.lastName}</TableCell>
              <TableCell>{employee.designation}</TableCell>
              <TableCell>{employee.employeeType}</TableCell>
              <TableCell>{employee.currentStatus}</TableCell>
              <TableCell>
                <Button
                  onClick={() => {
                    setOpenModal(!openModal);
                    setTempUserData(employee);
                  }}
                  sx={{
                    mt: 3,
                    mb: 2,
                  }}
                >
                  <DeleteIcon color="primary" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <BasicModal
        open={openModal}
        setOpen={setOpenModal}
        userData={tempUserData}
        deleteUser={deleteEmployee}

      />
    </TableContainer>
  );
};

export default UserDetail;
