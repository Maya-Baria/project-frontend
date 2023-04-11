import { Box, Button, Stack, TextField } from "@mui/material";
import * as React from "react";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/joy";


const ClientDetail = () => {
  const handleSubmit = (event) => {
    event.preventDefault();

    const Data = new FormData(event.currentTarget);
    console.log({
      firstname: Data.get("firstname"),
      lastname: Data.get("lastname"),
      age: Data.get("age"),
      date: Data.get("date"),
      designation: Data.get("designation"),
      role: Data.get("role"),
    });
  };
  

  return (
    <Container sx={{ alignItems: "center", flexGrow: 1 }}>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container>
          <Stack direction="row" spacing={3}>
            <Grid>
              <Stack spacing={3}>
                <TextField
                  id="firstname"
                  name="firstname"
                  label="First Name"
                  type="string"
                ></TextField>
                <TextField
                  id="lastname"
                  name="lastname"
                  label="Last Name"
                  type="string"
                ></TextField>
                <TextField
                  id="age"
                  name="age"
                  label="Age"
                  type="number"
                ></TextField>
              </Stack>
            </Grid>

            <Grid>
              <Stack spacing={3}>
                <TextField
                  id="date"
                  name="date"
                  type="date"
                ></TextField>

                <TextField
                  id="designation"
                  name="designation"
                  label="Designation"
                  type="string"
                ></TextField>

                <Select
                  id="role"
                  name="role"
                  placeholder="Role"
                  sx={{ width: 230, height: 50 }}
                >
                  <Option value="full-time" name="full-time">
                    Full Time
                  </Option>
                  <Option value="Part-time" name="part-time">
                    Part Time
                  </Option>
                  <Option value="intern" name="intern">
                    Intern
                  </Option>
                </Select>
              </Stack>
            </Grid>
          </Stack>
        </Grid>
        <Grid container alignContent='center'>
        <Stack >
          <Button  
              type="submit"
              fullWidth
              variant="contained"
              
              sx={{ mt: 3, mb: 2,  }} >submit</Button></Stack>
        </Grid>
      </Box>
    </Container>
  );
};

export default ClientDetail;
