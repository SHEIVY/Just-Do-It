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

import DashboardIcon from "@mui/icons-material/Dashboard";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const drawerWidth = 240;

function Sidebar({
    filter,
    setFilter,
}) {
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
                        selected={filter === "all"}
                        onClick={() => setFilter("all")}
                    >
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>

                        <ListItemText primary="כל המשימות" />
                    </ListItemButton>

                    <ListItemButton
                        selected={filter === "todo"}
                        onClick={() => setFilter("todo")}
                    >
                        <ListItemIcon>
                            <PendingActionsIcon />
                        </ListItemIcon>

                        <ListItemText primary="לביצוע" />
                    </ListItemButton>

                    <ListItemButton
                        selected={filter === "inprogress"}
                        onClick={() => setFilter("inprogress")}
                    >
                        <ListItemIcon>
                            <AutorenewIcon />
                        </ListItemIcon>

                        <ListItemText primary="בתהליך" />
                    </ListItemButton>

                    <ListItemButton
                        selected={filter === "done"}
                        onClick={() => setFilter("done")}
                    >
                        <ListItemIcon>
                            <CheckCircleIcon />
                        </ListItemIcon>

                        <ListItemText primary="הושלם" />
                    </ListItemButton>

                </List>
            </Box>
        </Drawer>
    );
}

export default Sidebar;

