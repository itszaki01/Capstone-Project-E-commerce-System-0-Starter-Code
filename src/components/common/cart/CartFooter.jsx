import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { CHECKOUT } from "../../../constants/routes";
import { formatPrice } from "../../../helpers/utils";
import { useLocation, useNavigate } from "react-router-dom";

import { ArrowForward } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { cartSliceSelector } from "../../../redux/features/cart/cartSlice";

const CartFooter = ({ cart }) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { cartTotalAmount } = useSelector(cartSliceSelector);
    return (
        <Box mb={1} height="10%">
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 2,
                }}
            >
                <Typography variant="h6">Subtotal</Typography>

                <Typography variant="h6">{formatPrice(cartTotalAmount)}</Typography>
            </Box>
            {pathname !== "/checkout" && (
                <Button
                    startIcon={<ArrowForward />}
                    variant="contained"
                    size="large"
                    disabled={cart.length == 0 || pathname == "/checkout"}
                    sx={{
                        width: "100%",
                    }}
                    onClick={() => navigate(CHECKOUT)}
                >
                    Checkout
                </Button>
            )}
        </Box>
    );
};

export default CartFooter;
