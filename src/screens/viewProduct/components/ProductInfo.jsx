import { Box, Chip, Skeleton, Stack, Typography } from "@mui/material";
import React from "react";
import ProductTabs from "./Tabs/ProductTabs";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import { formatPrice } from "../../../helpers/utils";
import PropType from "prop-types";
import SecondaryButton from "../../../components/common/button/SecondaryButton";
import { useDispatch } from "react-redux";
import { addToCar } from "../../../redux/features/cart/cartSlice";

const ProductInfo = ({ product, isLoading }) => {
    const dispatch = useDispatch();
    const handleAddToCart = () => {
        dispatch(addToCar({...product,price:Number(product.price),maxQuantity:Number(product.maxQuantity),quantity:1}));
    };

    return (
        <Box sx={{ px: { xs: 3, md: 0 }, py: { xs: 0, md: 3 } }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                }}
            >
                <Typography
                    variant="overline"
                    fontSize="large"
                    gutterBottom
                    color="primary.dark"
                >
                    {isLoading ? <Skeleton width={150} /> : product.brand}
                </Typography>

                <Stack direction="row" spacing={3}>
                    <Typography
                        variant="h2"
                        gutterBottom
                        sx={{ textAlignLast: "left" }}
                    >
                        {isLoading ? <Skeleton width={500} /> : product.name}
                    </Typography>

                    {product?.remainingQty <= 5 && product?.remainingQty > 0 ? (
                        <Chip
                            mb={3}
                            label={`Only ${product.remainingQty} left`}
                            color="primary"
                            variant="outlined"
                        />
                    ) : (
                        product?.remainingQty === 0 && (
                            <Chip
                                mb={3}
                                label={`Sold Out`}
                                variant="outlined"
                                color="error"
                            />
                        )
                    )}
                </Stack>

                <Typography
                    variant="body1"
                    sx={{ textAlign: "left" }}
                    gutterBottom
                >
                    {isLoading ? (
                        <Skeleton width={650} height={150} />
                    ) : (
                        product.description
                    )}
                </Typography>
            </Box>

            <Stack direction="row" spacing={1} my={3}>
                <Typography variant="body1" sx={{ mb: 2 }}>
                    {isLoading ? <Skeleton width={50} /> : "Color:"}
                </Typography>

                <Typography
                    variant="body1"
                    sx={{ mb: 2, color: "secondary.dark" }}
                >
                    {isLoading ? <Skeleton width={50} /> : product.color}
                </Typography>
            </Stack>

            <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                sx={{ my: 3 }}
            >
                <Typography variant="h3" color="primary">
                    {isLoading ? (
                        <Skeleton width={100} />
                    ) : (
                        formatPrice(product.price)
                    )}
                </Typography>
                <Typography variant="body2" color="secondary.dark">
                    {isLoading ? <Skeleton width={100} /> : "Including VAT"}
                </Typography>
            </Stack>

            {isLoading ? (
                <Skeleton height={50} />
            ) : (
                <SecondaryButton
                    startIcon={<LocalMallOutlinedIcon />}
                    type="button"
                    size="large"
                    width="100%"
                    onClickHandler={handleAddToCart}
                    disabled={product?.remainingQty === 0}
                >
                    Add to Cart
                </SecondaryButton>
            )}

            {isLoading ? (
                <Skeleton height={200} />
            ) : (
                <ProductTabs
                    sizes={product.sizes}
                    designDetails={product.designDetails}
                />
            )}
        </Box>
    );
};

export default ProductInfo;

ProductInfo.propTypes = {
    product: PropType.object,
    isLoading: PropType.bool,
};
