import { Box, Typography } from "@mui/material";
import React from "react";
import PropType from "prop-types";

const CartItemColor = ({ color }) => {
  return (
    <Box
      display="flex"
    >
      <Typography variant="body1" color="secondary.dark" mr={1}>
        Color:
      </Typography>
      <Typography variant="body1">
       {color}
      </Typography>
    </Box>
  );
};

export default CartItemColor;

CartItemColor.propTypes = {
  color: PropType.string.isRequired,
};
