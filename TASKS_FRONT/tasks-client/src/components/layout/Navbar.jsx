import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
} from "@mui/material";

function Navbar() {
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
              שלום אלישבע 👋
            </Typography>

            <Avatar>
              E
            </Avatar>
          </Box>

        </Box>

      </Toolbar>
    </AppBar>
  );
}

export default Navbar;