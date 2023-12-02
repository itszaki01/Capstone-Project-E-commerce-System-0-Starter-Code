import React, { useMemo } from "react";
import ShadowContainer from "../../../../../components/common/layout/ShadowContainer";
import { Box } from "@mui/material";
import PropType, { array } from "prop-types";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import moment from "moment";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: "Daily Earnings Chart",
        },
    },
};

const EarningsChart = ({ orders }) => {
    const chartLabes = Array.from(
        new Set(
            orders
                ?.map((order) => moment(order.createdAt.toDate()).format("MMM Do YY"))
                .sort((a, b) => moment(a, "MMM Do YY").diff(moment(b, "MMM Do YY")))
        )
    );

    const prepareChartsdata = () => {
        const oredersByDate = {};

        orders?.forEach((order) => {
            const date = moment(order.createdAt.toDate()).format("MMM Do YY");
            if (!oredersByDate[date]) {
                oredersByDate[date] = 0;
            }
            oredersByDate[date] += order.orderAmount;
        });

        const sortedDates = Object.keys(oredersByDate).sort((a, b) => moment(a, "MMM Do YY").diff(moment(b, "MMM Do YY")));
        const chartData = sortedDates.map((date) => oredersByDate[date]);
        return chartData;
    };

    const data = useMemo(() => {
        return {
            labels: chartLabes,
            datasets: [
                {
                    label: "Orders Total Amount",
                    data: prepareChartsdata(),
                    borderColor: "rgb(255, 99, 132)",
                    backgroundColor: "rgba(255, 99, 132, 0.5)",
                },
            ],
        };
    }, [orders]);

    return (
        <ShadowContainer>
            <Box py={3}>
                <Line options={options} data={data} />
            </Box>
        </ShadowContainer>
    );
};

export default EarningsChart;
EarningsChart.propTypes = {
    orders: PropType.array.isRequired,
};
