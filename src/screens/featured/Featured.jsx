import React, { useState } from "react";
import BannerImage from "../../assets/featured-products-banner.png";
import ProductCategory from "../../components/productCategory/ProductCategory";
import { productData } from "../../data/productData";
import { useGetProductsByTypeQuery } from "../../redux/services/products/productsApiService";

const Featured = () => {

  const {data,isLoading} = useGetProductsByTypeQuery('isFeatured')

  return (
    <ProductCategory
      isLoading={isLoading}
      categoriesdProducts={data}
      bannerDesc="Featured Products"
      bannerImg={BannerImage}
    />
  );
};

export default Featured;
