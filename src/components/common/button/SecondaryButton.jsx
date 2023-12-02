import { Button } from '@mui/material'
import React from 'react'
import PropType from "prop-types";


const SecondaryButton = ({children, type, size,width, startIcon, onClickHandler, ...props}) => {
  return (
    <Button
          variant="contained"
          size={size || "medium"}
          sx={{
            color: "secondary.light",
            bgcolor: "black",
            mb: 3,
            py:1,
            px:3,
            height:"100%" ,
            width: {width},
            "&:hover":{
              color: "black",
            bgcolor: "inherit",
            border: "1px solid black"
            }
          }}
          type={type}
          startIcon={startIcon}
          onClick={onClickHandler}
         
          {...props}
        >
          {children}
        </Button>
  )
}

export default SecondaryButton;

SecondaryButton.propTypes = {
  children: PropType.node.isRequired,
  startIcon: PropType.node,
  type: PropType.string.isRequired,
  size:PropType.string,
  width:PropType.string,
  onClickHandler: PropType.func.isRequired
};