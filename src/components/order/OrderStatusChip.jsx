import {
  HourglassTop,
  Inventory2Outlined,
  LocalShippingOutlined,
  ShoppingBagOutlined,
} from "@mui/icons-material";
import { Chip } from "@mui/material";
import React from "react";
import PropType from "prop-types";

const OrderStatusChip = ({ orderStatus }) => {
  return (
    <Chip
      sx={{ px: 2 }}
      label={orderStatus}
      color={
        orderStatus === "Processing..."
          ? "warning"
          : orderStatus === "Shipped..."
          ? "info"
          : orderStatus === "Delivered"
          ? "success"
          : "primary"
      }
      variant="outlined"
      icon={
        orderStatus === "Processing..." ? (
          <HourglassTop />
        ) : orderStatus === "Shipped..." ? (
          <LocalShippingOutlined />
        ) : orderStatus === "Delivered" ? (
          <Inventory2Outlined />
        ) : (
          <ShoppingBagOutlined />
        )
      }
    />
  );
};

export default OrderStatusChip;
OrderStatusChip.propTypes = {
  orderStatus: PropType.string.isRequired,
};
