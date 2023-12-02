import { Stack } from '@mui/material'
import React from 'react'
import PropType from "prop-types";

const VerticalLayout = ({children}) => {
  return (
    <Stack
      direction={{ sm: "column", md: "row" }}
      spacing={{ xs: 4, sm: 2, md: 7 }}
      justifyContent="flex-start"
      alignItems="flex-start"
      sx={{
        height: "max-content",
        py: { sm: 0, md: 3 },
      }}
    >
      {children}
    </Stack>
  )
}

export default VerticalLayout;
VerticalLayout.propTypes = {
  children: PropType.node.isRequired,
};