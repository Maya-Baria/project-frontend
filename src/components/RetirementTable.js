import React, { useState, useEffect } from "react";
import UserDetail from "./userDetails";
import CircularProgress from "@mui/material/CircularProgress";
import { Container } from "@mui/material";
import { useQuery, gql } from "@apollo/client";
import { getYear, addDays, format } from "date-fns";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const GET_Employees = gql`
  query Employees {
    employees {
      firstName
      lastName
      _id
      dateOfBirth
      designation
      employeeType
      currentStatus
    }
  }
`;

function df(date) {
  const myDate = addDays(new Date(date), 1);
  return format(new Date(myDate), "dd-MMM-yyyy");
}

const deleteEmployee = (id) => {
  const requestBody = {
    query: `
        mutation {
          deleteEmployee(id:"${id}") {
            _id           
          }
        }
      `,
  };

  fetch("http://localhost:4000/graphql", {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error("Failed!");
      }
      if (res.status === 200) {
        console.log("Deleted");
      }

      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const RetirementTable = () => {
  const [open, setOpen] = useState(false);
  const [personData, setpersonData] = useState("");
  const { loading, error, data } = useQuery(GET_Employees);
  const result = data.employees.filter(
    (d) => getYear(new Date(d.dateOfBirth)) < 1997
  );

  if (error) return `Error! ${error.message}`;
  console.log("Data ==>", data);

  if (loading) {
    return (
      <Container
        sx={{
          height: "80vh",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  function dateFormatter(date) {
    const myDate = addDays(new Date(date), 1)
    return format(new Date(myDate), "dd-MMM-yyyy")
  }

  return (
    <div>
      {
        <TableContainer component={Paper}>
          <Table aria-label="basic table">
            <TableHead className="tableHeading">
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Date of Birth</TableCell>
                <TableCell>Designation</TableCell>
               
              </TableRow>
            </TableHead>
            <TableBody>
              {result.map((employee) => (
                <TableRow>
                  <TableCell component="th" scope="row">
                    {employee.firstName}
                  </TableCell>
                  <TableCell>{employee.lastName}</TableCell>
                  <TableCell>{dateFormatter(employee.dateOfBirth)}</TableCell>
                  <TableCell>{employee.designation}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      }
    </div>
  );
};
