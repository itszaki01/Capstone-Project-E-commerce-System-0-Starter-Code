import React, { useState } from "react";
import AdminTopToolbar from "../../../components/common/toolbar/AdminTopToolbar";
import BrandsFormDialog from "./components/BrandsFormDialog";
import BrandsTable from "./components/BrandsTable";
import { useCreateNewBrandsMutation, useGetAllBrandsQuery } from "../../../redux/services/brands/brandsApiService";
import { toast } from "react-toastify";

const Brands = () => {
    const { data, isLoading } = useGetAllBrandsQuery();
    const [createNewBrands, { isLoading: isCreating }] = useCreateNewBrandsMutation();
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onAddSubmit = async (brand) => {
        try {
            await createNewBrands(brand).unwrap();
            toast.success('Brand Added Succesfuly')
            setOpen(false)
        } catch (error) {
          toast.error(error.message)
        }
    };

    
    return (
        <>
            <AdminTopToolbar heading="Brands" isLoading={isLoading} totalCount={data?.length} />
            <BrandsFormDialog open={open} handleClose={handleClose} onSubmitForm={onAddSubmit} />
            <BrandsTable isLoading={isCreating} data={data} handleDialogOpen={handleClickOpen} />
        </>
    );
};

export default Brands;
