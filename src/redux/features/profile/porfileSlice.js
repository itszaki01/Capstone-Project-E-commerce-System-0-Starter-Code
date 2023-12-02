import { createSlice } from "@reduxjs/toolkit";
import { apiService } from "../../services/emptySplitApi/apiSerivce";

const initialState = {
    userProfile: null,
};

const porfileSlice = createSlice({
    name: 'profile',
    initialState,
    extraReducers: (builder) => {
        builder.addMatcher(apiService.endpoints.getAuthUser.matchFulfilled, (state, { payload }) => {
            state.userProfile = payload;
        });
        builder.addMatcher(apiService.endpoints.signOut.matchFulfilled, (state, { payload }) => {
            state.userProfile = null;
        });
    },
});

export const profileSliceSelector = (state)=> state.profile
export const {} = porfileSlice.actions;

export const profileReducer = porfileSlice.reducer;
