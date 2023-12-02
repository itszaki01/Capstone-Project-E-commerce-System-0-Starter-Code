import React, { useState } from "react";
import BannerImage from "../../assets/recommended-products-banner.png";
import ProductCategory from "../../components/productCategory/ProductCategory";
import { useGetProductsByTypeQuery } from "../../redux/services/products/productsApiService";

const Recommended = () => {
  
  const {data,isLoading} = useGetProductsByTypeQuery('isRecommended')


  return (
    <ProductCategory
      isLoading={isLoading}
      categoriesdProducts={data}
      bannerDesc="Recommended Products"
      bannerImg={BannerImage}
    />
  );
};

export default Recommended;
