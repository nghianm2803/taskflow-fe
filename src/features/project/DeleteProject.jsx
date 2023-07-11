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
import { deleteProject } from "./projectSlice";

function DeleteProject({ id, openDeleteDialog, deleteDialogClose }) {
  const dispatch = useDispatch();

  const handleDeleteProject = () => {
    dispatch(deleteProject({ id }));
    deleteDialogClose();
  };

  return (
    <Dialog open={openDeleteDialog} onClose={deleteDialogClose}>
      <DialogTitle>Delete Confirmation</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Are you sure you want to delete this project?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={deleteDialogClose}>Cancel</Button>
        <Button onClick={handleDeleteProject}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteProject;
