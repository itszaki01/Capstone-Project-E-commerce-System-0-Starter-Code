import { Avatar, Button, Typography } from "@mui/material";
import React from "react";
import Center from "../../components/common/layout/Center";
import CustomContainer from "../../components/common/layout/CustomContainer";
import { useNavigate } from "react-router-dom";
import { ACCOUNT, HOME } from "../../constants/routes";

import ThankYouImg from "../../assets/ThankYou.jpg";

const CheckoutSuccess = () => {
  const navigate = useNavigate();
  return (
    <CustomContainer>
      <Center height={330}>
        <Avatar src={ThankYouImg} sx={{ width: 200, height: 200 }} />
        <Typography variant="h3" my={3}>
          Thank you for Your Purchase
        </Typography>

        <Typography variant="h3" mb={3} color="secondary.dark">
          Your Order has been placed and it will be confirmed soon
        </Typography>
        <Button onClick={() => navigate(ACCOUNT)}>See Your order</Button>
      </Center>
    </CustomContainer>
  );
};

export default CheckoutSuccess;
