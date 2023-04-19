import React, { useState} from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Container } from "@mui/material";
import { useQuery, gql } from "@apollo/client";
import { format, addDays } from "date-fns";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import BasicModal from "./components/myModal";

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

function dateFormatter(date) {
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

const Clients = () => {
  const [openModal, setOpenModal] = useState(false);
  const [tempUserData, setTempUserData] = useState();
  const { loading, error, data } = useQuery(GET_Employees);

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

  return (
    <div>
      {
        <TableContainer component={Paper}>
          <Table aria-label="basic table">
            <TableHead className="tableHeading">
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Designation</TableCell>
                <TableCell>Date of Birth</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.employees.map((employee, index) => (
                <TableRow>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {employee.firstName}
                  </TableCell>
                  <TableCell>{employee.lastName}</TableCell>
                  <TableCell>{employee.designation}</TableCell>
                  <TableCell>{dateFormatter(employee.dateOfBirth)}</TableCell>
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
      }
    </div>
  );
};

export default Clients;
