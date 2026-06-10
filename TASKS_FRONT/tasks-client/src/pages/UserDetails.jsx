import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { fetchUserById } from "../api/usersService";

function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        const response = await fetchUserById(id);
        setUser(response.data);
      } catch (err) {
        setError("Unable to load user details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!user) {
    return <Typography>משתמש לא נמצא.</Typography>;
  }

  const tasks = user.tasks || [];

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold">
          {user.firstName} {user.lastName}
        </Typography>
        <Button component={Link} to="/users" variant="outlined">
          חזור לרשימת המשתמשים
        </Button>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="subtitle1" gutterBottom>
            פרטי משתמש
          </Typography>
          <Typography>שם: {user.firstName} {user.lastName}</Typography>
          <Typography>אימייל: {user.email}</Typography>
          <Typography>מספר משימות: {tasks.length}</Typography>
        </CardContent>
      </Card>

      <Typography variant="h6" mb={2}>
        משימות משתמש
      </Typography>

      {tasks.length === 0 ? (
        <Typography color="text.secondary">אין משימות להצגה.</Typography>
      ) : (
        <List>
          {tasks.map((task) => (
            <ListItem key={task.id} disableGutters>
              <ListItemText
                primary={task.title || "משימה"}
                secondary={task.description || "תיאור לא זמין"}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}

export default UserDetails;
