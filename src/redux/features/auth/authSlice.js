import { createSlice } from "@reduxjs/toolkit";
import { apiService } from "../../services/emptySplitApi/apiSerivce";

const initialState = {
    user:{},
    isAuth: false,
    emailVerified: false,
    role: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        onAuthSuccess: (state, { payload }) => {
            console.log("Use is authonticated ", payload);
            state.isAuth = true;
            state.emailVerified = payload.emailVerified;
            state.user = payload
        },
        onAuthFail: (state, { payload }) => {
            console.log("User Authintication fail");
            state.isAuth = false;
            state.emailVerified = false;
            state.role = null;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(apiService.endpoints.getAuthUser.matchFulfilled, (state, { payload }) => {
            console.log('Get Data Call');
            state.role = payload.role;
        });
    }
});

export const authSlicSelector = (state) => state.auth;
export const { onAuthSuccess, onAuthFail } = authSlice.actions;
export const authReducer = authSlice.reducer;
