import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Card, CardContent, Typography, CircularProgress, Stack } from "@mui/material";
import { fetchUsers } from "../api/usersService";
import UserCard from "../components/users/UserCard";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const response = await fetchUsers();
        setUsers(response.data);
      } catch (err) {
        setError("Unable to load users.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold">
          משתמשים
        </Typography>

        <Button component={Link} to="/users/new" variant="contained">
          צור משתמש חדש
        </Button>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={6}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : users.length === 0 ? (
        <Typography>לא נמצאו משתמשים.</Typography>
      ) : (
        <Stack spacing={2}>
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </Stack>
      )}
    </Box>
  );
}

export default UsersList;
