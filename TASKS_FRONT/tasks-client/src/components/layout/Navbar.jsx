import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store/hooks";
import { clearAuth } from "../../store/userSlice";
import SettingsIcon from "@mui/icons-material/Settings";

function Navbar() {
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    dispatch(clearAuth());
    navigate("/login");
  };

  const handleSettings = () => {
    handleMenuClose();
    navigate("/settings");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#ffffff",
        color: "#333",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        width: "calc(100% - 240px)",
        mr: "240px",
      }}
    >
      <Toolbar>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >

          <Typography variant="h6" fontWeight="bold">
            מערכת ניהול משימות
          </Typography>

          <Box display="flex" alignItems="center" gap={2}>
            <Typography>
              שלום {currentUser?.firstName} 👋
            </Typography>

            <IconButton
              onClick={handleMenuOpen}
              size="small"
              sx={{
                p: 0,
                '&:hover': {
                  backgroundColor: 'rgba(25, 118, 210, 0.08)',
                  borderRadius: '8px',
              },
              }}
            >
              <Avatar sx={{ bgcolor: '#1976d2', width: 40, height: 40 }}>
                {currentUser?.firstName?.charAt(0)?.toUpperCase()}
              </Avatar>
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem disabled>
                <Typography variant="caption" color="textSecondary">
                  {currentUser?.email}
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleSettings}>
                <SettingsIcon sx={{ mr: 1, fontSize: 20 }} />
                הגדרות
              </MenuItem>
              <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                התנתקות
              </MenuItem>
            </Menu>
          </Box>

        </Box>

      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
