import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

// import ClientDetail from "./requirement";

import UserDetail from "./userDetails";
import Clients from "../table2";
import NestedModal from "./model";

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
  const [value, setValue] = React.useState(0);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoding] = useState(true);
  const [ageFilter, setAgeFilter] = useState(30);

  console.log("Age Filter ===>", ageFilter);

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((response) => response.json())
      .then((result) => {
        console.log("Result ==>", result);
        const filterData = result.users.filter((user) => user.age > ageFilter);

        setUsers(filterData);
        setIsLoding(false);
      });
  }, [ageFilter]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Home" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Sign Up Today" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Clients />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div>
          <Box width={300}>
            
            <Slider
              defaultValue={ageFilter}
              onChange={(e) => setAgeFilter(e.target.value)}
              aria-label="Default"
              valueLabelDisplay="auto"
            />
          </Box>
          <UserDetail userData={users} />
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <NestedModal/>
      </TabPanel>
      
    </Box>
  );
}
