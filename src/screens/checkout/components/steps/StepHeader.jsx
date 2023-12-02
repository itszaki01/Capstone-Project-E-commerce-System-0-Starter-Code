import { Stack, Typography } from "@mui/material";
import React from "react";
import PropType from "prop-types";

const StepHeader = ({header, desc}) => {
  return (
    <Stack textAlign="center" my={6} spacing={1}>
      <Typography variant="h3">{header}</Typography>
      <Typography color="secondary.dark">{desc}</Typography>
    </Stack>
  );
};

export default StepHeader;

StepHeader.propTypes = {
  header: PropType.string.isRequired,
  desc: PropType.string.isRequired,
};
