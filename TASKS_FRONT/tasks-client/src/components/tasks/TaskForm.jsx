
import { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    MenuItem,
} from "@mui/material";

function TaskForm({
    open,
    onClose,
    onSubmit,
    initialData,
}) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState(0);

    useEffect(() => {

        if (initialData) {

            setTitle(initialData.title || "");
            setDescription(initialData.description || "");
            setStatus(initialData.status ?? 0);
        }

    }, [initialData]);

    const handleSubmit = () => {

        if (initialData?.id) {
            // Editing existing task
            onSubmit({
                id: initialData.id,
                title,
                description,
                status,
            });
        } else {
            // Creating new task
            // IMPORTANT: Do NOT send userId
            // Backend extracts userId from JWT token and assigns it automatically
            onSubmit({
                title,
                description,
                status,
            });
        }

        setTitle("");
        setDescription("");
        setStatus(0);
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth>

            <DialogTitle>
                הוספת / עריכת משימה
            </DialogTitle>

            <DialogContent>

                <TextField
                    fullWidth
                    label="כותרת"
                    margin="normal"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <TextField
                    fullWidth
                    label="תיאור"
                    margin="normal"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <TextField
                    select
                    fullWidth
                    label="סטטוס"
                    margin="normal"
                    value={status}
                    onChange={(e) => setStatus(Number(e.target.value))}
                >
                    <MenuItem value={0}>לביצוע</MenuItem>
                    <MenuItem value={1}>בתהליך</MenuItem>
                    <MenuItem value={2}>הושלם</MenuItem>
                </TextField>

            </DialogContent>

            <DialogActions>

                <Button onClick={onClose}>
                    ביטול
                </Button>

                <Button variant="contained" onClick={handleSubmit}>
                    שמירה
                </Button>

            </DialogActions>

        </Dialog>
    );
}

export default TaskForm;

