import { Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sendInvitation } from "../user/userSlice";

function AddMember({ open, handleClose }) {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(sendInvitation(data)).then(() => {
      handleClose();
    });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add member</DialogTitle>
      <DialogContent>
        <DialogContentText>Send invitation to member's email</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={() => onSubmit({ email })}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddMember;

