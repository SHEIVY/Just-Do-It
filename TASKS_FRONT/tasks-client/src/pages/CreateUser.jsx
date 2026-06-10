import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import { createUser } from "../api/usersService";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

function CreateUser() {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      setError("כל השדות נדרשים.");
      return;
    }

    try {
      setSubmitting(true);
      await createUser(form);
      navigate("/users");
    } catch (err) {
      setError("שגיאה ביצירת המשתמש.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 600 }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        צור משתמש חדש
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Stack spacing={2}>
          <TextField
            label="שם פרטי"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="שם משפחה"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="אימייל"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="סיסמה"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
          />

          {error && (
            <Typography color="error">{error}</Typography>
          )}

          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button variant="outlined" onClick={() => navigate("/users")}>
              ביטול
            </Button>
            <Button type="submit" variant="contained" disabled={submitting}>
              {submitting ? "שולח..." : "צור משתמש"}
            </Button>
          </Box>
        </Stack>
      </Box>
    </Paper>
  );
}

export default CreateUser;
