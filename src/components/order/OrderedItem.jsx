import { Avatar, Box, Stack, Typography } from "@mui/material";
import React from "react";
import { formatPrice } from "../../helpers/utils";
import PropType from "prop-types";


const OrderedItem = ({ item }) => {
  const { image, name, brand, color, price, quantity } = item;

  // console.log(item);
  return (
    <Stack
      direction="row"
      alignItems="center"
      mt={3}
    >
      <Box
        sx={{
          height: 100,
          width: 100,
          display: "flex",
          justifyContent: "center",
          p: 2,
          mr: 2,
          border: "1px solid #c5c3c1",
          borderRadius: 2,
          bgcolor: "#f9f9f9",
        }}
      >
        <Avatar variant="square" src={image} sx={{ height: 100, width: 65 }} />
      </Box>

      <Stack width="100%" direction="row" justifyContent="space-between">
        <Stack spacing={1}>
          <Typography variant="body1" sx={{ fontSize: "larger" }}>
            {name}
          </Typography>
          <Typography variant="body1" color="gray">
            {brand} | {color}
          </Typography>
        </Stack>

        <Stack alignItems="flex-end" spacing={1}>
          <Typography variant="body1" sx={{ fontSize: "larger" }}>
            {formatPrice(price)}
          </Typography>
          <Typography variant="body1" color="gray">
            QTY: {quantity}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default OrderedItem;
OrderedItem.propTypes = {
  item: PropType.object.isRequired,
};
