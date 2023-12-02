import { Typography } from "@mui/material";
import React from "react";

const AppName = ({ mobile }) => {
  const display = mobile
    ? { xs: "flex", md: "none" }
    : { xs: "none", md: "flex" };

  return (
    <Typography
      variant={mobile ? "h5" : "h2"}
      noWrap
      component="a"
      href="/"
      color="primary"
      sx={{
        mr: 2,
        display,
        letterSpacing: ".3rem",
        fontFamily: "Pacifico",
        flexGrow: mobile && 1,
      }}
    >
      BrandTime
    </Typography>
  );
};

export default AppName;
