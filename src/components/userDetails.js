import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";


const UserDetail = ({ userData }) => {
  console.log("UsreData ==>", userData);

  
  
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
          </TableRow>
        </TableHead>
        <TableBody >
          {userData.map((row) => (
            <TableRow >
              <TableCell component="th" scope="row">
                {row.firstName}
              </TableCell>
              <TableCell>{row.lastName}</TableCell>
              <TableCell>{row.age}</TableCell>
              <TableCell>{row.birthDate}</TableCell>
              <TableCell>{row.company.title}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserDetail;
