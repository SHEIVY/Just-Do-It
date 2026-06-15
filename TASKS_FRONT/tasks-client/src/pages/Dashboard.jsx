import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  ListItemSecondaryAction
} from "@mui/material";

import {
  getTasks,
  deleteTask,
  createTask,
  updateTask
} from "../api/tasksService";

import TaskCard from "../components/tasks/TaskCard";
import TaskForm from "../components/tasks/TaskForm";
import ConfirmDialog from "../components/common/ConfirmDialog";

function Dashboard() {

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form
  const [formOpen, setFormOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);

  // Delete dialog
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // =========================
  // Load tasks
  // =========================
  const loadTasks = async () => {
    try {
      setLoading(true);
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      console.log("Error loading tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // =========================
  // Create / Update
  // =========================
  const handleSubmit = async (task) => {
    try {
      const payload = {
        title: task.title,
        description: task.description,
        status: task.status,
      };

      if (task.id) {
        await updateTask(task.id, payload);
      } else {
        // Backend extracts userId from JWT token automatically
        await createTask(payload);
      }

      setFormOpen(false);
      setEditTask(null);
      loadTasks();
    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // Edit
  // =========================
  const handleEdit = (task) => {
    setEditTask(task);
    setFormOpen(true);
  };

  // =========================
  // Delete flow
  // =========================
  const handleDeleteClick = (taskId) => {
    setSelectedTask(taskId);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteTask(selectedTask);

      setConfirmOpen(false);
      setSelectedTask(null);

      loadTasks();
    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // Loading
  // =========================
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        paddingTop: '100px',
        paddingBottom: '40px',
        paddingX: 2,
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start"
        maxWidth="900px"
        margin="0 auto"
      >

        {/* Header */}
        <Typography
          variant="h3"
          fontWeight="bold"
          mb={1}
          sx={{
            color: '#ffffff',
            textAlign: 'center',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          המשימות שלי
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: 'rgba(255,255,255,0.8)',
            mb: 4,
            textAlign: 'center',
          }}
        >
          נהל את המשימות שלך בקלות וביעילות 📋
        </Typography>

        {/* Add button */}
        <Button
          variant="contained"
          sx={{
            mb: 4,
            bgcolor: '#ffffff',
            color: '#667eea',
            fontWeight: 'bold',
            padding: '12px 32px',
            fontSize: '16px',
            borderRadius: '8px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            '&:hover': {
              bgcolor: '#f5f5f5',
              boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
              transform: 'translateY(-2px)',
            },
            transition: 'all 0.3s ease',
          }}
          onClick={() => {
            setEditTask(null);
            setFormOpen(true);
          }}
        >
          + הוספת משימה
        </Button>

        {/* Tasks list */}
        <Box
          display="flex"
          flexDirection="column"
          gap={3}
          width="100%"
        >

          {tasks.length === 0 ? (
            <Box
              sx={{
                backgroundColor: 'rgba(255,255,255,0.95)',
                borderRadius: '12px',
                padding: '60px 20px',
                textAlign: 'center',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              }}
            >
              <Typography
                variant="h6"
                color="text.secondary"
              >
                אין משימות להצגה 😴
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1 }}
              >
                התחל בלחיצה על כפתור "הוספת משימה"
              </Typography>
            </Box>
          ) : (
            tasks.map((task) => (
              <Box key={task.id}>
                <TaskCard
                  task={task}
                  onDelete={handleDeleteClick}
                  onEdit={handleEdit}
                />
              </Box>
            ))
          )}

        </Box>

      </Box>

      {/* Task Form (Create/Edit) */}
      <TaskForm
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditTask(null);
        }}
        onSubmit={handleSubmit}
        initialData={editTask}
      />

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        open={confirmOpen}
        title="מחיקת משימה"
        description="האם אתה בטוח שברצונך למחוק את המשימה?"
        confirmText="מחק"
        cancelText="ביטול"
        type="error"
        onConfirm={handleConfirmDelete}
        onClose={() => setConfirmOpen(false)}
      />

    </Box>
  );
}

export default Dashboard;