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
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 2,
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease',
        border: '1px solid rgba(0,0,0,0.05)',

        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: '0 8px 30px rgba(102, 126, 234, 0.2)',
            }}}
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

