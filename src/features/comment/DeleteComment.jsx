import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteComment } from "./commentSlice";

function DeleteComment({ id, openDeleteDialog, deleteDialogClose }) {
  const dispatch = useDispatch();

  const handleDeleteComment = () => {
    dispatch(deleteComment({ id }));
    deleteDialogClose();
  };

  return (
    <Dialog open={openDeleteDialog} onClose={deleteDialogClose}>
      <DialogTitle>Delete Confirmation</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Are you sure you want to delete this comment?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleDeleteComment}>
          Delete
        </Button>
        <Button variant="outlined" onClick={deleteDialogClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteComment;
