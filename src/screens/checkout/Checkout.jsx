import React from "react";
import CustomContainer from "../../components/common/layout/CustomContainer";
import Center from "../../components/common/layout/Center";
import CheckoutStepper from "./components/CheckoutStepper";

const Checkout = () => {

  return (
    <CustomContainer>
      <Center>
        <CheckoutStepper />
      </Center>
    </CustomContainer>
  );
};

export default Checkout;
