import React, { useMemo } from "react";
import PropType from "prop-types";
import { MaterialReactTable } from "material-react-table";
import { Box, Chip, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { formatPrice } from "../../../../helpers/utils";
import moment from "moment/moment";
import { Add, Delete, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDeleteProductMutation } from "../../../../redux/services/products/productsApiService";
import SecondaryButton from "../../../../components/common/button/SecondaryButton";
import { ADMIN_ADD_PRODUCT } from "../../../../constants/routes";
import Swal from "sweetalert2";
import { handleFirebaseAuthErrors } from "../../../../helpers/firebaseErrors";

const ProductsTable = ({ isLoading, data }) => {
    const navigate = useNavigate();
    const [deleteProduct] = useDeleteProductMutation();
    const memoizedData = useMemo(() => data, [data]);
    const columns = useMemo(
        () => [
            {
                accessorKey: "image",
                header: "Images",
                Cell: ({ cell }) => (
                    <Box width={"80%"} bgcolor={"#F4F4F4"}>
                        <img
                            src={cell.getValue()}
                            width={"100%"}
                            height={"100%"}
                            style={{ objectFit: "contain", objectPosition: "center" }}
                            loading="lazy"
                        />
                    </Box>
                ),
                size: 100,
                enableColumnFilter: false,
            },
            {
                accessorKey: "name",
                header: "Name",
                size: 160,
            },
            {
                accessorKey: "brand",
                header: "Brand",
            },
            {
                accessorKey: "remainingQty",
                header: "Quantity",
                Cell: ({ cell, row }) => {
                    const remainingQuantity = cell.getValue();
                    if (remainingQuantity != 0) {
                        return <span style={{color:'green'}}>{`${remainingQuantity} / ${row.original.maxQuantity}`} </span>
                    } else {
                        return <span style={{color:'red'}}>{`${remainingQuantity} / ${row.original.maxQuantity}`} </span>;
                    }
                },
                size: 110,
                enableColumnFilter: false,
            },
            {
                accessorKey: "color",
                header: "Color",
            },
            {
                accessorKey: "size",
                header: "Size",
            },
            {
                accessorKey: "isNewArrival",
                header: "New Arrival?",
                Cell: ({ cell }) => {
                    return <Chip label={cell.getValue() ? "Yes" : "No"} variant="outlined" />;
                },
                size: 150,
                enableColumnFilter: false,
            },
            {
                accessorKey: "price",
                header: "Price",
                Cell: ({ cell }) => {
                    return <Chip label={formatPrice(cell.getValue())} color="primary" variant="contained" />;
                },
                size: 100,
            },
            {
                accessorKey: "dateAdded",
                header: "Last Modification",
                Cell: ({ cell }) => {
                    return <span>{moment(cell.getValue()?.toDate()).fromNow()}</span>;
                },
                size: 190,
                enableColumnFilter: false,
            },
        ],
        []
    );
    function handleDeleteProductClick(product) {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            try {
                if (result.isConfirmed) {
                    //Disable Delete
                    // await deleteProduct(product).unwrap(); 
                    Swal.fire({
                        title: "Deleted!",
                        text: "(Test Mod) Product Deleted.",
                        icon: "success",
                    });
                }
            } catch (error) {
                handleFirebaseAuthErrors(error.message)
            }
        });
    }
    return (
        <MaterialReactTable
            columns={columns}
            data={memoizedData ?? []}
            state={{ isLoading }}
            enablePinning
            enableRowNumbers
            enableColumnResizing
            rowNumberDisplayMode="static"
            enableStickyHeader
            columnResizeMode="onChange"
            enableRowActions
            positionActionsColumn="last"
            renderTopToolbarCustomActions={() => (
                <SecondaryButton size={"small"} type={"submit"} onClickHandler={() => navigate(ADMIN_ADD_PRODUCT)} startIcon={<Add />}>
                    Create New Product
                </SecondaryButton>
            )}
            renderRowActionMenuItems={({ row }) => [
                <MenuItem key={"edit"} onClick={() => navigate(`/admin/products/edit/${row.original.id}`)}>
                    <ListItemIcon>
                        <Edit />
                    </ListItemIcon>
                    <ListItemText>Edit</ListItemText>
                </MenuItem>,
                <MenuItem key={"delete"} onClick={() => handleDeleteProductClick(row.original)}>
                    <ListItemIcon>
                        <Delete sx={{ color: "red" }} />
                    </ListItemIcon>
                    <ListItemText sx={{ color: "red" }}>Delete</ListItemText>
                </MenuItem>,
            ]}
            muiTablePaperProps={{
                sx: {
                    maxWidth: { xs: 360, sm: 530, md: "100%" },
                },
            }}
            muiTableContainerProps={{
                sx: {
                    maxHeight: { md: 500 },
                },
            }}
        />
    );
};

export default ProductsTable;

ProductsTable.propTypes = {
    isLoading: PropType.bool.isRequired,
    data: PropType.array,
};
