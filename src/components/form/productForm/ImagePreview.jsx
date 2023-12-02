import { Box, Button, Grid } from "@mui/material";
import React from "react";
import PropType from "prop-types";

const ImagePreview = ({ imageSrc, onClickHandler }) => {
  return (
    <Grid item xs={1} sm={1} md={1}>
      <Box
        border="2px dashed lightGray"
        width="6rem"
        height="8rem"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <img style={{objectFit: "contain", objectPosition: "center"}} height="100%" width="100%" src={imageSrc} />
      </Box>
      <Button onClick={onClickHandler}>delete</Button>
    </Grid>
  );
};

export default ImagePreview;

ImagePreview.propTypes = {
  imageSrc: PropType.string,
  onClickHandler: PropType.func,
};