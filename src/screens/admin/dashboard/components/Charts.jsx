import React, { useState } from "react";
import { Box, Skeleton, Stack } from "@mui/material";
import EarningsChart from "./chart/EarningsChart";
import OrdersStatusChart from "./chart/OrdersStatusChart";
import { useGetAllOrdersQuery } from "../../../../redux/services/orders/ordersApiService";

const Charts = () => {
  const {data:orders,isLoading} = useGetAllOrdersQuery()

  return (
    <>
      {isLoading ? (
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          mt={5}
        >
          <Skeleton variant="rectangular" height={300} width={550} />
          <Skeleton variant="rectangular" height={300} width={550} />
        </Stack>
      ) : (
        orders && (
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={{ xs: 0, md: 2 }}
            alignItems="center"
          >
            <Box width={{ xs: "100%", md: "50%" }}>
              <EarningsChart orders={orders} />
            </Box>
            <Box width={{ xs: "100%", md: "50%" }}>
              <OrdersStatusChart orders={orders} />
            </Box>
          </Stack>
        )
      )}
    </>
  );
};

export default Charts;
