import { Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Product from "./Product";
import PropType from "prop-types";
import Center from "../common/layout/Center";

const ProductGrid = ({ products, isLoading, columns }) => {
  const location = useLocation();

  const [isFiltersApplied, setIsFiltersApplied] = useState(false);

  //if there are no products that match the applied filters - in shop
  if (
    isFiltersApplied &&
    products.length === 0 &&
    location.pathname === "/shop" &&
    !isLoading
  ) {
    return (
      <Box p={4} width="100%">
        <Typography variant="h3" color="secondary.dark">
          There are no items that match the applied filters. Kindly remove one
          or more filters.
        </Typography>
      </Box>
    );
  }

  return (
    <>
      {products && products.length > 0 ? (
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          px={3}
          columns={{ xs: 1, sm: 2, md: columns }}
        >
          {products.map((product, i) => (
            <Grid item xs={1} sm={1} md={1} key={i}>
              <Product product={product} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Center>
          <Typography variant="h3" color="secondary.dark">
            There are no products to show yet, try again later
          </Typography>
        </Center>
      )}
    </>
  );
};

export default ProductGrid;

ProductGrid.propTypes = {
  products: PropType.array,
  isLoading: PropType.bool,
  columns: PropType.number.isRequired,
};
