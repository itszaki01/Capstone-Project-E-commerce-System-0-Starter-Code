import { ShoppingBagOutlined } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import React from "react";

import { SHOP } from "../../../constants/routes";
import { useNavigate } from "react-router";
import PropType from "prop-types";
import CartItem from "./CartItem";

const CartContents = ({ cart }) => {
    const navigate = useNavigate();
    return (
        <Box
            height="75%"
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflowY: "scroll",
                my: 1,
            }}
        >
            {cart.length === 0 ? (
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                    <ShoppingBagOutlined fontSize="large" sx={{ color: "secondary.dark" }} />
                    <Typography variant="body1" sx={{ color: "secondary.dark", px: 2, textAlign: "center", my: 2 }}>
                        You currently don’t have any items in your Cart
                    </Typography>
                    <Button onClick={() => navigate(SHOP)}>Continue shopping</Button>
                </Box>
            ) : (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        width: "100%",
                        height: "100%",
                    }}
                >
                    {cart.map((item) => (
                        <CartItem key={item.id} item={item} />
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default CartContents;

CartContents.propTypes = {
    cart: PropType.array.isRequired,
};
