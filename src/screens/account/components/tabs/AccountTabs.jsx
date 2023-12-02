import { Box, Paper, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import TabPanel from "./TabPanel";
import AccountSettingsTab from "../AccountSettingsTab";
import OrdersTab from "../OrdersTab";

const AccountTabs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function a11yProps(index) {
    return {
      id: `account-tab-${index}`,
      "aria-controls": `account-tabpanel-${index}`,
    };
  }

  return (
    <Paper elevation={2} sx={{ width: {sm: "90%", md:"70%"} , p: {xs: 3, md:5} }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="account tabs"  variant="fullWidth">
          <Tab label="Account settings" {...a11yProps(0)} />
          <Tab label="My Orders" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <AccountSettingsTab/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <OrdersTab/>
      </TabPanel>
    </Paper>
  );
};

export default AccountTabs;
