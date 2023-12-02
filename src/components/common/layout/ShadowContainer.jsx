import { Box } from "@mui/material";
import React from "react";
import PropType from "prop-types";

const ShadowContainer = ({ children, my }) => {
  return (
    <Box
      sx={{
        my: my || 5,
        borderRadius: 2,
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        px: { xs: 2, md: 4 },
        py: 1,
      }}
    >
      {children}
    </Box>
  );
};

export default ShadowContainer;
ShadowContainer.propTypes = {
  children: PropType.node.isRequired,
  my: PropType.number,
};
