import { Avatar, Box, Stack, Typography } from "@mui/material";
import React from "react";
import { formatPrice } from "../../../helpers/utils";
import ShadowContainer from "../../../components/common/layout/ShadowContainer";
import { useSelector } from "react-redux";

const CheckoutSummery = () => {
    //select cart, totalAmount from store
    const {cart , cartTotalAmount:totalAmount} = useSelector((state)=> state.cart)

  return (
    <Box>
      <Typography variant="h3" mb={4}>
        Checkout Summery
      </Typography>

      <Stack direction="row" justifyContent="space-between" my={2}>
        <Typography variant="body1" sx={{ fontSize: "large" }}>Cart Item(s):</Typography>

        <Typography variant="body1" color="primary" sx={{ fontSize: "large" }}>
          {cart.length}
        </Typography>
      </Stack>

      <Stack direction="row" justifyContent="space-between" my={2}>
        <Typography variant="body1" sx={{ fontSize: "large" }}>Shipping Fees:</Typography>

        <Typography variant="body1" color="primary" sx={{ fontSize: "large" }}>
          Free
        </Typography>
      </Stack>

      <Stack direction="row" justifyContent="space-between" my={2} >
        <Typography variant="body1" sx={{ fontSize: "large" }}>Total</Typography>

        <Typography variant="body1" color="primary" sx={{ fontSize: "large" }}>
          {formatPrice(totalAmount)}
        </Typography>
      </Stack>

      <Box>
        {cart.map((cartItem) => (
          <CartItem key={cartItem.id} {...cartItem} />
        ))}
      </Box>
    </Box>
  );
};

export default CheckoutSummery;

const CartItem = (item) => {
  // console.log(item);
  return (
    <ShadowContainer>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ py: 1 }}
      >
        <Avatar
          src={item.image}
          variant="square"
          bgcolor="red"
          sx={{
            height: 100,
            width: 65,
            p: 2,
            mr:2,
            border: "1px solid #c5c3c1",
            borderRadius: 2,
            bgcolor: "#f9f9f9",
          }}
        />

        <Stack spacing={1}>
          <Typography sx={{ fontSize: "large" }}>
            Product Name: <span style={{ color: "gray" }}> {item.name}</span>
          </Typography>

          <Typography>
            Brand: <span style={{ color: "gray" }}> {item.brand}</span>
          </Typography>

          <Typography>
            Quantity: <span style={{ color: "gray" }}> {item.quantity}</span>
          </Typography>

          <Typography>
            Unit Price:{" "}
            <span style={{ color: "gray" }}> {formatPrice(item.price)}</span>
          </Typography>

          {item.quantity > 1 && (
            <Typography>
              Set Price:{" "}
              <span style={{ color: "gray" }}>
                {" "}
                {formatPrice(item.price * item.quantity)}
              </span>
            </Typography>
          )}
        </Stack>
      </Box>
    </ShadowContainer>
  );
};
