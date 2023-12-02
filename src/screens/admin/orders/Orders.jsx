import React from "react";
import AdminTopToolbar from "../../../components/common/toolbar/AdminTopToolbar";
import OrdersTable from "./components/OrdersTable";
import { useGetAllOrdersQuery } from "../../../redux/services/orders/ordersApiService";

const Orders = () => {
  const {data,isLoading} = useGetAllOrdersQuery()
  return (
    <>
      <AdminTopToolbar
        heading="Orders"
        isLoading={isLoading}
        totalCount={data?.length ?? 0}
      />

      <OrdersTable isLoading={isLoading} data={data} />
    </>
  );
};

export default Orders;
