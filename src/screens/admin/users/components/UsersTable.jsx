import React from "react";
import PropType from "prop-types";
import { Avatar, Box, Chip, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import OrderStatusChip from "../../../../components/order/OrderStatusChip";
import { useMemo } from "react";
import moment from "moment";
import { formatPrice } from "../../../../helpers/utils";
import { Edit } from "@mui/icons-material";

const UsersTable = ({ isLoading, data }) => {
    const memoizedData = useMemo(() => data, [data]);
    console.log(data);
    const columns = useMemo(
        () => [
            {
                accessorKey: "fullname",
                header: "Name",
                Cell: ({ cell, row }) => (
                    <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <Avatar alt={cell.getValue()} src={row.original.avatar} loading="lazy"></Avatar>
                        <span>{cell.getValue()}</span>
                    </Box>
                ),
            },
            {
                accessorKey: "email",
                header: "email",
                Cell: ({ cell, row }) => (
                    <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <span>{cell.getValue()}</span>
                    </Box>
                ),
            },
            {
                accessorKey: "date_joined",
                header: "Date Joined",
                Cell: ({ cell, row }) => (
                    <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <span>{cell.getValue()}</span>
                    </Box>
                ),
            },
            {
                accessorKey: "mobile",
                header: "Phone Number",
                Cell: ({ cell, row }) => (
                    <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        {!!cell.getValue()?<span>{cell.getValue()}</span>:<span>Not set yet</span>}
                    </Box>
                ),
            },
        ],
        []
    );
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

export default UsersTable;

UsersTable.propTypes = {
    isLoading: PropType.bool.isRequired,
    data: PropType.array,
};
