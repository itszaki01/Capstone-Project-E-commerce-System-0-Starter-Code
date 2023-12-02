import { Grid } from "@mui/material";
import React from "react";
import Product from "../Product";
import PropType from "prop-types";

const ProductGridSkeleton = ({ columns }) => {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      paddingX={3}
      columns={{ xs: 1, sm: 2, md: columns }}
    >
      {new Array(9).fill({}).map((product, index) => (
        <Grid item xs={1} sm={1} md={1} key={index}>
          <Product product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductGridSkeleton;

ProductGridSkeleton.propTypes = {
  columns: PropType.number.isRequired,
};
