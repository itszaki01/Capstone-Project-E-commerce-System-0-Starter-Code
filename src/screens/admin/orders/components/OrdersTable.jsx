import { Box, Chip, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import PropType from "prop-types";
import SecondaryButton from "../../../../components/common/button/SecondaryButton";
import { Add, Delete, Edit } from "@mui/icons-material";
import { useMemo } from "react";
import moment from "moment";
import { formatPrice } from "../../../../helpers/utils";
import OrderStatusChip from "../../../../components/order/OrderStatusChip";
import { useNavigate } from "react-router-dom";

const OrdersTable = ({ isLoading, data }) => {
  const navigate = useNavigate()
    const memoizedData = useMemo(() => data, [data]);
    const columns = useMemo(
        () => [
            {
                accessorKey: "createdAt",
                header: "Ordered On",
                Cell: ({ cell }) => <span>{moment(cell.getValue()?.toDate()).format("LLLL")}</span>,
                size: 160,
                enableColumnFilter: false,
            },
            {
                accessorKey: "userFulllName",
                header: "Ordered By",
                size: 160,
            },
            {
                accessorKey: "orderAmount",
                header: "Ordere Amount",
                Cell: ({ cell }) => <span style={{ color: "orange", fontSize: "larger" }}>{formatPrice(cell.getValue())}</span>,
                size: 170,
            },
            {
              accessorKey: "orderStatus",
              header: "Ordere Status",
              Cell: ({ cell }) => <OrderStatusChip orderStatus={cell.getValue()}/>,
              size: 170,
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
            enableRowActions
            positionActionsColumn="last"
            renderRowActionMenuItems={({ row }) => [
                <MenuItem key={"edit"} onClick={() => navigate(`/admin/orders/${row.original.id}`)}>
                    <ListItemIcon>
                        <Edit />
                    </ListItemIcon>
                    <ListItemText>View Order</ListItemText>
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

export default OrdersTable;

OrdersTable.propTypes = {
    isLoading: PropType.bool.isRequired,
    data: PropType.array,
};
