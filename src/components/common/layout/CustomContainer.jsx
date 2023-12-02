import React from "react";
import { Container } from "@mui/material";
import PropType from "prop-types";

const CustomContainer = ({ children }) => {
  return (
    <Container maxWidth="xl" sx={{ mt: 5 }}>
      {children}
    </Container>
  );
};

export default CustomContainer;
CustomContainer.propTypes = {
  children: PropType.node.isRequired,
};
