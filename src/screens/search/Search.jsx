import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductGrid from "../../components/product/ProductGrid";
import ProductGridSkeleton from "../../components/product/skeleton/ProductGridSkeleton";
import { Box, Button, Skeleton, Typography } from "@mui/material";
import { SHOP } from "../../constants/routes";
import { useSearchProductByNameQuery } from "../../redux/services/products/productsApiService";

const Search = () => {
  const { searchKey } = useParams();
  const navigate = useNavigate();
  const {data:searchedProducts,isLoading} =useSearchProductByNameQuery(searchKey)
  console.log(searchedProducts);
  if (searchedProducts?.length === 0 && !isLoading) {
    return (
      <Box
        p={4}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="40vh"
      >
        <Typography variant="h3" color="secondary.dark">
          There are no items that match "{searchKey}" keyword.
        </Typography>
        <Button variant="outlined" onClick={() => navigate(SHOP)} sx={{ m: 2 }}>
          Continue Shopping
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        px: { sm: 3, md: 8 },
        height: "max-content",
        py: { sm: 0, md: 5 },
      }}
    >
      {isLoading ? (
        <Skeleton width="100%" height="50%" />
      ) : (
        <Typography sx={{ ml: 3, my: 3 }}>
          Found {searchedProducts?.length} product
          {searchedProducts?.length > 1 && "s"} with "{searchKey}" keyword
        </Typography>
      )}

      {isLoading ? (
        <ProductGridSkeleton columns={4} />
      ) : (
        <ProductGrid
          products={searchedProducts}
          isLoading={isLoading}
          columns={4}
        />
      )}
    </Box>
  );
};

export default Search;
