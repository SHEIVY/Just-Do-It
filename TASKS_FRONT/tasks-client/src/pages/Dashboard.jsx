import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress
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
import { useAppSelector } from "../store/hooks";

function Dashboard({ filter }) {

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form
  const [formOpen, setFormOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);

  // Delete dialog
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const currentUser = useAppSelector((state) => state.user.currentUser);

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

      const userId = task.userId ?? currentUser?.id;
      if (userId) {
        payload.userId = userId;
      }

      if (task.id) {
        await updateTask(task.id, payload);
      } else {
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
  const handleDeleteClick = (task) => {
    setSelectedTask(task);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteTask(selectedTask.id);

      setConfirmOpen(false);
      setSelectedTask(null);

      loadTasks();
    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // Filter
  // =========================
  const filteredTasks = tasks.filter((task) => {

    if (filter === "all") return true;
    if (filter === "todo") return task.status === 0;
    if (filter === "inprogress") return task.status === 1;
    if (filter === "done") return task.status === 2;

    return true;
  });

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
    <Box>

      {/* Header */}
      <Typography variant="h4" fontWeight="bold" mb={3}>
        המשימות שלי
      </Typography>

      {/* Add button */}
      <Button
        variant="contained"
        sx={{ mb: 3 }}
        onClick={() => {
          setEditTask(null);
          setFormOpen(true);
        }}
      >
        + הוספת משימה
      </Button>

      {/* Tasks list */}
      <Box display="flex" flexDirection="column" gap={2}>

        {filteredTasks.length === 0 ? (
          <Typography color="text.secondary">
            אין משימות להצגה
          </Typography>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={handleDeleteClick}
              onEdit={handleEdit}
            />
          ))
        )}

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