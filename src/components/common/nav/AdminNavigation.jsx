import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { Menu } from "@mui/icons-material";
import SettingsMenu from "./SettingsMenu";
import PropType from "prop-types";

const AdminNavigation = ({ handleDrawerToggle }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - 240px)` },
        ml: { sm: `240px` },
        bgcolor: "secondary.light",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <Menu />
        </IconButton>

        <Typography variant="h4" sx={{ display: { xs: "none", sm: "block" } }}>
          ADMIN PANEL
        </Typography>

        <SettingsMenu />
      </Toolbar>
    </AppBar>
  );
};

export default AdminNavigation;
AdminNavigation.propTypes = {
  handleDrawerToggle: PropType.func.isRequired,
};
