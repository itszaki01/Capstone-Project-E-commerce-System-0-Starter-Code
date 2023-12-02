import { FormHelperText } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import PropType from "prop-types";


const CustomCreatableSelect = ({
  control,
  selectName,
  defaultValue,
  selectPlaceholder,
}) => {

  return (
    <Controller
      name={selectName}
      control={control}
      render={({ field: { onChange, name, ref }, formState }) => (
        <>
          <CreatableSelect
          styles={{
            // Fixes the overlapping problem of the component
            menu: provided => ({ ...provided, zIndex: 9999 })
          }}
            isMulti
            ref={ref}
            name={name}
            placeholder={selectPlaceholder}
            onChange={(e) => onChange(e.map((c) => c.value))}
            defaultValue={defaultValue}
          />
          <FormHelperText>{formState?.errors && formState.errors[name]?.message}</FormHelperText>
        </>
      )}
    />
  );
};

export default CustomCreatableSelect;

CustomCreatableSelect.propTypes = {
  control: PropType.object.isRequired,
  selectName: PropType.string.isRequired,
  selectPlaceholder: PropType.string.isRequired,
  defaultValue: PropType.array.isRequired,
};