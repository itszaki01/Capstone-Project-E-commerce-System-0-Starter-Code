import React from "react";
import CustomContainer from "../../../components/common/layout/CustomContainer";
import InfoContainer from "./components/InfoContainer";
import Charts from "./components/Charts";

const Dashboard = () => {
  return (
    <CustomContainer>
      <InfoContainer />
      <Charts/>
    </CustomContainer>
  );
};

export default Dashboard;
