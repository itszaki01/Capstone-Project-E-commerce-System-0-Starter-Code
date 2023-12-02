import { FormHelperText } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";
import PropType from "prop-types";

const CustomSelect = ({
  control,
  selectName,
  defaultValue,
  selectOptions,
  selectPlaceholder,
}) => {
  return (
    <Controller
      name={selectName}
      control={control}
      render={({ field: { onChange, value, name, ref }, formState }) => (
        <>
          <Select
            styles={{
              // Fixes the overlapping problem of the component
              menu: (provided) => ({ ...provided, zIndex: 9999 }),
            }}
            ref={ref}
            name={name}
            placeholder={selectPlaceholder}
            options={selectOptions}
            value={selectOptions?.find((c) => c.value === value)}
            onChange={(val) => onChange(val.value)}
            defaultValue={defaultValue}
          />
          <FormHelperText>
            {formState?.errors && formState.errors[name]?.message}
          </FormHelperText>
        </>
      )}
    />
  );
};

export default CustomSelect;

CustomSelect.propTypes = {
  control: PropType.object.isRequired,
  selectName: PropType.string.isRequired,
  selectPlaceholder: PropType.string.isRequired,
  defaultValue: PropType.object.isRequired,
  selectOptions: PropType.array,
};
