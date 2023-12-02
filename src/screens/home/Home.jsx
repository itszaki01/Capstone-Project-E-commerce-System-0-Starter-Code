import React from "react";
import Hero from "./components/Hero";
import ProductShowcase from "../../components/product/ProductShowcase";
import CustomContainer from "../../components/common/layout/CustomContainer";

const Home = () => {
  return (
    <CustomContainer>
      <Hero />
      <ProductShowcase productType="isNewArrival" />
      <ProductShowcase productType="isFeatured" />
    </CustomContainer>
  );
};

export default Home;
