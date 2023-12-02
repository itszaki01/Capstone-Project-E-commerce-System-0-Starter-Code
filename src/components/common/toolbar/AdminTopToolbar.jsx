import { Stack, Typography } from "@mui/material";
import React from "react";
import PropType from "prop-types";

const AdminTopToolbar = ({ heading, isLoading, totalCount }) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      mb={5}
    >
      <Typography variant="h3">
        {heading} &nbsp; ({isLoading ? 0 : totalCount})
      </Typography>
    </Stack>
  );
};

export default AdminTopToolbar;

AdminTopToolbar.propTypes = {
  heading: PropType.string.isRequired,
  isLoading: PropType.bool.isRequired,
  totalCount: PropType.number
};