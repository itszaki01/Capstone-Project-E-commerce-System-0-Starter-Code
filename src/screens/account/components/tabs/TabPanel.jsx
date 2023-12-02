import { Box } from '@mui/material'
import React from 'react'
import PropType from "prop-types";
const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <Box
    role="tabpanel"
    hidden={value !== index}
    id={`account-tabpanel-${index}`}
    aria-labelledby={`account-tab-${index}`}
    {...other}
    sx={{ height: "max-content", overflowY: "scroll",   }}
  >
    {value === index && (
      <Box>
        {children}
      </Box>
    )}
  </Box>
  )
}

export default TabPanel;

TabPanel.propTypes = {
  children: PropType.node,
  index: PropType.number.isRequired,
  value: PropType.number.isRequired,
};