import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import MobileNavDrawer from "./MobileNavDrawer";
import { navigationList } from "../../../constants/navigation";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import SettingsMenu from "./SettingsMenu";
import { useState } from "react";
import { SIGNIN } from "../../../constants/routes";
import CartDrawer from "../cart/CartDrawer";
import AppName from "../appName/AppName";
import { useSelector } from "react-redux";
import { authSlicSelector } from "../../../redux/features/auth/authSlice";
import { profileSliceSelector } from "../../../redux/features/profile/porfileSlice";

const Navigation = () => {
    const { isAuth } = useSelector(authSlicSelector);
    const { role } = useSelector(authSlicSelector);
    const navigate = useNavigate();
    const { pathname } = useLocation();

    return (
        !pathname.startsWith("/admin/") && (
            <Box height="5rem" mb="10">
                <AppBar position="fixed" color="secondary" sx={{ py: { xs: 2, md: 1 }, zIndex: "10" }}>
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            {/* Desktop Nav - AppName */}
                            <AppName />

                            {/* Mobile Nav - Drawer */}
                            <MobileNavDrawer />

                            {/* Mobile Nav - AppName */}
                            <AppName mobile={true} />

                            {/* Desktop Nav - Links */}
                            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                                {navigationList.map((navItem) => (
                                    <NavLink
                                        key={navItem.name}
                                        to={navItem.to}
                                        style={({ isActive }) => {
                                            return {
                                                color: isActive ? "#ff9800" : "black",
                                            };
                                        }}
                                    >
                                        <Typography variant="h4" sx={{ mx: 3, fontWeight: 500 }}>
                                            {navItem.name}
                                        </Typography>
                                    </NavLink>
                                ))}
                            </Box>

                            {/* Show if not ADMIN */}
                            {role !== "ADMIN" && (
                                <>
                                    <SearchBar />
                                    <CartDrawer />
                                </>
                            )}

                            {/* Show SettingsMenu if is Authenticated / signed in  otherwise show  Sign In Button */}
                            {isAuth ? (
                                <SettingsMenu />
                            ) : (
                                <Button variant="contained" onClick={() => navigate(SIGNIN)}>
                                    Sign In
                                </Button>
                            )}
                        </Toolbar>
                    </Container>
                </AppBar>
            </Box>
        )
    );
};

export default Navigation;
