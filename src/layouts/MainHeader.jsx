import React, { useState, useEffect } from "react";
import {
  AppBar,
  Menu,
  MenuItem,
  Typography,
  IconButton,
  Toolbar,
  Box,
  Avatar,
  Button,
  Divider,
  Popover,
  Stack,
  Badge,
} from "@mui/material";
import Logo from "../components/Logo";
import useAuth from "../hooks/useAuth";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useThemeContext } from "../theme";
import NotificationCard from "../features/notification/NotificationCard";
import { useDispatch, useSelector } from "react-redux";
import {
  countNewNotifications,
  getAllNotificationOfUser,
  readAllNotifications,
  readNotification,
} from "../features/notification/notificationSlice";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import LoadingScreen from "../components/LoadingScreen";
import ThemeToggle from "./ThemeToggle";

function MainHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toggleTheme } = useThemeContext();

  const [notificationEl, setNotificationEl] = React.useState(null);
  const [notifiDialog, setnotifiDialog] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notification.notifications);
  const totalPage = useSelector((state) => state.notification.totalPage);
  const count = useSelector((state) => state.notification.count);
  const unreadCount = useSelector((state) => state.notification.unreadCount);
  const id = useSelector((state) => state.notification._id);
  const isLoading = useSelector((state) => state.notification.isLoading);

  useEffect(() => {
    const fetchNewNotifications = async () => {
      try {
        dispatch(countNewNotifications());
      } catch (error) {
        console.error("Error fetching new notifications count:", error);
      }
    };

    const timeoutId = setInterval(async () => {
      await fetchNewNotifications();
    }, 60000); // 1 minute

    return () => {
      clearInterval(timeoutId);
    };
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      if (notifiDialog === true) {
        dispatch(getAllNotificationOfUser({ limit: count }));
      }
    }
  }, [user, dispatch, notifiDialog, count]);

  const handleReadAll = () => {
    dispatch(readAllNotifications());
  };

  const handleReadNotification = (notificationId) => {
    if (notificationId) {
      dispatch(readNotification({ id: notificationId }));
    }
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverNoti = (event) => {
    setNotificationEl(event.currentTarget);
    setnotifiDialog(true);
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
      {user.role === "Admin" ? (
        <MenuItem onClick={handleMenuClose} to="/dashboard" component={RouterLink} sx={{ mx: 1 }}>
          Dashboard
        </MenuItem>
      ) : (
        ""
      )}
      <Divider sx={{ borderStyle: "dashed" }} />
      <MenuItem onClick={handleMenuClose} to="/me" component={RouterLink} sx={{ mx: 1 }}>
        My Profile
      </MenuItem>
      <Divider sx={{ borderStyle: "dashed" }} />
      <MenuItem onClick={handleMenuClose} to="/tasks/mytasks" component={RouterLink} sx={{ mx: 1 }}>
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
          <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }}>
            <Logo />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ display: { xs: "none", sm: "block" } }}>
            Taskflow
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <ThemeToggle toggleTheme={toggleTheme} />
          <Button
            variant="primary"
            onClick={handlePopoverNoti}
            sx={{
              width: "40px",
              height: "40px",
              borderRadius: "20px",
              marginRight: "10px",
            }}
          >
            <Badge badgeContent={unreadCount} color="error">
              <NotificationsIcon color="#fff" />
            </Badge>
          </Button>
          <Box>
            <Avatar
              onClick={handleProfileMenuOpen}
              src={user.avatar}
              alt={user.name}
              sx={{ width: 32, height: 32, cursor: "pointer" }}
            />
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
      <Popover
        open={notifiDialog}
        onClose={() => setnotifiDialog(false)}
        anchorEl={notificationEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{
          maxHeight: 400,
          width: 400,
        }}
      >
        <Stack
          direction="row"
          alignItems={{ sm: "center" }}
          justifyContent="space-between"
          sx={{ mb: 0.5 }}
          position="relative"
        >
          <Typography
            variant="h5"
            color="primary"
            sx={{
              fontWeight: "bold",
              justifyContent: "center",
              padding: 2,
            }}
          >
            Notifications
          </Typography>
          <Button
            variant="primary"
            onClick={handleReadAll}
            sx={{
              width: "40px",
              height: "40px",
              borderRadius: "20px",
            }}
          >
            <DoneAllIcon />
          </Button>
        </Stack>
        <Divider />
        <Stack style={{ minHeight: 200, width: 350 }} alignItems="center" p={1}>
          {isLoading ? (
            <LoadingScreen />
          ) : (
            <NotificationCard
              notifications={notifications}
              totalPage={totalPage}
              count={count}
              id={id}
              handleReadNotification={handleReadNotification}
            />
          )}
        </Stack>
      </Popover>
    </Box>
  );
}

export default MainHeader;
