import React, { useMemo } from "react";
import PropType from "prop-types";
import { MaterialReactTable } from "material-react-table";
import { Box, Chip, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import SecondaryButton from "../../../../components/common/button/SecondaryButton";
import { Add, Delete, Edit } from "@mui/icons-material";
import { useDeleteBrandMutation, useEditeBrandMutation } from "../../../../redux/services/brands/brandsApiService";
import { toast } from "react-toastify";
const BrandsTable = ({ isLoading, data, handleDialogOpen }) => {
    const memoizedData = useMemo(() => data, [data]);
    const [deleteBrand] = useDeleteBrandMutation()
    const [editeBrand] = useEditeBrandMutation()
    const columns = useMemo(
        () => [
            {
                accessorKey: "name",
                header: "Brand Name",
                size: 800,
            },
        ],
        []
    );
    async function handleDeleteBrandClick(id) {
       try {
        //   await deleteBrand(id).unwrap()
          toast.success('Brande Deleted Successfuly')
        } catch (error) {
          toast.error(error.message)
       }
    }

    async function handleEditRowSave({row,values,exitEditingMode}) {

      try {
        //  await editeBrand({name:values.name,id:row.original.id}).unwrap()
         toast.success('Brande Updated Successfuly')
         exitEditingMode()
       } catch (error) {
         toast.error(error.message)
      }
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
            editDisplayMode="modal"
            onEditingRowSave={handleEditRowSave}
            positionActionsColumn="last"
            renderTopToolbarCustomActions={() => (
                <SecondaryButton size={"small"} type={"submit"} onClickHandler={() => handleDialogOpen()} startIcon={<Add />}>
                    Create New Brand
                </SecondaryButton>
            )}
            renderRowActionMenuItems={({ row,table }) => [
                <MenuItem key={"edit"} onClick={() => table.setEditingRow(row)}>
                    <ListItemIcon>
                        <Edit />
                    </ListItemIcon>
                    <ListItemText>Edit</ListItemText>
                </MenuItem>,
                <MenuItem key={"delete"} onClick={() => handleDeleteBrandClick(row.original.id)}>
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

export default BrandsTable;

BrandsTable.propTypes = {
    isLoading: PropType.bool.isRequired,
    data: PropType.array,
    handleDialogOpen: PropType.func.isRequired,
};
