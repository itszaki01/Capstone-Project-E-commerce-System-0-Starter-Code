import React from "react";
import PropType from "prop-types";
import { LoadingButton } from "@mui/lab";


const SubmitButton = ({ children, isLoading, Icon, ...props }) => {
  return (
    <LoadingButton {...props} type="submit" variant="contained" startIcon={Icon} loading={isLoading}
    loadingPosition="start" >
      {children}
    </LoadingButton>
  );
};

export default SubmitButton;

SubmitButton.propTypes = {
  children: PropType.node.isRequired,
  isLoading: PropType.bool.isRequired,
  Icon: PropType.node.isRequired
};
