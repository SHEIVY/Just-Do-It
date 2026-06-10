import { Link } from "react-router-dom";
import { Card, CardContent, Typography, Box, Chip } from "@mui/material";

function UserCard({ user }) {
  return (
    <Card component={Link} to={`/users/${user.id}`} sx={{ textDecoration: "none", color: "inherit" }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h6">
            {user.firstName} {user.lastName}
          </Typography>
          <Chip label={`ID: ${user.id}`} size="small" />
        </Box>
        <Typography color="text.secondary">{user.email}</Typography>
        <Typography mt={1} variant="body2" color="text.secondary">
          משימות: {user.tasks ? user.tasks.length : 0}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default UserCard;
