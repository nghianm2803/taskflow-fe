import * as React from "react";
import {
  AppBar,
  Menu,
  MenuItem,
  Typography,
  IconButton,
  Toolbar,
  Box,
  Avatar,
  Divider,
} from "@mui/material";
import Logo from "../components/Logo";
import useAuth from "../hooks/useAuth";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useThemeContext } from "../theme";

function MainHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const { toggleTheme, theme } = useThemeContext();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      handleMenuClose();
      await logout(() => {
        navigate("/login");
      });
    } catch (error) {
      console.error(error);
    }
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Box sx={{ my: 1.5, px: 2.5 }}>
        <Typography variant="subtitle2" noWrap>
          {user?.name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
          {user?.email}
        </Typography>
      </Box>
      <Divider sx={{ borderStyle: "dashed" }} />
      <MenuItem
        onClick={handleMenuClose}
        to="/me"
        component={RouterLink}
        sx={{ mx: 1 }}
      >
        My Profile
      </MenuItem>
      <Divider sx={{ borderStyle: "dashed" }} />
      <MenuItem
        onClick={handleMenuClose}
        to="/tasks/mytasks"
        component={RouterLink}
        sx={{ mx: 1 }}
      >
        My Task
      </MenuItem>
      <Divider sx={{ borderStyle: "dashed" }} />
      <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
        Logout
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ mb: 8 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <Logo />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Taskflow
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {theme.palette.mode === "dark" ? (
            <LightModeIcon onClick={toggleTheme} sx={{ marginRight: "20px", cursor: "pointer", color: "#FFF" }} />
          ) : (
            <DarkModeIcon onClick={toggleTheme} sx={{ marginRight: "20px", cursor: "pointer", color: "#000" }} />
          )}
          <Box>
            <Avatar
              onClick={handleProfileMenuOpen}
              src={user.avatar}
              alt={user.name}
              sx={{ width: 32, height: 32 }}
            />
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}

export default MainHeader;
