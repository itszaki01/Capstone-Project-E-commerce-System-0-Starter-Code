import { Box, Breadcrumbs, Skeleton, Stack, Typography } from "@mui/material";
import React, { useState } from "react";

import { styled } from "@mui/material/styles";
import { Link, useParams } from "react-router-dom";
import { SHOP } from "../../constants/routes";
import ProductInfo from "./components/ProductInfo";

import ProductShowcase from "../../components/product/ProductShowcase";
import CustomContainer from "../../components/common/layout/CustomContainer";
import ProductImagesCarosel from "./components/carosel/ProductImagesCarosel";
import { productData } from "../../data/productData";
import { useSelector } from "react-redux";
import { cartSliceSelector } from "../../redux/features/cart/cartSlice";
import { useGetProductByIdQuery } from "../../redux/services/products/productsApiService";

const Item = styled(Box)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: "left",
    flexGrow: 1,
    height: "max-content",
    width: "50%",
    [theme.breakpoints.down("md")]: {
        marginTop: "2rem",
        width: "100%",
    },
}));

const ViewProduct = () => {
    const { id } = useParams();
    // console.log("id", id);
    const { data: product, isLoading } = useGetProductByIdQuery(id);
    // console.log("product", product);
    console.log(product);
    return (
        <CustomContainer>
            <Stack
                direction={{ sm: "column", md: "row" }}
                spacing={{ xs: 4, sm: 2, md: 5 }}
                justifyContent="flex-start"
                alignItems="flex-start"
                sx={{
                    height: "max-content",
                    margin: { md: "0 3rem 0 3rem" },
                }}
            >
                <Item>
                    {isLoading ? (
                        <Skeleton width={400} />
                    ) : (
                        <Breadcrumbs aria-label="breadcrumb" mb={2} mx={2}>
                            <Link underline="hover" color="inherit" to={SHOP}>
                                Shop
                            </Link>
                            <Typography color="text.primary">{product.name}</Typography>
                        </Breadcrumbs>
                    )}

                    <ProductImagesCarosel isLoading={isLoading} imageCollection={product?.imageCollection} />
                </Item>
                <Item>
                    <ProductInfo isLoading={isLoading} product={product} />
                </Item>
            </Stack>
            <Box>
                <ProductShowcase productType="isRecommended" />
            </Box>
        </CustomContainer>
    );
};

export default ViewProduct;
