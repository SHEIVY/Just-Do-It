import {
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    Box,
} from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";

const drawerWidth = 240;


function Sidebar() {
    const location = useLocation();
    const isUsersRoute = location.pathname.startsWith("/users");

    return (
        <Drawer
            variant="permanent"
            anchor="right"
            sx={{
                width: 240,
                flexShrink: 0,

                "& .MuiDrawer-paper": {
                    width: 240,
                    boxSizing: "border-box",
                    backgroundColor: "#ffffff",
                    borderLeft: "1px solid #e0e0e0",
                },
            }}
        >
            <Toolbar>
                <Typography
                    variant="h6"
                    fontWeight="bold"
                >
                    📝 TaskFlow
                </Typography>
            </Toolbar>

            <Box sx={{ overflow: "auto" }}>
                <List>

                    <ListItemButton
                        component={NavLink}
                        to="/"
                        selected={!isUsersRoute && location.pathname === "/"}
                    >
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>

                        <ListItemText primary="כל המשימות" />
                    </ListItemButton>

                    <ListItemButton
                        component={NavLink}
                        to="/users"
                        selected={isUsersRoute}
                    >
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary="משתמשים" />
                    </ListItemButton>

                </List>
            </Box>
        </Drawer>
    );
}

export default Sidebar;

