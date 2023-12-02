import React from "react";
import ShadowContainer from "../../../../components/common/layout/ShadowContainer";
import { Box, Icon, Stack, Typography } from "@mui/material";

import PropType from "prop-types";

const InfoCard = ({ title, count, icon, bgColor }) => {
  return (
    <ShadowContainer my={1}>
      <Box
        width="12rem"
        height="6rem"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box
          bgcolor={bgColor}
          height="4rem"
          width="4rem"
          borderRadius="50%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Icon sx={{ fontSize: "x-large" }}>{icon}</Icon>
        </Box>
        <Stack spacing={1} width="55%">
          <Typography variant="h2">{count}</Typography>
          <Typography variant="h4" color="gray">
            {title}
          </Typography>
        </Stack>
      </Box>
    </ShadowContainer>
  );
};

export default InfoCard;

InfoCard.propTypes = {
  title: PropType.string.isRequired,
  icon: PropType.node.isRequired,
  bgColor: PropType.string.isRequired,
};
