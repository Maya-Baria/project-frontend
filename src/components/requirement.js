import { Box, Button, Stack, TextField } from "@mui/material";
import * as React from "react";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/joy";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

const ClientDetail = () => {
  const [value, setValue] = React.useState(dayjs("2022-04-17"));

  const handleSubmit = (event) => {
    event.preventDefault();

    const Data = new FormData(event.currentTarget);
    console.log({
      firstName: Data.get("firstname"),
      lastName: Data.get("lastname"),
      dateOfBirth: value.date,
      dateOfJoining: Data.get("dateOfJoining"),
      designation: Data.get("designation"),
      department: Data.get("department"),
      employeeType: Data.get("employeeType"),
      currentStatus: Data.get("currentStatus"),
    });
  };

  // const handleSubmit = (event) => {
  //   const Data = new FormData(event.currentTarget);
  //   const requestBody = {
  //     query: `
  //         mutation {
  //           createEmployee(employeeInput: {
  //             firstName:"${Data.get("firstname")}",
  //             lastName:"${lastName}",
  //             dateOfBirth:"${dateOfBirth}",
  //             dateOfJoining:"${dateOfJoining}",
  //             designation:"${designation}",
  //             department:"${department}",
  //             employeeType:"${employeeType}",
  //             currentStatus:"${currentStatus}"
  //           }) {
  //             firstName
  //             lastName
  //             dateOfBirth
  //             dateOfJoining
  //             designation
  //             department
  //             employeeType
  //             currentStatus
  //           }
  //         }
  //       `,
  //   };

  //   fetch("http://localhost:4000/graphql", {
  //     method: "POST",
  //     body: JSON.stringify(requestBody),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => {
  //       if (res.status !== 200 && res.status !== 201) {
  //         throw new Error("Failed!");
  //       }
  //       if (res.status === 200) {
  //         setOpen(true);
  //       }

  //       return res.json();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  return (
    <Container sx={{ alignItems: "center", flexGrow: 1 }}>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid
          container
          sx={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <Stack direction="row" spacing={3}>
            <Grid>
              <Stack spacing={3}>
                <TextField
                  id="firstname"
                  name="firstname"
                  label="First Name"
                  type="string"
                ></TextField>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      label="Date of Birth"
                      name="dateOfBirth"
                      id="dateOfBirth"
                      value={value}
                      onChange={(newValue) => {
                        setValue(newValue);
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                <Select
                  id="designation"
                  name="designation"
                  placeholder="Designation"
                  sx={{ width: 230, height: 50 }}
                >
                  <Option value="Manager" name="manager">
                    Manager
                  </Option>
                  <Option value="CEO" name="ceo">
                    CEO
                  </Option>
                  <Option value="CTO" name="cto">
                    CTO
                  </Option>
                  <Option value="HR" name="hr">
                    HR
                  </Option>
                  <Option value="Developer" name="developer">
                    Developer
                  </Option>
                </Select>
                <Select
                  id="currentStatus"
                  name="currentStatus"
                  placeholder="Current Status"
                  sx={{ width: 230, height: 50 }}
                >
                  <Option value="available" name="available">
                    Available
                  </Option>
                  <Option value="unavailable" name="unavailable">
                    Unavailable
                  </Option>
                  <Option value="remote" name="remote">
                    Remote
                  </Option>
                  <Option value="on-leave" name="leave">
                    On Leave
                  </Option>
                </Select>
              </Stack>
            </Grid>

            <Grid>
              <Stack spacing={3}>
                <TextField
                  id="lastname"
                  name="lastname"
                  label="Last Name"
                  type="string"
                ></TextField>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      label="Date of Joining"
                      name="dateOfJoining"
                      id="dateOfJoining"
                    />
                  </DemoContainer>
                </LocalizationProvider>

                <TextField
                  id="department"
                  name="department"
                  label="Department"
                  type="string"
                ></TextField>

                <Select
                  id="employeeType"
                  name="employeeType"
                  placeholder="Employee Type"
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
        <Grid
          container
          sx={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <Stack>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
              }}
            >
              submit
            </Button>
          </Stack>
        </Grid>
      </Box>
    </Container>
  );
};

export default ClientDetail;
