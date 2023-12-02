import React, { useState } from "react";
import BannerImage from "../../assets/new-arrivals-banner.png";
import ProductCategory from "../../components/productCategory/ProductCategory";
import { productData } from "../../data/productData";
import { useGetProductsByTypeQuery } from "../../redux/services/products/productsApiService";

const NewArrivals = () => {
  const {data,isLoading} = useGetProductsByTypeQuery('isNewArrival')
  return (
    <ProductCategory
      isLoading={isLoading}
      categoriesdProducts={data}
      bannerDesc="NewArrivals"
      bannerImg={BannerImage}
    />
  );
};

export default NewArrivals;
