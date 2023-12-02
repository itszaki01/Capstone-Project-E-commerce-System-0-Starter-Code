import { Box } from "@mui/material";
import React from "react";
import PropType from "prop-types";

const Center = ({ children, height }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      height={height}
    >
      {children}
    </Box>
  );
};

export default Center;
Center.propTypes = {
  children: PropType.node.isRequired,
  height:PropType.number,
};