import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const { pathname } = useLocation();

  return (
    !pathname.startsWith("/admin/") && (
      <footer>
        <Box
          bgcolor="#eae8e4"
          marginTop="70px"
          padding="40px 0"
          display="flex"
          justifyContent="center"
        >
          <Grid
            container
            width="85%"
            columns={{ xs: 4, sm: 8, md: 12 }}
            columnGap={{ xs: 4, sm: 4, md: 3 }}
            rowGap={4}
            justifyContent="flex-start"
          >
            <Grid item xs={4} sm={8} md={4}>
              <Typography
                variant="h2"
                fontWeight="bold"
                mb="30px"
                color="primary"
                sx={{ fontFamily: "Pacifico", letterSpacing: ".3rem" }}
              >
                BrandTime
              </Typography>
              <Typography variant="body1" textAlign="justify">
                Time is precious, and we believe that every second counts.
                That’s why we offer you the best selection of watches from top
                brands, so you can make every moment count. Welcome to your
                first destination for online shopping for watches!
              </Typography>
            </Grid>

            <Grid item xs={2} sm={2} md={2}>
              <Typography
                variant="h4"
                fontWeight="bold"
                mb="20px"
                color="primary.dark"
              >
                About Us
              </Typography>
              <Typography mb="20px">Our Stores</Typography>
              <Typography mb="20px">Terms & Conditions</Typography>
              <Typography mb="20px">Privacy Policy</Typography>
            </Grid>

            <Grid item xs={2} sm={2} md={2}>
              <Typography
                variant="h4"
                fontWeight="bold"
                mb="20px"
                color="primary.dark"
              >
                Customer Care
              </Typography>
              <Typography mb="20px">Help Center</Typography>
              <Typography my="20px">Track Your Order</Typography>

              <Typography mb="20px">Returns & Refunds</Typography>
            </Grid>

            <Grid item xs={4} sm={3} md={3}>
              <Typography
                variant="h4"
                fontWeight="bold"
                mb="20px"
                color="primary.dark"
              >
                Contact Us
              </Typography>
              <Typography mb="20px">Riyadh, Kigndom of Saudi Arabia</Typography>
              <Typography mb="20px">Email: brandtime@gmail.com</Typography>
              <Typography mb="20px">(966)000-5555</Typography>
            </Grid>
          </Grid>
        </Box>
      </footer>
    )
  );
};

export default Footer;
