import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React from "react";

function DeleteTask({ openDeleteDialog, deleteDialogClose, onDelete }) {

  const handleDeleteTask = () => {
    onDelete();
    deleteDialogClose();
  };

  return (
    <Dialog open={openDeleteDialog} onClose={deleteDialogClose}>
      <DialogTitle>Delete Confirmation</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Are you sure you want to delete this task?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleDeleteTask}>
          Delete
        </Button>
        <Button variant="outlined" onClick={deleteDialogClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteTask;
