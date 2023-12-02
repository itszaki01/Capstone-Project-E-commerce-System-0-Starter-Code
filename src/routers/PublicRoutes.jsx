import React from "react";
import { useSelector } from "react-redux";
import { authSlicSelector } from "../redux/features/auth/authSlice";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ADMIN_DASHBOARD, HOME, SIGNIN, SIGNUP } from "../constants/routes";

export default function PublicRoutes() {
    const { isAuth, role } = useSelector(authSlicSelector);
    const { pathname, state } = useLocation();
    const from = state?.from || { pathname: HOME };

    if (isAuth && role === "ADMIN") {
        return <Navigate to={ADMIN_DASHBOARD} />;
    } else if (isAuth && role === "USER" && (pathname === SIGNIN || pathname === SIGNUP)) {
        return <Navigate to={from} />;
    } else {
        return <Outlet />;
    }
}
