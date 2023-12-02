import { Skeleton, Stack } from "@mui/material";
import React, { useState } from "react";
import InfoCard from "./InfoCard";
import { AttachMoney, Inventory, People, ShoppingCart } from "@mui/icons-material";
import { useGetAllProductsQuery } from "../../../../redux/services/products/productsApiService";
import { useGetAllOrdersQuery } from "../../../../redux/services/orders/ordersApiService";
import { calculateTotalAmount } from "../../../../helpers/utils";
import { useGetAllUsersQuery } from "../../../../redux/services/users/userApiService";

const InfoContainer = () => {
    const { data: productsList, isLoading: isLoadingProducts } = useGetAllProductsQuery();
    const { data: orders, isLoading: isLoadingOrders } = useGetAllOrdersQuery();
    const { data: users, isLoading: isLoadingUsers } = useGetAllUsersQuery();

    return (
        <>
            {isLoadingOrders || isLoadingProducts || isLoadingUsers ? (
                <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between">
                    <Skeleton width={250} height={170} />
                    <Skeleton width={250} height={170} />
                    <Skeleton width={250} height={170} />
                    <Skeleton width={250} height={170} />
                </Stack>
            ) : (
                <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between">
                    <InfoCard
                        title="Earnings"
                        count={orders ? calculateTotalAmount(orders) : 0}
                        icon={<AttachMoney sx={{ color: "#F65868" }} />}
                        bgColor="#F9DDDC"
                    />
                    <InfoCard title="Orders" count={orders?.length ?? 0} icon={<ShoppingCart sx={{ color: "#2EC1BA" }} />} bgColor="#D5F3F2" />
                    <InfoCard
                        title="Products"
                        count={productsList ? productsList.length : 0}
                        icon={<Inventory sx={{ color: "#EE9D02" }} />}
                        bgColor="#F8ECDC"
                    />
                    <InfoCard title="Users" count={users?.length} icon={<People sx={{ color: "#8498A4" }} />} bgColor="#D3EDF9" />
                </Stack>
            )}
        </>
    );
};

export default InfoContainer;
