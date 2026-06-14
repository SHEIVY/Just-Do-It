import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import { loginUser as loginUserThunk } from "../store/userSlice";

const initialForm = {
  email: "",
  password: "",
};

function Login() {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    if (!form.email || !form.password) {
      setError("כל השדות נדרשים.");
      return;
    }

    setSubmitting(true);
    try {
      // Dispatch login thunk
      // This will: authenticate user, store JWT token, store user data in Redux
      await dispatch(loginUserThunk(form)).unwrap();
      navigate("/dashboard");
    } catch (err) {
      const message =
        typeof err === 'string'
          ? err
          : err?.message || "שגיאה בהתחברות.";
      setError(message);
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 600 }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        התחברות
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Stack spacing={2}>
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
            <Button variant="outlined" onClick={() => navigate("/")}>
              ביטול
            </Button>
            <Button type="submit" variant="contained" disabled={submitting}>
              {submitting ? "שולח..." : "התחבר"}
            </Button>
          </Box>

          <Typography variant="body2" sx={{ mt: 2 }}>
            עדיין אין לך חשבון?{" "}
            <Button
              size="small"
              onClick={() => navigate("/create-user")}
              sx={{ p: 0 }}
            >
              צור חשבון
            </Button>
          </Typography>
        </Stack>
      </Box>
    </Paper>
  );
}

export default Login;
