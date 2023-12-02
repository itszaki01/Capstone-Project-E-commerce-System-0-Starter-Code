import {
  Category,
  DashboardRounded,
  Inventory,
  People,
  ShoppingCart,
} from "@mui/icons-material";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import {
  ADMIN_BRANDS,
  ADMIN_DASHBOARD,
  ADMIN_ORDERS,
  ADMIN_PRODUCTS,
  ADMIN_USERS,
} from "../../../constants/routes";
import AppName from "../appName/AppName";
import PropType from "prop-types";

const drawerWidth = 240;
const AdminSideBar = ({ mobileOpen, handleDrawerToggle }) => {
  const navLinkStyle = ({ isActive }) => {
    return {
      borderRight: isActive ? "5px solid #faa225" : "transparent",
      backgroundColor: isActive ? "#f9deb9a1" : "transparent",
    };
  };

  const drawer = (
    <>
      <Box sx={{ py: { xs: 3, sm: 4, md: 4 }, pl: 2 }}>
        <AppName />

        <AppName mobile={true} />
      </Box>

      <List>
        <ListItem as={NavLink} style={navLinkStyle} to={ADMIN_DASHBOARD}>
          <ListItemButton>
            <ListItemIcon>
              <DashboardRounded sx={{ color: "primary.light" }} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>

        <ListItem as={NavLink} style={navLinkStyle} to={ADMIN_PRODUCTS}>
          <ListItemButton>
            <ListItemIcon>
              <Inventory sx={{ color: "primary.light" }} />
            </ListItemIcon>
            <ListItemText primary="Products" />
          </ListItemButton>
        </ListItem>
        <ListItem as={NavLink} style={navLinkStyle} to={ADMIN_BRANDS}>
          <ListItemButton>
            <ListItemIcon>
              <Category sx={{ color: "primary.light" }} />
            </ListItemIcon>
            <ListItemText primary="Brands" />
          </ListItemButton>
        </ListItem>

        <ListItem as={NavLink} style={navLinkStyle} to={ADMIN_ORDERS}>
          <ListItemButton>
            <ListItemIcon>
              <ShoppingCart sx={{ color: "primary.light" }} />
            </ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItemButton>
        </ListItem>

        <ListItem as={NavLink} style={navLinkStyle} to={ADMIN_USERS}>
          <ListItemButton>
            <ListItemIcon>
              <People sx={{ color: "primary.light" }} />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default AdminSideBar;
AdminSideBar.propTypes = {
  mobileOpen: PropType.bool.isRequired,
  handleDrawerToggle: PropType.func.isRequired,
};
