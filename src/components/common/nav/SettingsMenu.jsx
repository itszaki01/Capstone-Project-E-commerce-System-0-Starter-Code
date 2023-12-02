import React, { useState } from "react";
import { Avatar, Box, IconButton, Menu, MenuItem, Skeleton, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { ACCOUNT, ADMIN_DASHBOARD } from "../../../constants/routes";
import { useSignOutMutation } from "../../../redux/services/auth/authApiService";
import { useSelector } from "react-redux";
import { profileSliceSelector } from "../../../redux/features/profile/porfileSlice";
import { authSlicSelector } from "../../../redux/features/auth/authSlice";

const SettingsMenu = () => {
    const [signOut] = useSignOutMutation();
    const [anchorElUser, setAnchorElUser] = useState(null);
    const { userProfile } = useSelector(profileSliceSelector);
    const { role } = useSelector(authSlicSelector);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleSignOut = async () => {
        signOut();
    };

    return (
        <Box sx={{ flexGrow: 0 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
                {userProfile?.fullname ? (
                    <Typography sx={{ display: { xs: "none", sm: "block" } }}>{userProfile.fullname}</Typography>
                ) : (
                    <Skeleton width={100} />
                )}

                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {userProfile?.avatar ? (
                        <Avatar alt={userProfile.fullname} src={userProfile.avatar} />
                    ) : (
                        <Skeleton variant="circular" width={40} height={40} />
                    )}
                </IconButton>
            </Stack>

            <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {role === "ADMIN" && (
                    <Link to={ADMIN_DASHBOARD}>
                        <MenuItem>
                            <Typography variant="body2">Dashboard</Typography>
                        </MenuItem>
                    </Link>
                )}

                {role === "USER" && (
                    <Link to={ACCOUNT}>
                        <MenuItem>
                            <Typography variant="body2">Account</Typography>
                        </MenuItem>
                    </Link>
                )}

                <MenuItem onClick={handleSignOut}>
                    <Typography variant="body2">Sign Out</Typography>
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default SettingsMenu;
