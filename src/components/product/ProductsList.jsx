import { Stack } from "@mui/material";

import React from "react";

import PropType from "prop-types";
import AppliedFilters from "../../screens/shop/components/AppliedFilters";

const ProductsList = ({ filteredProducts, children }) => {
  return (
    <Stack width="100%">
      <AppliedFilters filteredProductsCount={filteredProducts?.length} />
      {children}
    </Stack>
  );
};

export default ProductsList;

ProductsList.propTypes = {
  filteredProducts: PropType.array,
  children: PropType.node.isRequired,
};
