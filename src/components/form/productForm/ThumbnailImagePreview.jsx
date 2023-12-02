import { Image } from "@mui/icons-material";
import { Box } from "@mui/material";
import React from "react";
import Spinner from "../../common/spinner/Spinner";
import PropType from "prop-types";

const ThumbnailImagePreview = ({ imageFileUrl, productImage, isFileLoading }) => {
  return (
    <Box
      border="2px dashed lightGray"
      width={{md: "15rem"}}
      height="15rem"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {imageFileUrl || productImage ? (
        <img height="100%" width="100%" style={{objectFit: "contain"}} src={imageFileUrl || productImage} />
      ) : isFileLoading ? (
        <Spinner/>
      ) : (
        <Image color="disabled" fontSize="large" />
      )}
    </Box>
  );
};

export default ThumbnailImagePreview;

ThumbnailImagePreview.propTypes = {
  imageFileUrl: PropType.string,
  productImage: PropType.string,
  isFileLoading: PropType.bool,
};
