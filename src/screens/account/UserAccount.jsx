import React from "react";

import AccountTabs from "./components/tabs/AccountTabs";
import CustomContainer from "../../components/common/layout/CustomContainer";
import Center from "../../components/common/layout/Center";

const UserAccount = () => {
  return (
    <CustomContainer>
      <Center>
        <AccountTabs />
      </Center>
    </CustomContainer>
  );
};

export default UserAccount;
