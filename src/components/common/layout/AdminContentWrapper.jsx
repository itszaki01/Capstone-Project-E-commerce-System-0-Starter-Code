import { Box, Toolbar } from "@mui/material";
import React from "react";
import PropType from "prop-types";

const AdminContentWrapper = ({ children }) => {
  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, px: 3, py:5, width: { sm: `calc(100% - 240px)` } }}
    >
      <Toolbar />
      {children}
    </Box>
  );
};

export default AdminContentWrapper;
AdminContentWrapper.propTypes = {
  children: PropType.node.isRequired,
};