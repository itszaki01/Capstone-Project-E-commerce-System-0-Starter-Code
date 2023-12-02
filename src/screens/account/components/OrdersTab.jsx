import React, { useState } from "react";
import { Box, Skeleton, Stack, Typography } from "@mui/material";
import Order from "../../../components/order/Order";
import { useGetUserOrdersQuery } from "../../../redux/services/orders/ordersApiService";
import { useSelector } from "react-redux";
import { profileSliceSelector } from "../../../redux/features/profile/porfileSlice";

const OrdersTab = () => {
    const { userProfile } = useSelector(profileSliceSelector);
    const { data: orders, isLoading } = useGetUserOrdersQuery(userProfile.id);

    return (
        <Box>
            {isLoading ? (
                <>
                    <Skeleton height={100} sx={{ mb: 3 }} />
                    <Skeleton variant="rectangular" height={300} />
                </>
            ) : !isLoading && !orders ? (
                <Box height="60vh" display="flex" justifyContent="center" alignItems="center">
                    <Stack>
                        <Typography variant="body1">You don't have any orders yet</Typography>
                    </Stack>
                </Box>
            ) : (
                <Box key={'ff'} my={5} px={2}>
                    <Typography variant="h2">All Orders ({orders?.length})</Typography>

                    {orders?.map((order) => (
                        <Order key={order.id} order={order} />
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default OrdersTab;
