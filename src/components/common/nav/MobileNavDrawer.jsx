import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { navigationList } from "../../../constants/navigation";
import { NavLink } from "react-router-dom";

const MobileNavDrawer = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (openState) => (event) => {
    setOpen(openState);
  };

  const list = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {navigationList.map((navItem) => (
          <NavLink key={navItem.name} to={navItem.to}>
            <ListItem>
              <ListItemButton>
                <ListItemText primary={navItem.name} />
              </ListItemButton>
            </ListItem>
          </NavLink>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: { xs: "flex", md: "none" } }}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={toggleDrawer(true)}
      >
        <MenuIcon color="primary" />
      </IconButton>

      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        {list}
      </Drawer>
    </Box>
  );
};

export default MobileNavDrawer;
