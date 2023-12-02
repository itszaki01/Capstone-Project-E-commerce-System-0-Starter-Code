import React from "react";
import PropType from "prop-types";
import { Box } from "@mui/material";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`product-tabpanel-${index}`}
      {...other}
      sx={{ height: {xs: "12rem", md:"7rem"}, overflowY: "scroll" }}
    >
      {value === index && (
        <Box pl={2} pt={2.2}>
          {children}
        </Box>
      )}
    </Box>
  );
};

export default TabPanel;

TabPanel.propTypes = {
  children: PropType.node,
  index: PropType.number.isRequired,
  value: PropType.number.isRequired,
};
