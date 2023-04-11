import React, { useState, useEffect } from "react";
import UserDetail from "./components/userDetails";
import CircularProgress from "@mui/material/CircularProgress";
import { Container } from "@mui/material";

const Clients = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoding] = useState(true);

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((response) => response.json())
      .then((result) => {
        console.log("Result ==>",result)
        setUsers(result.users);
        setIsLoding(false);
      });
  },[]);

  if (isLoading) {
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

  return <div>{users && <UserDetail userData={users} />}</div>;
};

export default Clients;
