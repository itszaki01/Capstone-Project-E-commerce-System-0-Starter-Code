import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import { Box } from "@mui/system";
import { Typography } from "@mui/material";

import HeroImg1 from "../../../assets/hero-1.jpg";
import HeroImg2 from "../../../assets/hero-2.jpg";
import HeroImg3 from "../../../assets/hero-3.jpg";

const heroImages = [HeroImg1, HeroImg2, HeroImg3];

const Hero = () => {
  return (
    <Box position="relative">
      <Swiper slidesPerView={3} spaceBetween={0}>
        {heroImages.map((img, i) => (
          <SwiperSlide key={i}>
            <img
              style={{
                width: "100%",
                height: "500px",
                objectFit: "cover",
              }}
              src={img}
              alt=""
              loading="lazy"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Box
        position="absolute"
        top="40%"
        right="0px"
        zIndex="7"
        width="100%"
        textAlign="center"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          color="secondary.light"
          variant="h1"
          sx={{
            width: "65%",
            letterSpacing: "1px",
            fontWeight: "900",
            textTransform: "capitalize",
            textShadow: "rgba(0, 0, 0, 0.25) 1.95px 1.95px 2.6px;",
          }}
        >
          Your first destination for online shopping for watches!{" "}
        </Typography>
      </Box>
    </Box>
  );
};

export default Hero;
