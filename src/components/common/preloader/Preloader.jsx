import React from "react";
import Logo from "../../../assets/logo.gif";
import { Box } from "@mui/material";

const Preloader = () => {
  return (
    <Box height="100vh" bgcolor="white" display="flex"  flexDirection="column" justifyContent="center"  alignItems="center">
      <img src={Logo} />
    </Box>
  );
};

export default Preloader;
