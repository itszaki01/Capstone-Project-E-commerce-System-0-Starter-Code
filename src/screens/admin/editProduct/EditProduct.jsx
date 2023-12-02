import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Skeleton, Typography } from "@mui/material";
import ProductForm from "../../../components/form/productForm/ProductForm";
import { useEditProductMutation, useGetProductByIdQuery } from "../../../redux/services/products/productsApiService";
import { handleFirebaseAuthErrors } from "../../../helpers/firebaseErrors";
import { ADMIN_PRODUCTS } from "../../../constants/routes";
import { toast } from "react-toastify";

const EditProduct = () => {
    const { id } = useParams();
    const { data: product, isLoading } = useGetProductByIdQuery(id);
    const [editProduct,{isLoading:isLoadingEdit}] = useEditProductMutation();
    const navigate = useNavigate()
    const onSubmitForm = async (productData) => {
        try {
            await editProduct({ productData, product }).unwrap()
            navigate(ADMIN_PRODUCTS)
            toast.success('Product Updated Successfuly')
        } catch (error) {
            handleFirebaseAuthErrors(error.message)
        }
    };

    return (
        <Box>
            {isLoading ? (
                <Skeleton variant="rectangular" height={600} />
            ) : (
                <>
                    <Typography variant="h3">Edit Product</Typography>
                    <ProductForm product={product} onSubmitForm={onSubmitForm} isLoading={isLoading || isLoadingEdit} />
                </>
            )}
        </Box>
    );
};

export default EditProduct;
