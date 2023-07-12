import React, { useState, useRef } from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  Divider,
  IconButton,
  TextField,
  MenuItem,
  Select,
  Button,
  Modal,
} from "@mui/material";
import "./taskstyle.css";
import { fDate } from "../../utils/formatTime";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { updateTask, deleteTask } from "./taskSlice";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from "@mui/icons-material/Delete";

const TaskCard = ({ task }) => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [detailTask, setDetailTask] = useState(task);

  const descriptionRef = useRef(null);
  const nameRef = useRef(null);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };

  const handleTaskClick = () => {
    setShowDetail(!showDetail);
    setDetailTask(task);
  };

  const handleCloseForm = () => {
    setShowDetail(false);
  };

  const handleNameChange = (e) => {
    setDetailTask((prevTask) => ({
      ...prevTask,
      name: e.target.value,
    }));
  };

  const handleNameKeyPress = (e) => {
    if (e.key === "Enter") {
      dispatch(
        updateTask({
          id: detailTask._id,
          name: detailTask.name,
        })
      );
      nameRef.current.blur();
    }
  };

  const handleDescriptionChange = (e) => {
    setDetailTask((prevTask) => ({
      ...prevTask,
      description: e.target.value,
    }));
  };

  const handleDescriptionKeyPress = (e) => {
    if (e.key === "Enter") {
      dispatch(
        updateTask({
          id: detailTask._id,
          description: detailTask.description,
        })
      );
      descriptionRef.current.blur();
    }
  };

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setDetailTask((prevTask) => ({
      ...prevTask,
      status: newStatus,
    }));
    dispatch(
      updateTask({
        id: detailTask._id,
        status: newStatus,
      })
    );
  };

  const handlePriorityChange = (e) => {
    const newPriority = e.target.value;
    setDetailTask((prevTask) => ({
      ...prevTask,
      priority: newPriority,
    }));
    dispatch(
      updateTask({
        id: detailTask._id,
        priority: newPriority,
      })
    );
  };

  const handleMenuTask = () => {
    // Implement MenuTask here
  };
  const handleDeleteTask = () => {
    setDeleteModal(true);
  };

  const handleCloseModal = () => {
    setDeleteModal(false);
  };

  // const handleDelete = async () => {
  //   await dispatch(deleteProductOfStore(id)).then(() =>
  //     dispatch(getAllProductStore({ storeId: storeId, page: page, limit: 10 }))
  //   );

  //   handleCloseDeleteBox();
  // };

  const handleConfirmDelete = () => {
    dispatch(
      deleteTask({
        id: detailTask._id,
      })
    );
    setDeleteModal(false);
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "flex-start" }}>
        {/* Task Card */}
        <Card
          className={isHovered ? "task-card-hovered" : "task-card"}
          sx={{
            p: 1,
            width: "100%",
            height: "80px",
            position: "relative",
            overflow: "hidden",
            marginBottom: "10px",
          }}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
          onClick={handleTaskClick}
        >
          <Typography sx={style}>{task.name}</Typography>
          <Box
            sx={{
              display: "grid",
              rowGap: 3,
              columnGap: 2,
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
              },
            }}
          >
            <Typography sx={style}>
              {task.assignTo ? task.assignTo : "Unassigned"}
            </Typography>
            <Typography sx={style}> {fDate(task.deadline)}</Typography>
          </Box>
        </Card>

        {/* Expanded View */}
        {showDetail && (
          <Box
            sx={{
              position: "fixed",
              top: "170px",
              right: 0,
              width: "50%",
              height: "calc(100vh - 65px)",
              overflow: "scroll",
              backgroundColor: "#9BE8D8",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
              zIndex: 1,
            }}
          >
            {/* Delete Button */}
            <IconButton
              sx={{
                position: "absolute",
                top: "10px",
                right: "40px",
                zIndex: 1,
              }}
              onClick={handleMenuTask}
            >
              <MoreHorizIcon />
            </IconButton>
            <IconButton
              sx={{
                position: "absolute",
                top: "10px",
                right: "10px",
                zIndex: 1,
              }}
              onClick={handleCloseForm}
            >
              <CloseIcon />
            </IconButton>

            <CardContent>
              <Box sx={{ marginBottom: "10px" }}>
                <TextField
                  value={detailTask.name}
                  onChange={handleNameChange}
                  onKeyPress={handleNameKeyPress}
                  fullWidth
                  inputRef={nameRef}
                  variant="standard"
                />
              </Box>
            </CardContent>
            <Divider />
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                padding: "20px",
              }}
            >
              <Box sx={{ marginRight: "10px" }}>
                <Card
                  sx={{
                    width: "140px",
                    height: "90px",
                    backgroundColor: {
                      Pending: "#C2E1FB",
                      Working: "#FFF283",
                      Review: "#E6F9FB",
                      Done: "#CBE4AE",
                    }[detailTask.status],
                  }}
                >
                  <CardContent>
                    <Typography variant="body2">Status</Typography>
                    <Select
                      value={detailTask.status}
                      onChange={handleStatusChange}
                      fullWidth
                      sx={{
                        width: "100px",
                        height: "40px",
                      }}
                      renderValue={(selected) => (
                        <Typography variant="body2">{selected}</Typography>
                      )}
                      variant="standard"
                    >
                      <MenuItem value="Pending">
                        <ContentPasteIcon
                          style={{
                            color: "#3F51B5",
                            paddingRight: "5px",
                          }}
                        />
                        Pending
                      </MenuItem>
                      <MenuItem value="Working">
                        <AssignmentIcon
                          style={{ color: "#F1C93B", paddingRight: "5px" }}
                        />
                        Working
                      </MenuItem>
                      <MenuItem value="Review">
                        <ContentPasteSearchIcon
                          style={{ color: "#00BCD4", paddingRight: "5px" }}
                        />
                        Review
                      </MenuItem>
                      <MenuItem value="Done">
                        <AssignmentTurnedInIcon
                          style={{ color: "#8BC34A", paddingRight: "5px" }}
                        />
                        Done
                      </MenuItem>
                    </Select>
                  </CardContent>
                </Card>
              </Box>
              <Box sx={{ marginRight: "10px" }}>
                <Card
                  sx={{
                    width: "140px",
                    height: "90px",
                  }}
                >
                  <CardContent>
                    <Typography variant="body2">
                      Assignee{" "}
                      {detailTask.assignTo ? detailTask.assignTo : "Unassigned"}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
              <Box sx={{ marginRight: "10px" }}>
                <Card
                  sx={{
                    width: "140px",
                    height: "90px",
                    backgroundColor: {
                      Low: "#CBFFA9",
                      Medium: "#F1C93B",
                      High: "#EF6262",
                    }[detailTask.priority],
                  }}
                >
                  <CardContent>
                    <Typography variant="body2">Priority</Typography>
                    <Select
                      value={detailTask.priority}
                      onChange={handlePriorityChange}
                      fullWidth
                      sx={{
                        width: "100px",
                        height: "40px",
                      }}
                      renderValue={(selected) => (
                        <Typography variant="body2">{selected}</Typography>
                      )}
                      variant="standard"
                    >
                      <MenuItem value="Low">Low</MenuItem>
                      <MenuItem value="Medium">Medium</MenuItem>
                      <MenuItem value="High">High</MenuItem>
                    </Select>
                  </CardContent>
                </Card>
              </Box>
              <Box sx={{ marginRight: "10px" }}>
                <Card
                  sx={{
                    width: "140px",
                    height: "90px",
                  }}
                >
                  <CardContent>
                    <Typography variant="body2">
                      Deadline{fDate(detailTask.deadline)}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
              <IconButton
                sx={{
                  top: "10px",
                  right: "10px",
                  zIndex: 1,
                }}
                onClick={handleDeleteTask}
              >
                <DeleteIcon />
              </IconButton>
            </Box>

            {/** Delete Modal */}
            {deleteModal && (
              <Modal
                open={deleteModal}
                onClose={handleCloseModal}
                closeAfterTransition
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Card>
                  <CardContent>
                    <Typography>Do you want to delete this task?</Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: "10px",
                      }}
                    >
                      <Button
                        sx={{ backgroundColor: "#229A16", marginRight: "5px" }}
                        onClick={handleConfirmDelete}
                      >
                        Delete
                      </Button>
                      <Button
                        sx={{ backgroundColor: "#E9FCD4" }}
                        onClick={handleCloseModal}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Modal>
            )}

            {/* Task Description */}
            <Box sx={{ padding: "10px", height: "200px" }}>
              <Card sx={{ padding: "10px", height: "180px" }}>
                <Typography sx={{ textAlign: "left" }}>Description</Typography>
                <CardContent>
                  <TextField
                    multiline
                    rows={3}
                    value={detailTask.description}
                    onChange={handleDescriptionChange}
                    onKeyPress={handleDescriptionKeyPress}
                    fullWidth
                    inputRef={descriptionRef}
                  />
                </CardContent>
              </Card>
            </Box>

            {/* Comment Section */}
            <Box sx={{ padding: "10px" }}>
              <Card>
                <CardContent>Comment section here</CardContent>
              </Card>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

const style = {
  fontWeight: "500px",
  fontSize: "14px",
  lineHeight: "20px",
  letterSpace: "0px",
  wordBreak: "break-word",
  cursor: "pointer",
};

export default TaskCard;
