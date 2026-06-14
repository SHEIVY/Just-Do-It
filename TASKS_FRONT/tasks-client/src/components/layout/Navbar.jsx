import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store/hooks";
import { clearAuth } from "../../store/userSlice";

function Navbar() {
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearAuth());
    navigate("/login");
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

            <Avatar sx={{ bgcolor: '#1976d2' }}>
              {currentUser?.firstName?.charAt(0)?.toUpperCase()}
            </Avatar>

            <Button
              size="small"
              variant="outlined"
              onClick={handleLogout}
              sx={{ ml: 2 }}
            >
              התנתקות
            </Button>
          </Box>

        </Box>

      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
