import { Box, IconButton } from "@mui/material";
import React, { useRef } from "react";
import Product from "./Product";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import PropType from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay"

const ProductShowcaseSwiper = ({ products, isLoading }) => {
  const swiperRef = useRef();

  const sliderSettings = {
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 5,
      spaceBetween: 20,
    },
  };

  return (
    <Box px={8} position="relative" >
      <IconButton
        onClick={() => swiperRef.current?.slidePrev()}
        sx={{ position: "absolute", top: "35%", left: "20px" }}
      >
        <ArrowBackIos fontSize="large" />
      </IconButton>

      <Swiper
        breakpoints={sliderSettings}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        loop={true}
        autoplay={true}
      >
        {isLoading
          ? new Array(6).fill({}).map((product, index) => (
              <SwiperSlide key={index}>
                <Product product={product} />
              </SwiperSlide>
            ))
          : products?.map((product, i) => (
              <SwiperSlide key={i}>
                <Product product={product} />
              </SwiperSlide>
            ))}
      </Swiper>
      <IconButton
        onClick={() => swiperRef.current?.slideNext()}
        sx={{ position: "absolute", top: "35%", right: "20px" }}
      >
        <ArrowForwardIos fontSize="large" />
      </IconButton>
    </Box>
  );
};

export default ProductShowcaseSwiper;
ProductShowcaseSwiper.propTypes = {
  products: PropType.array,
  isLoading: PropType.bool,
};
