import React from "react";
import Banner from "../product/banner/Banner";
import ProductGrid from "../product/ProductGrid";
import ProductGridSkeleton from "../product/skeleton/ProductGridSkeleton";
import PropType from "prop-types";
import CustomContainer from "../common/layout/CustomContainer";

const ProductCategory = ({
  isLoading,
  categoriesdProducts,
  bannerDesc,
  bannerImg,
}) => {
  return (
    <CustomContainer>
      <Banner bannerDesc={bannerDesc} bannerImg={bannerImg} />
      {isLoading ? (
        <ProductGridSkeleton columns={5} />
      ) : (
        <ProductGrid products={categoriesdProducts} columns={5} />
      )}
    </CustomContainer>
  );
};

export default ProductCategory;

ProductCategory.propTypes = {
  isLoading: PropType.bool.isRequired,
  categoriesdProducts: PropType.array,
  bannerDesc: PropType.string.isRequired,
  bannerImg: PropType.string.isRequired,
};
