import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "../components/common/nav/Navigation";
import Home from "../screens/home/Home";
import * as ROUTES from "../constants/routes";
import Footer from "../components/common/footer/Footer";
import ViewProduct from "../screens/viewProduct/ViewProduct";
import ScrollToTop from "../hooks/scrollToTop/ScrollToTop";
import Shop from "../screens/shop/Shop";
import NewArrivals from "../screens/newArrivals.jsx/NewArrivals";
import Featured from "../screens/featured/Featured";
import Recommended from "../screens/recommended/Recommended";
import Search from "../screens/search/Search";
import SignIn from "../screens/auth/signIn/SignIn";
import SignUp from "../screens/auth/signUp/SignUp";
import Dashboard from "../screens/admin/dashboard/Dashboard";
import Products from "../screens/admin/products/Products";
import AddProduct from "../screens/admin/addProduct/AddProduct";
import EditProduct from "../screens/admin/editProduct/EditProduct";
import Brands from "../screens/admin/brands/Brands";
import ForgotPassword from "../screens/auth/forgotPassword/ForgotPassword";
import UserAccount from "../screens/account/UserAccount";
import EditAccountSettings from "../screens/account/components/EditAccountSettings";
import Checkout from "../screens/checkout/Checkout";
import CheckoutSuccess from "../screens/checkout/CheckoutSuccess";
import Orders from "../screens/admin/orders/Orders";
import ViewOrder from "../screens/admin/viewOrder/ViewOrder";
import Users from "../screens/admin/users/Users";
import ErrorPage from "../screens/NotFound/ErrorPage";
import AdminRoutes from "./AdminRoutes";
import PublicRoutes from "./PublicRoutes";
import AuthUserRoutes from "./AuthUserRoutes";

const AppRouter = () => {
    return (
        <Router>
            <Navigation />
            <Routes>
                <Route path={ROUTES.HOME} element={<Home />} />
                <Route path={ROUTES.VIEW_PRODUCT} element={<ViewProduct />} />
                <Route path={ROUTES.SHOP} element={<Shop />} />
                <Route path={ROUTES.NEW_ARRIVALS} element={<NewArrivals />} />
                <Route path={ROUTES.FEATURED_PRODUCTS} element={<Featured />} />
                <Route path={ROUTES.RECOMMENDED_PRODUCTS} element={<Recommended />} />
                <Route path={ROUTES.SEARCH} element={<Search />} />

                {/* Public Routes */}
                <Route element={<PublicRoutes />}>
                    <Route path={ROUTES.SIGNIN} element={<SignIn />} />
                    <Route path={ROUTES.SIGNUP} element={<SignUp />} />
                    <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
                </Route>

                {/* Admin Routes */}
                <Route element={<AdminRoutes />}>
                    <Route path={ROUTES.ADMIN_DASHBOARD} element={<Dashboard />} />
                    <Route path={ROUTES.ADMIN_PRODUCTS} element={<Products />} />
                    <Route path={ROUTES.ADMIN_ADD_PRODUCT} element={<AddProduct />} />
                    <Route path={ROUTES.ADMIN_EDIT_PRODUCT} element={<EditProduct />} />
                    <Route path={ROUTES.ADMIN_BRANDS} element={<Brands />} />
                    <Route path={ROUTES.ADMIN_ORDERS} element={<Orders />} />
                    <Route path={ROUTES.ADMIN_VIEW_ORDER} element={<ViewOrder />} />
                    <Route path={ROUTES.ADMIN_USERS} element={<Users />} />
                </Route>

                {/* Auth User Routes */}
                <Route element={<AuthUserRoutes />}>
                    <Route path={ROUTES.ACCOUNT} element={<UserAccount />} />
                    <Route path={ROUTES.ACCOUNT_EDIT} element={<EditAccountSettings />} />
                    <Route path={ROUTES.CHECKOUT} element={<Checkout />} />
                    <Route path={ROUTES.CHECKOUT_SUCCESS} element={<CheckoutSuccess />} />
                </Route>

                {/* Undefined Routes / Not Found */}
                <Route path="*" element={<ErrorPage />} />
            </Routes>
            <Footer />
            <ScrollToTop />
        </Router>
    );
};

export default AppRouter;
