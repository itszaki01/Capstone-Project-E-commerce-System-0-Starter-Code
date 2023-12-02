import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FEATURED_PRODUCTS,
  NEW_ARRIVALS,
  RECOMMENDED_PRODUCTS,
} from "../../constants/routes";

import ProductShowcaseSwiper from "./ProductShowcaseSwiper";
import PropType from "prop-types";
import { productData } from "../../data/productData";
import { useGetAllProductsQuery, useGetProductsByTypeQuery } from "../../redux/services/products/productsApiService";

const ProductShowcase = ({ productType }) => {
  const {data,isLoading} = useGetProductsByTypeQuery(productType)

  const showCaseHeader =
    productType === "isNewArrival"
      ? "New Arrivals"
      : productType === "isFeatured"
      ? "Featured Watches"
      : "You May Also Like";

  const navigation =
    productType === "isNewArrival"
      ? NEW_ARRIVALS
      : productType === "isFeatured"
      ? FEATURED_PRODUCTS
      : RECOMMENDED_PRODUCTS;

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mx={2}
        my={5}
      >
        <Typography variant="h2">{showCaseHeader}</Typography>
        <Link to={navigation}>
          <Typography variant="body1" sx={{ textDecoration: "underline" }}>
            See All
          </Typography>
        </Link>
      </Box>
      <Box>
        <ProductShowcaseSwiper products={data} isLoading={isLoading} />
      </Box>
    </Box>
  );
};

export default ProductShowcase;
ProductShowcase.propTypes = {
  productType: PropType.string.isRequired,
};
