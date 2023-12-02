import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "./carosel.css";
import { Carousel } from "react-responsive-carousel";
import { Box, Skeleton } from "@mui/material";
import PropType from 'prop-types'

const ProductImagesCarosel = ({ imageCollection, isLoading }) => {
  return (
    <Box 
    bgcolor="#F4F4F4"

    sx={{ px: { xs: 2, md: 0 }, width: "90%" }}>
      <Carousel
        infiniteLoop
        autoPlay
        showStatus={true}
        showIndicators={true}
        showThumbs={!isLoading && true}
        style={{ border: "5px solid black" }}
      >
        {isLoading ? (
          <Skeleton height={600} variant="rectangular"/>
          ) : (
          imageCollection?.map((image) => (
            <Box
            bgcolor="#F4F4F4"
              sx={{ height: { xs: "20rem", sm: "28rem", md: "28rem" } }}
              key={image.id}
            >
              <img
                src={image.url}
                style={{ height: "100%", width: "100%", objectFit: "contain" }}
                loading="lazy"

              />
            </Box>
          ))
        )}
      </Carousel>
    </Box>
  );
};

export default ProductImagesCarosel;

ProductImagesCarosel.propTypes = {
  imageCollection: PropType.array,
  isLoading: PropType.bool
}