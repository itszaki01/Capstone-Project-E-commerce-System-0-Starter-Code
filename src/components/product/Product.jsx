import {
  Box,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "../../helpers/utils";
import PropType from 'prop-types'

const Product = ({ product }) => {
  // console.log("product", product)
  return (
    <Link to={`/product/${product.id}`}>
      <Box height="400px" textAlign="center"
      mb={3}
      >
        {product.image ? (
          <img
            style={{
              width: "100%",
              height: "75%",
              objectFit: "contain",
              backgroundColor: "#F4F4F4"
            }}
            src={product.image}
            alt=""
            loading="lazy"

          />
        ) : (
          <Skeleton variant="rectangular" width="100%" height="70%" />
        )}
        <Stack spacing={1} margin={1}>
        
          <Typography variant="body1" color="secondary.dark">
            {product.brand || <Skeleton width={80} />}
          </Typography>
          <Typography variant="h4">
            {product.name || <Skeleton width={150} />}
          </Typography>
          <Typography variant="body2" color="primary">
            {product.price ? formatPrice(product.price)  : <Skeleton width={60} />}
          </Typography>
        </Stack>
      </Box>
    </Link>
  );
};

export default Product;

Product.propTypes = {
  product: PropType.object.isRequired
}