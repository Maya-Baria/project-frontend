import React, { useState, useEffect } from "react";
import UserDetail from "./components/userDetails";
import CircularProgress from "@mui/material/CircularProgress";
import { Container } from "@mui/material";
import { useQuery, gql } from "@apollo/client";
import { format, addDays } from 'date-fns'



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
  const myDate = addDays(new Date(date), 1)
  return format(new Date(myDate), "dd-MMM-yyyy")
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
        console.log("Deleted")
      }

      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
}

const Clients = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoding] = useState(true);


  // useEffect(() => {
  //   fetch("https://dummyjson.com/users")
  //     .then((response) => response.json())
  //     .then((result) => {
  //       console.log("Result ==>",result)
  //       setUsers(result.users);
  //       setIsLoding(false);
  //     });
  // },[]);

  const [open, setOpen] = useState(false);
  const [personData, setpersonData] = useState("");
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

  return <div>{users && <UserDetail userData={users}/>}</div>;
};

export default Clients;
