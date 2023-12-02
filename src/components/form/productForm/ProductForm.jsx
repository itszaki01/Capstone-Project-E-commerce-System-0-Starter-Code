import React from "react";
import PropType from "prop-types";
import { Controller, useForm } from "react-hook-form";
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Grid, Stack, TextField } from "@mui/material";
import { DevTool } from "@hookform/devtools";
import CustomCreatableSelect from "./CustomCreatableSelect";
import SubmitButton from "../../common/button/SubmitButton";
import CustomSelect from "./CustomSelect";
import { ArrowBack, Collections, Image, Save } from "@mui/icons-material";
import ThumbnailImagePreview from "./ThumbnailImagePreview";
import { useNavigate } from "react-router-dom";
import { ADMIN_PRODUCTS } from "../../../constants/routes";
import { colorOptions } from "../../../constants/selectOptions";
import useFileHandler from "../../../hooks/useFileHandler";
import ImagePreview from "./ImagePreview";
import { toast } from "react-toastify";
import { serverTimestamp } from "firebase/firestore";
import { useGetAllBrandsQuery } from "../../../redux/services/brands/brandsApiService";

const ProductForm = ({ product, onSubmitForm, isLoading }) => {
    const { data: brandsData } = useGetAllBrandsQuery();
    const brandOptions = brandsData?.map((brand) => ({ value: brand.name, label: brand.name }));
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onBlur",
        defaultValues: product,
    });

    const navigate = useNavigate();

    const { imageFile, isFileLoading, onFileChange, removeImage } = useFileHandler({
        image: {},
        imageCollection: product?.imageCollection || [],
    });

    const onSubmit = (data) => {
        if (imageFile.image.file || data.image !== "" || product.image) {
            const productData = {
                ...data,
                remainingQty: Number(data.maxQuantity),
                image: imageFile?.image.file || product.image,
                imageCollection: imageFile.imageCollection,
                name_lower: data.name.toLowerCase(),
                dateAdded: serverTimestamp(),
            };
            onSubmitForm(productData);
        } else {
            toast.error("Thumbnail Is Required");
        }
    };

    const iconStyles = {
        p: 1,
        borderRadius: "50%",
        color: "gray",
        border: "2px solid gray",
        cursor: "pointer",
        "&:hover": {
            border: "2px solid #ff9800",
            color: "#e38b06",
        },
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack
                    height="max-content"
                    direction={{ xs: "column", md: "row" }}
                    spacing={3}
                    alignItems="flex-start"
                    sx={{
                        mt: 5,
                        height: "max-content",
                    }}
                >
                    <Box
                        sx={{
                            width: { xs: "90%", md: "48%" },
                        }}
                    >
                        <Stack spacing={4}>
                            <FormControl>
                                <TextField
                                    required
                                    label="Product Name"
                                    type="text"
                                    {...register("name")}
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                />
                                <FormHelperText>Do not exceed 40 characters when entering the product name</FormHelperText>
                            </FormControl>

                            <Stack direction="row" spacing={5}>
                                <FormControl fullWidth>
                                    <TextField
                                        required
                                        label="Price (USD)"
                                        type="number"
                                        {...register("price")}
                                        error={!!errors.price}
                                        helperText={errors.price?.message}
                                    />
                                </FormControl>

                                <FormControl fullWidth>
                                    <TextField
                                        required
                                        label="Max Quantity"
                                        type="number"
                                        {...register("maxQuantity")}
                                        error={!!errors.maxQuantity}
                                        helperText={errors.maxQuantity?.message}
                                    />
                                </FormControl>
                            </Stack>

                            <FormControl error={!!errors.brand}>
                                <FormLabel sx={{ mb: 1 }} required>
                                    Brand
                                </FormLabel>
                                <CustomSelect
                                    control={control}
                                    selectName="brand"
                                    selectPlaceholder="Select Product Brand"
                                    disabled={isLoading}
                                    selectOptions={brandOptions}
                                    defaultValue={{
                                        lable: product.brand,
                                        value: product.brand,
                                    }}
                                />
                            </FormControl>

                            <Stack direction={{ xs: "column", md: "row" }} spacing={5}>
                                <FormControl fullWidth error={!!errors.designDetails}>
                                    <FormLabel sx={{ mb: 1 }} required>
                                        {" "}
                                        Design Details
                                    </FormLabel>
                                    <CustomCreatableSelect
                                        control={control}
                                        selectName="designDetails"
                                        selectPlaceholder="Create Product Details"
                                        defaultValue={product.designDetails.map((key) => ({
                                            lable: key,
                                            value: key,
                                        }))}
                                    />
                                </FormControl>

                                <FormControl fullWidth error={!!errors.sizes}>
                                    <FormLabel sx={{ mb: 1 }} required>
                                        {" "}
                                        Sizes
                                    </FormLabel>
                                    <CustomCreatableSelect
                                        control={control}
                                        selectName="sizes"
                                        selectPlaceholder="Create Product Sizes"
                                        defaultValue={product.sizes.map((key) => ({
                                            lable: key,
                                            value: key,
                                        }))}
                                    />
                                </FormControl>
                            </Stack>
                            <FormControl>
                                <TextField
                                    required
                                    label=" Description"
                                    type="text"
                                    multiline
                                    rows={3}
                                    {...register("description")}
                                    error={!!errors.description}
                                    helperText={errors.description?.message}
                                />
                            </FormControl>

                            <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 4, sm: 8, md: 13 }} color="gray">
                                <Stack spacing={1}>
                                    <FormGroup>
                                        <FormControlLabel
                                            control={
                                                <Controller
                                                    name="isNewArrival"
                                                    control={control}
                                                    defaultValue={false}
                                                    render={({ field }) => <Checkbox {...field} checked={!!field.value} />}
                                                />
                                            }
                                            label="Add to New Arrival"
                                        />

                                        <FormControlLabel
                                            control={
                                                <Controller
                                                    name="isFeatured"
                                                    control={control}
                                                    defaultValue={false}
                                                    render={({ field }) => <Checkbox {...field} checked={!!field.value} />}
                                                />
                                            }
                                            label="Add to Featured"
                                        />

                                        <FormControlLabel
                                            control={
                                                <Controller
                                                    name="isRecommended"
                                                    control={control}
                                                    defaultValue={false}
                                                    render={({ field }) => <Checkbox {...field} checked={!!field.value} />}
                                                />
                                            }
                                            label="Add to Recommended"
                                        />
                                    </FormGroup>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Box>

                    <Box
                        sx={{
                            width: { xs: "90%", md: "50%" },
                            pl: { md: 2 },
                        }}
                    >
                        <Stack spacing={4}>
                            <Stack direction={{ xs: "column", md: "row" }} spacing={3} mb={2}>
                                <Stack spacing={{ xs: 4, md: 10 }}>
                                    <Stack direction="row" spacing={6} justifyContent="space-between">
                                        <FormControl>
                                            <FormLabel sx={{ mb: 2 }} required>
                                                {" "}
                                                Thumbnail
                                            </FormLabel>
                                            <label htmlFor="image">
                                                <input
                                                    {...register("image")}
                                                    hidden
                                                    accept="image/*"
                                                    disabled={isLoading}
                                                    type="file"
                                                    id="image"
                                                    onChange={(e) => onFileChange(e, { name: "image", type: "single" })}
                                                />

                                                <Image sx={iconStyles} />
                                            </label>
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel sx={{ mb: 2 }}>Image Collection</FormLabel>
                                            <label htmlFor="images">
                                                <input
                                                    {...register("imageCollection")}
                                                    hidden
                                                    multiple
                                                    accept="image/*"
                                                    disabled={isLoading}
                                                    type="file"
                                                    id="images"
                                                    onChange={(e) => onFileChange(e, { name: "imageCollection", type: "multiple" })}
                                                />

                                                <Collections sx={iconStyles} />
                                            </label>
                                        </FormControl>
                                    </Stack>
                                    <FormControl required>
                                        <FormLabel sx={{ mb: 2 }}>Select Product Color</FormLabel>
                                        <CustomSelect
                                            control={control}
                                            selectName="color"
                                            selectPlaceholder="Select Product Brand"
                                            defaultValue={{
                                                lable: product.color,
                                                value: product.color,
                                            }}
                                            selectOptions={colorOptions}
                                        />
                                    </FormControl>
                                </Stack>

                                <ThumbnailImagePreview
                                    imageFileUrl={imageFile.image.url}
                                    productImage={product.image}
                                    isFileLoading={isFileLoading}
                                />
                            </Stack>

                            <Box height={{ xs: "max-content", sm: "23rem", md: "25rem" }}>
                                {imageFile.imageCollection.length >= 1 && (
                                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 3, sm: 2, md: 4 }} height={"100%"} overflow={"scroll"}>
                                        {imageFile.imageCollection?.map((image) => (
                                            <ImagePreview
                                                key={image.id}
                                                imageSrc={image.url}
                                                onClickHandler={() => removeImage({ id: image.id, name: "imageCollection" })}
                                            />
                                        ))}
                                    </Grid>
                                )}
                            </Box>

                            <Stack justifyContent="space-evenly" direction="column" spacing={4}>
                                <SubmitButton Icon={<Save />} isLoading={isLoading}>
                                    Save Product
                                </SubmitButton>
                                <Button variant="outlined" onClick={() => navigate(ADMIN_PRODUCTS)} startIcon={<ArrowBack />}>
                                    Cancel
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </form>
            <DevTool control={control} />
        </>
    );
};

export default ProductForm;

ProductForm.propTypes = {
    product: PropType.shape({
        name: PropType.string,
        brand: PropType.string,
        color: PropType.string,
        description: PropType.string,
        image: PropType.string,
        designDetails: PropType.arrayOf(PropType.string),
        sizes: PropType.arrayOf(PropType.string),
        imageCollection: PropType.arrayOf(PropType.object),
        isFeatured: PropType.bool,
        isNewArrival: PropType.bool,
        isRecommended: PropType.bool,
    }).isRequired,
};
