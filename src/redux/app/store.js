import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "../features/cart/cartSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { apiService } from "../services/emptySplitApi/apiSerivce";
import { authReducer } from "../features/auth/authSlice";
import { profileReducer } from "../features/profile/porfileSlice";
import { filterReducer } from "../features/filter/filterSlice";

const rootReducer = combineReducers({
    cart: cartReducer,
    auth:authReducer,
    profile:profileReducer,
    filter:filterReducer,
    [apiService.reducerPath]: apiService.reducer,
});

const persistConfig = {
    key: "root",
    storage,
    version: 1,
    whitelist: ["cart",'auth','profile'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(apiService.middleware)
});

export let persistor = persistStore(store);
