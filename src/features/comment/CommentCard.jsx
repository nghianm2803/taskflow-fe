import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Avatar,
  Paper,
  Stack,
  Typography,
  IconButton,
  Card,
  Divider,
  Link,
  TextField,
  Popover,
  DialogContent,
} from "@mui/material";
import { fDate } from "../../utils/formatTime";
import DeleteComment from "./DeleteComment";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import useAuth from "../../hooks/useAuth";
import { updateComment } from "./commentSlice";

function CommentCard({ comment }) {
  const { user } = useAuth();
  const dispatch = useDispatch();

  const commentId = useSelector(
    (state) => state.comment.commentsById[comment._id]._id
  );

  const [contentComment, setContentComment] = useState(comment);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editCommentForm, setEditCommentForm] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const contentRef = useRef(null);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };

  const handleDialogOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenDialog(true);
  };

  const handleEditBtnClick = () => {
    setOpenDialog(false);
    setEditCommentForm(true);
  };

  const handleCommentChange = (e) => {
    setContentComment((prevComment) => ({
      ...prevComment,
      content: e.target.value,
    }));
  };

  const handleCommentKeyPress = (e) => {
    if (e.key === "Enter") {
      dispatch(
        updateComment({
          id: contentComment._id,
          content: contentComment.content,
        })
      );
      contentRef.current.blur();
    }
  };

  const handleManualUpdateComment = () => {
    dispatch(
      updateComment({
        id: contentComment._id,
        content: contentComment.content,
      })
    );
  };

  const handleCloseEditComment = () => {
    setEditCommentForm(false);
  };

  const handleDeleteBtnClick = () => {
    setOpenDialog(false);
    setOpenDeleteDialog(true);
  };

  const deleteDialogClose = () => {
    setOpenDeleteDialog(false);
  };

  return (
    <Stack direction="row" spacing={2}>
      <Avatar alt={comment.author?.name} src={comment.author?.avatar} />
      <Paper
        sx={{ p: 1.5, flexGrow: 1, bgcolor: "background.neutral" }}
        onMouseOver={handleHover}
        onMouseLeave={handleLeave}
      >
        <Stack
          direction="row"
          alignItems={{ sm: "center" }}
          justifyContent="space-between"
          sx={{ mb: 0.5 }}
          position="relative"
        >
          {comment.author?._id === user._id && isHovered && (
            <>
              <Card
                sx={{
                  position: "absolute",
                  top: -30,
                  right: 0,
                  zIndex: 1,
                  width: 40,
                  height: 30,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "#d6ccc2",
                }}
              >
                <IconButton onClick={handleDialogOpen}>
                  <MoreHorizIcon />
                </IconButton>
              </Card>

              <Popover
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <DialogContent>
                  <Stack
                    sx={{
                      width: "150px",
                      height: "20px",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: "5px",
                    }}
                    onClick={handleEditBtnClick}
                  >
                    <Typography variant="body2">Edit Comment</Typography>
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                  </Stack>
                  <Divider />
                  <Stack
                    sx={{
                      width: "150px",
                      height: "20px",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: "5px",
                    }}
                    onClick={handleDeleteBtnClick}
                  >
                    <Typography variant="body2">Delete Comment</Typography>
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </DialogContent>
              </Popover>
              <DeleteComment
                id={commentId}
                openDeleteDialog={openDeleteDialog}
                deleteDialogClose={deleteDialogClose}
              />
            </>
          )}
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {comment.author?.name}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.disabled" }}>
            {fDate(comment.createdAt)}
          </Typography>
        </Stack>
        {editCommentForm ? (
          <>
            <TextField
              value={contentComment.content}
              onChange={handleCommentChange}
              onKeyPress={handleCommentKeyPress}
              fullWidth
              inputRef={contentRef}
            />
            <Typography variant="caption">
              <Link
                variant="caption"
                color="secondary"
                sx={{ cursor: "pointer" }}
                onClick={handleCloseEditComment}
              >
                Cancel
              </Link>{" "}
              or enter to{" "}
              <Link
                variant="caption"
                color="secondary"
                sx={{ cursor: "pointer" }}
                onClick={handleManualUpdateComment}
              >
                save
              </Link>
            </Typography>
          </>
        ) : (
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {comment.content}
          </Typography>
        )}
      </Paper>
    </Stack>
  );
}

export default CommentCard;
