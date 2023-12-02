import React from "react";
import AdminTopToolbar from "../../../components/common/toolbar/AdminTopToolbar";
import ProductsTable from "./components/ProductsTable";
import { useGetAllProductsQuery } from "../../../redux/services/products/productsApiService";

const Products = () => {
  const {data:productsList,isLoading} = useGetAllProductsQuery()

  return (
    <>
      <AdminTopToolbar
        heading="Products"
        isLoading={isLoading}
        totalCount={productsList?.length || 0}
      />
      <ProductsTable isLoading={isLoading} data={productsList || []} />
    </>
  );
};

export default Products;
