import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography
} from "@mui/material";

function ConfirmDialog({
  open,
  title = "אישור פעולה",
  description = "",
  confirmText = "אישור",
  cancelText = "ביטול",
  onConfirm,
  onClose,
  type = "error"
}) {

  return (
    <Dialog open={open} onClose={onClose}>

      <DialogTitle>
        {title}
      </DialogTitle>

      <DialogContent>
        <Typography>
          {description}
        </Typography>
      </DialogContent>

      <DialogActions>

        <Button onClick={onClose}>
          {cancelText}
        </Button>

        <Button
          color={type}
          variant="contained"
          onClick={onConfirm}
        >
          {confirmText}
        </Button>

      </DialogActions>

    </Dialog>
  );
}

export default ConfirmDialog;