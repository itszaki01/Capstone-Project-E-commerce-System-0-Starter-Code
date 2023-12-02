import { Box, Typography } from "@mui/material";
import React from "react";
import PropType from 'prop-types'

const Banner = ({ bannerDesc, bannerImg }) => {
  return (
    <Box
      bgcolor="#F3F3F3"
      px={7}
      mb={10}
      height={400}
      display="flex"
      sx={{
        justifyContent: {xs: "center", sm:"space-between"}
      }}
      alignItems="center"
    >
      <Typography variant="h1">{bannerDesc}</Typography>
      <Box width={500} 
      height= "100%" sx={{display: {xs: "none", sm: "block"}, width: {sm: 300, md:500}}}>
        <img src={bannerImg} style={{ width: "100%", height: "100%",  objectFit: "cover", objectPosition: "center"}}/>
      </Box>
    </Box>
  );
};

export default Banner;

Banner.propTypes = {
  bannerDesc: PropType.string.isRequired,
  bannerImg: PropType.string.isRequired
}
