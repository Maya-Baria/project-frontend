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
import dayjs from "dayjs";
import FormValidationModal from "./formValidation";

const ClientDetail = (userData) => {
  // const [value, setValue] = React.useState(dayjs("2022-04-17"));
  const [dateOfJoining, setDateOfJoining] = React.useState(dayjs("2022-04-17"));
  const [dateOfBirth, setDateOfBirth] = React.useState(dayjs("2022-04-17"));
  const [validFormData, setValidFormData] = React.useState(false);


  const handleSubmitForm = (event) => {
    event.preventDefault();

    const Data = new FormData(event.currentTarget);

    let empType = Data.get("employeeType");
    let designation = Data.get("designation");

    if (
      (empType === "Contractor" || empType === "Seasonal") &&
      (designation === "Manager" ||
        designation === "Director" ||
        designation === "VP")
    ) {
      setValidFormData(true);
    }

    const requestBody = {
      query: `
          mutation {
            createEmployee(employeeInput: {
              firstName:"${Data.get("firstname")}",
              lastName:"${Data.get("lastname")}",
              dateOfBirth:"${dayjs(dateOfBirth).format("YYYY-MM-DD")}",
              dateOfJoining:"${dayjs(dateOfJoining).format("YYYY-MM-DD")}",
              designation:"${Data.get("designation")}",
              department:"${Data.get("department")}",
              employeeType:"${Data.get("employeeType")}",
              currentStatus:"${Data.get("currentStatus")}"
            }) {
              firstName
              lastName
              dateOfBirth
              dateOfJoining
              designation
              department
              employeeType
              currentStatus
            }
          }
        `,
    };

    {
      !validFormData &&
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
              console.log("Data submited sucessfully");
              event.target.reset();
              // setOpen(true);
            }

            return res.json();
          })
          .catch((err) => {
            console.log(err);
          });
    }
  };

  const handleJoiningDate = (date) => {
    setDateOfJoining(date);
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    console.log("Formated Data =>", formattedDate);
  };

  const handleDateOfBirth = (date) => {
    setDateOfBirth(date);
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    console.log("Formated Data =>", formattedDate);
  };

  return (
    <Container sx={{ alignItems: "center", flexGrow: 1 }}>
      <Box
        component="form"
        onSubmit={((e) => e.preventDefault(), handleSubmitForm)}
      >
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
                      placeholder="Date of Birth"
                      value={dateOfBirth}
                      onChange={handleDateOfBirth}
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
                  <Option value="VP" name="vp">
                    VP
                  </Option>
                  <Option value="Director" name="director">
                    Director
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
                      placeholder="Date of Joining"
                      name="dateOfJoining"
                      id="dateOfJoining"
                      value={dateOfJoining}
                      onChange={handleJoiningDate}
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
                  <Option value="Contractor" name="part-time">
                    Contractor
                  </Option>
                  <Option value="Seasonal" name="intern">
                    Seasonal
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
              disabled={validFormData}
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
      <FormValidationModal open={validFormData} setOpen={setValidFormData} />
    </Container>
  );
};

export default ClientDetail;
