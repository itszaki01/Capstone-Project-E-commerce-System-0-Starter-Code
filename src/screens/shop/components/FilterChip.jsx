import { Chip } from '@mui/material'
import React from 'react'
import PropType from "prop-types";

const FilterChip = ({label, handleDelete}) => {
  return (
    <Chip label={label} variant="outlined" color="primary" onDelete={handleDelete} />
  )
}

export default FilterChip
FilterChip.propTypes = {
  label: PropType.string.isRequired,
  handleDelete: PropType.func.isRequired
};