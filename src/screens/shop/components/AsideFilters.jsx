import React, { useEffect, useState } from "react";
import { FilterAltOffOutlined, FilterAltOutlined } from "@mui/icons-material";
import { Box, Typography, FormControl, InputLabel, MenuItem, Select, Button, ButtonGroup, OutlinedInput, InputAdornment } from "@mui/material";
import PropType from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { applyFilter, filterSliceSelector, resetFilter } from "../../../redux/features/filter/filterSlice";
import { selectMax, selectMin } from "../../../selectors/selector";
import { useGetAllBrandsQuery } from "../../../redux/services/brands/brandsApiService";

const AsideFilters = ({ productsData, isLoading }) => {
    const { filter, prdoucts } = useSelector((state) => ({
        filter: state.filter,
        products: productsData,
    }));
    const dispatch = useDispatch();

    const { data: brands } = useGetAllBrandsQuery();

    const [field, setFilter] = useState({
        brand: filter.brand,
        sortOrder: filter.sortOrder,
        minPrice: filter.mixPrice,
        maxPrice: filter.maxPrice,
    });

    useEffect(() => {
        setFilter(filter);
    }, [filter]);

    const min = selectMin(productsData);
    const max = selectMax(productsData);
    const onBrandFilterChange = (e) => {
        setFilter({ ...field, brand: e.target.value });
    };

    const onSortFilterChange = (e) => {
        setFilter({ ...field, sortOrder: e.target.value });
    };

    const onPriceChange = (e) => {
        const { name, value } = e.target;
        setFilter({ ...field, [name]: +value });
    };

    const onApplyFilters = () => {
        const isChanged = Object.keys(field).some((key) => field[key] !== filter[key]);
        if (isChanged) {
            dispatch(applyFilter(field));
        }
    };

    const onResetFilters = () => {
        dispatch(resetFilter());
    };

    console.log(field);
    return (
        <Box sx={{ width: { md: "25vw" } }}>
            <Typography variant="h3">Filters </Typography>
            <Box height="25rem" mb={{ xs: 2, md: 0 }}>
                <FormControl fullWidth sx={{ my: 2 }}>
                    <InputLabel id="brand-label">Brand</InputLabel>
                    <Select labelId="brand-label" id="brands-select" value={field.brand} label="brand" onChange={onBrandFilterChange}>
                        <MenuItem value="">None</MenuItem>
                        {brands?.map((brand) => (
                            <MenuItem key={brand.id} value={brand.name}>
                                {brand.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth sx={{ my: 2 }}>
                    <InputLabel id="sort-label">Sort By</InputLabel>
                    <Select labelId="sort-label" id="sort-select" value={field.sortOrder} label="Sort By" onChange={onSortFilterChange}>
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value="name-asc">Name Ascending A - Z</MenuItem>
                        <MenuItem value="name-desc">Name Descending Z - A</MenuItem>
                        <MenuItem value="price-asc">Price Low - High</MenuItem>
                        <MenuItem value="price-desc">Price High - Low</MenuItem>
                    </Select>
                </FormControl>
                <Box my={2} component="form">
                    <FormControl fullWidth sx={{ my: 2 }}>
                        <InputLabel htmlFor="minPrice-input">Minimum Price</InputLabel>
                        <OutlinedInput
                            id="minPrice-input"
                            startAdornment={<InputAdornment position="start">USD</InputAdornment>}
                            endAdornment={<InputAdornment position="end">Min {min} USD</InputAdornment>}
                            label="Minimum Amount"
                            type="text"
                            name="minPrice"
                            value={field.minPrice}
                            onChange={onPriceChange}
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ my: 2 }}>
                        <InputLabel htmlFor="maxPrice-input">Maximum Price</InputLabel>
                        <OutlinedInput
                            id="maxPrice-input"
                            startAdornment={<InputAdornment position="start">USD</InputAdornment>}
                            endAdornment={<InputAdornment position="end">Max {max} USD</InputAdornment>}
                            label="Maximum Amount"
                            type="text"
                            name="maxPrice"
                            value={field.maxPrice}
                            onChange={onPriceChange}
                            error={field.minPrice > field.maxPrice}
                        />
                    </FormControl>
                </Box>
                <ButtonGroup variant="text">
                    <Button endIcon={<FilterAltOutlined />} onClick={onApplyFilters}>
                        Apply Filters
                    </Button>
                    <Button sx={{ color: "secondary.dark" }} endIcon={<FilterAltOffOutlined />} onClick={onResetFilters}>
                        Reset Filters
                    </Button>
                </ButtonGroup>
            </Box>
        </Box>
    );
};

export default AsideFilters;
AsideFilters.propTypes = {
    productsData: PropType.array,
    isLoading: PropType.bool,
};
