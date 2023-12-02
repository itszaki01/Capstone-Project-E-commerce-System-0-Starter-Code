import React from "react";
import CustomContainer from "../../components/common/layout/CustomContainer";
import Center from "../../components/common/layout/Center";

import NotFoundImage from "../../assets/Page404.png";
import { useNavigate } from "react-router-dom";
import { HOME } from "../../constants/routes";
import SecondaryButton from "../../components/common/button/SecondaryButton";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <CustomContainer>
      <Center>
        <img src={NotFoundImage} />
        <SecondaryButton size="small" onClickHandler={() => navigate(HOME)}>
          Go Home
        </SecondaryButton>
      </Center>
    </CustomContainer>
  );
};

export default ErrorPage;
