import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { ArrowBack, Save } from "@mui/icons-material";
import { DevTool } from "@hookform/devtools";
import SubmitButton from "../../../../components/common/button/SubmitButton";
import PropType from "prop-types";
import { useCreateNewBrandsMutation } from "../../../../redux/services/brands/brandsApiService";

const BrandsFormDialog = ({ open, handleClose, brand, onSubmitForm, isLoading }) => {
    
    const {
        register,
        control,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onSubmit",
        defaultValues: brand,
    });

    const onSubmit = (data) => {
        onSubmitForm(data);
        reset();
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogTitle>Add New Brand</DialogTitle>
                    <DialogContent>
                        <DialogContentText>To add new Brand for your products, please enter the name of the brand here.</DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Brand Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            {...register("name", {
                                required: "Brand name is required",
                            })}
                            error={!!errors.name}
                            helperText={errors.name?.message}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} startIcon={<ArrowBack />}>
                            Cancel
                        </Button>
                        <SubmitButton Icon={<Save />} isLoading={isLoading} disabled={isLoading}>
                            Save Brand
                        </SubmitButton>
                    </DialogActions>
                </form>
            </Dialog>

        </>
    );
};

export default BrandsFormDialog;

BrandsFormDialog.propTypes = {
    open: PropType.bool.isRequired,
    handleClose: PropType.func.isRequired,
    brand: PropType.string,
    onSubmitForm: PropType.func.isRequired,
    isLoading: PropType.bool,
};
