import {
    Paper,
    Typography,
    Box,
    Chip,
    IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";


function TaskCard({ task, onDelete, onEdit }) {
    const getStatusLabel = (status) => {

        switch (status) {

            case 0:
                return "לביצוע";

            case 1:
                return "בתהליך";

            case 2:
                return "הושלם";

            default:
                return "לא ידוע";
        }
    };

    const getStatusColor = (status) => {

        switch (status) {

            case 0:
                return "warning";

            case 1:
                return "info";

            case 2:
                return "success";

            default:
                return "default";
        }
    };

    return (
        <Paper
            elevation={2}
            sx={{
                p: 3,
                borderRadius: 4,
                transition: "0.2s",

                "&:hover": {
                    transform: "translateY(-2px)",
                },
            }}
        >

            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="start"
            >
                <IconButton onClick={() => onEdit(task)}>
                    <EditIcon />
                </IconButton>
                <Box>

                    <Typography
                        variant="h6"
                        fontWeight="bold"
                    >
                        {task.title}
                    </Typography>

                    <Typography
                        color="text.secondary"
                        mt={1}
                    >
                        {task.description}
                    </Typography>

                </Box>

                <Chip
                    label={getStatusLabel(task.status)}
                    color={getStatusColor(task.status)}
                />

            </Box>

            <Box
                mt={3}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >

                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    {new Date(task.createdAt)
                        .toLocaleDateString("he-IL")}
                </Typography>

                <Box>



                    <IconButton
                        color="error"
                        onClick={() => onDelete(task.id)}
                    >
                        <DeleteIcon />
                    </IconButton>

                </Box>

            </Box>

        </Paper>
    );
}

export default TaskCard;

