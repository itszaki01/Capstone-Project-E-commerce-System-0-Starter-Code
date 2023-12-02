import React, { lazy, Suspense, useState } from "react";

import AsideFilters from "./components/AsideFilters";
const ProductGrid = lazy(() => import("../../components/product/ProductGrid"));

import ProductsList from "../../components/product/ProductsList";
import ProductGridSkeleton from "../../components/product/skeleton/ProductGridSkeleton";

import VerticalLayout from "../../components/common/layout/VerticalLayout";
import CustomContainer from "../../components/common/layout/CustomContainer";
import { productData } from "../../data/productData";
import { useGetAllProductsQuery } from "../../redux/services/products/productsApiService";
import { useSelector } from "react-redux";
import { selectFilter } from "../../selectors/selector";

const Shop = () => {
    const { data: products, isLoading } = useGetAllProductsQuery();
    const store = useSelector((state) => ({
        filtredProducts: selectFilter(products, state.filter),
    }));

    return (
        <CustomContainer>
            <VerticalLayout>
                <AsideFilters productsData={products} isLoading={isLoading} />
                <ProductsList filteredProducts={store.filtredProducts}>
                    <Suspense fallback={<ProductGridSkeleton columns={4} />}>
                        <ProductGrid products={store.filtredProducts} isLoading={isLoading} columns={4} />
                    </Suspense>
                </ProductsList>
            </VerticalLayout>
        </CustomContainer>
    );
};

export default Shop;
