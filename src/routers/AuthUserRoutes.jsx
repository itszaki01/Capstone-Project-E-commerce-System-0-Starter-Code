import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { authSlicSelector } from "../redux/features/auth/authSlice";
import { ADMIN_DASHBOARD, SIGNIN } from "../constants/routes";

export default function AuthUserRoutes() {
    const { pathname } = useLocation();
    const { isAuth, role } = useSelector(authSlicSelector);
    if (isAuth && role == "ADMIN") {
        return <Navigate to={ADMIN_DASHBOARD} />;
    } else if (isAuth && role == "USER") {
        return <Outlet />;
    } else {
        return <Navigate to={SIGNIN} state={{ from: pathname }} />;
    }
}
