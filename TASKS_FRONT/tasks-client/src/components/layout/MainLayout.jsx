import { Box, Toolbar } from "@mui/material";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const SIDEBAR_WIDTH = 100;
function MainLayout({ children }) {
    return (
        <Box sx={{ display: "flex", minHeight: "100vh" }}>

            <Box sx={{ width: SIDEBAR_WIDTH, flexShrink: 0 }}>
                <Sidebar />
            </Box>
            <Box sx={{ width: SIDEBAR_WIDTH, flexShrink: 0 }}>
                <Navbar />
            </Box>

            <Box
                component="main"
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexGrow: 1,
                    p: 3,
                    backgroundColor: "#f5f7fb",
                    minHeight: "100vh",
                }}
            >
                    {children}
            </Box>
        </Box>
    );
}

export default MainLayout;