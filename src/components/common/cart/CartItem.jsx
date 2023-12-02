import {
  Avatar,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import CartItemColor from "./CartItemColor";
import CartItemQuantity from "./CartItemQuantity";
import { formatPrice } from "../../../helpers/utils";
import PropType from "prop-types";
import { Delete } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { deleteCartItem } from "../../../redux/features/cart/cartSlice";

const CartItem = ({ item }) => {
  const { id, image, name, brand, price, color, quantity, remainingQty } = item;

  console.log(item);
  const dispatch = useDispatch()

  const onRemoveFromCart = (id) => {
    dispatch(deleteCartItem({id}))
  };

  return (
    <List key={id} sx={{width: "100%"}}>
      <ListItem sx={{ pb: 2, height: "95%" }}>
        <ListItemAvatar
          sx={{
            mr: 2,
            height: { md: "100%" },
            width: { xs: "25%", sm: "20%" },
            display: "flex",
            justifyContent: "center",
            border: "1px solid #c5c3c1",
            borderRadius: 2,
            bgcolor: "#f9f9f9",
          }}
        >
          <Avatar src={image} sx={{ height: 100, width: 65}} variant="square"  />
        </ListItemAvatar>

        <Box width="100%">
          <Box display="flex" alignItems="center" justifyContent="space-between" >
            <ListItemText sx={{  my: 1 }} primary={name} secondary={brand} />
            <Typography variant="h4" color="primary"> {formatPrice(price)} </Typography>
          </Box>

          <Box display="flex" flexDirection="row" alignItems="center" justifyContent="flex-start" >
            <Stack
              width="90%"
              display="flex"
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 2, md: 2 }}
              justifyContent="flex-start"
              alignItems={{ xs: "flex-start", sm: "center" }}
            >
              <CartItemColor color={color} />
              <CartItemQuantity id={id} quantity={quantity} remainingQty={remainingQty} />
            </Stack>

            <IconButton onClick={() => onRemoveFromCart(id)}> <Delete color="error" /> </IconButton>
          </Box>
        </Box>
      </ListItem>
      <Divider />
    </List>
  );
};

export default CartItem;

CartItem.propTypes = {
  item: PropType.shape({
    id: PropType.string,
    name: PropType.string,
    brand: PropType.string,
    price: PropType.number,
    quantity: PropType.number,
    remainingQty: PropType.number,
    description: PropType.string,
    color: PropType.string,
    image: PropType.string,
  }).isRequired,
};
