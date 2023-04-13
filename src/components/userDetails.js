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

const UserDetail = ({ userData }) => {
  const [openModal, setOpenModal] = useState(false);
  const [tempUserData, setTempUserData] = useState();

  return (
    <TableContainer component={Paper}>
      <Table aria-label="basic table">
        <TableHead className="tableHeading">
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Date of Joining</TableCell>
            <TableCell>Designation</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userData.map((row) => (
            <TableRow>
              <TableCell component="th" scope="row">
                {row.firstName}
              </TableCell>
              <TableCell>{row.lastName}</TableCell>
              <TableCell>{row.age}</TableCell>
              <TableCell>{row.birthDate}</TableCell>
              <TableCell>{row.company.title}</TableCell>
              <TableCell>
                <Button
                  onClick={() => {
                    setOpenModal(!openModal);
                    setTempUserData(row);
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
      />
    </TableContainer>
  );
};

export default UserDetail;
