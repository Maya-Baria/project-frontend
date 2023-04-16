import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// import ClientDetail from "./requirement";

import Clients from "../EmployeeTable";

import { RetirementTable } from "./RetirementTable";
import ClientDetail from "./requirement";
import { Stack } from "@mui/system";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <h3>Hello Systems</h3>
        <Tabs
          value={value}
          sx={
            {
              borderTopWidth:1,
              borderTop:1,
              borderColor:"divider"
            }
          }
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          
          <Tab label="Home" {...a11yProps(0)} />
          <Tab label="Upcoming Retirement " {...a11yProps(1)} />
          <Tab label="Add User" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Clients />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <RetirementTable />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ClientDetail />
      </TabPanel>
    </Box>
  );
}
