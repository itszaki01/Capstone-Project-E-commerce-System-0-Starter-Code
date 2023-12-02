import { Stack, Typography } from "@mui/material";
import React from "react";
import PropType from "prop-types";
import OrderedItem from "./OrderedItem";
import { formatPrice } from "../../helpers/utils";
import moment from "moment";
import ShadowContainer from "../common/layout/ShadowContainer";
import OrderStatusChip from "./OrderStatusChip";

const Order = ({ order }) => {
  const { id, cartItems, orderAmount, orderStatus, createdAt } = order;
  // console.log(id, cartItems);

  return (
    <ShadowContainer>
      {order.cartItems.map((item) => (
        <OrderedItem key={item.id} item={item} />
      ))}

      <Stack
        width="100%"
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        my={3}
        pt={3}
        sx={{ borderTop: "1px solid #c5c3c1" }}
      >
        <Stack spacing={2}>
          <Typography variant="body1" sx={{ fontSize: "large" }}>
            Order ID: <span style={{ color: "#b0aeac" }}>{id}</span>
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "large" }}>
            Ordered On:{" "}
            <span style={{ color: "#b0aeac" }}>
              {moment(createdAt.toDate()).format("LLL")}
            </span>
          </Typography>
          <Typography variant="body1" sx={{ fontSize: "larger" }}>
            Order Amount:{" "}
            <span
              style={{
                color: "#faa225",
              }}
            >
              {formatPrice(orderAmount)}
            </span>
          </Typography>
        </Stack>

        <Stack spacing={2} direction={{ xs: "column", sm: "row", md: "column" }} mt={{xs: 3, md:0}}>
          <Typography variant="body1" sx={{ fontSize: "large" }}>
            Order Status:
          </Typography>
          <OrderStatusChip orderStatus={orderStatus}/>
        </Stack>
      </Stack>
    </ShadowContainer>
  );
};

export default Order;

Order.propTypes = {
  order: PropType.object.isRequired,
};