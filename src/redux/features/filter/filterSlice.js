import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    brand: "",
    sortOrder: "",
    minPrice: 0,
    maxPrice: 0,
};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        applyFilter: (state, { payload }) => {
            return {
                ...state,
                ...payload,
            };
        },
        resetFilter: () => {
            return initialState;
        },
    },
});

export const filterSliceSelector = (state)=> state.filter
export const { applyFilter,resetFilter } = filterSlice.actions;

export const filterReducer = filterSlice.reducer;
