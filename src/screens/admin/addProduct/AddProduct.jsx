import React from "react";
import ProductForm from "../../../components/form/productForm/ProductForm";
import { Box, Typography } from "@mui/material";
import { useCreateNewProductMutation } from "../../../redux/services/products/productsApiService";
import { toast } from "react-toastify";
import { handleFirebaseAuthErrors } from "../../../helpers/firebaseErrors";
import { useNavigate } from "react-router-dom";
import { ADMIN_PRODUCTS } from "../../../constants/routes";

const AddProduct = () => {
    const [createNewProduct, { isLoading }] = useCreateNewProductMutation();
    const navigate = useNavigate()
    const onSubmitForm = async (product) => {
        console.log(product);
        try {
            await createNewProduct(product).unwrap();
            toast.success("Product Added Successfuly");
            navigate(ADMIN_PRODUCTS)
        } catch (error) {
            handleFirebaseAuthErrors(error.message);
        }
    };
    return (
        <Box>
            <Typography variant="h3">Add New Product</Typography>
            <ProductForm
                product={{
                    name: "",
                    brand: "",
                    color: "",
                    description: "",
                    image: "",
                    price: 0,
                    maxQuantity: 0,
                    remainingQty: 0,
                    designDetails: [],
                    sizes: [],
                    imageCollection: [],
                    isFeatured: false,
                    isNewArrival: false,
                    isRecommended: false,
                }}
                onSubmitForm={onSubmitForm}
                isLoading={isLoading}
            />
        </Box>
    );
};

export default AddProduct;
