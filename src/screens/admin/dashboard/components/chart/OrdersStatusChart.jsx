import React, { useMemo } from "react";
import ShadowContainer from "../../../../../components/common/layout/ShadowContainer";
import { Box } from "@mui/material";
import PropType from "prop-types";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: "Orders Stutus Chart",
        },
    },
};
const orderStatusLables = ["Order Placed...", "Processing...", "Shipped...", "Delivered"];

const OrdersStatusChart = ({ orders }) => {
    const chartLabels = orderStatusLables.map((state) => state.replace("...", ""));
    const prepareChartData = () => {
        const ordersByStatus = {};
        for (let order of orders) {
            const status = order.orderStatus;
            if (!ordersByStatus[status]) {
                ordersByStatus[status] = 0;
            }
            ordersByStatus[status]++;
        }
        const chartData = orderStatusLables.map((status) => ordersByStatus[status] || 0);
        return chartData;
    };
    const data = useMemo(() => {
        return {
            labels: chartLabels,
            datasets: [
                {
                    label: "Orders Total Amount",
                    data: prepareChartData(),
                    backgroundColor: ['#FFB64C','#ED6D03','#4DABDE','#7AAC7D'],
                },
            ],
        };
    }, [orders]);
    return (
        <ShadowContainer>
            <Box py={3}>
                <Bar options={options} data={data} />
            </Box>
        </ShadowContainer>
    );
};

export default OrdersStatusChart;

OrdersStatusChart.propTypes = {
    orders: PropType.array.isRequired,
};
