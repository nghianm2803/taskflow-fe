import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Card,
  CardContent,
  Divider,
  IconButton,
  TextField,
  MenuItem,
  Select,
  Grid,
  Typography,
  Autocomplete,
} from "@mui/material";
import "./taskstyle.css";
import { fDeadline } from "../../utils/formatTime";
import { updateTask, assignTask, getSingleTask, deleteTask } from "./taskSlice";
import { getUsers } from "../user/userSlice";
import CloseIcon from "@mui/icons-material/Close";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from "@mui/icons-material/Delete";
import CommentList from "../comment/CommentList";
import CommentForm from "../comment/CommentForm";
import DeleteTask from "./DeleteTask";
// import { FDateTimePicker } from "../../components/form";

const TaskDetail = ({ task, onClose }) => {
  const dispatch = useDispatch();
  const [detailTask, setDetailTask] = useState(task);
  const [isEditingDeadline, setIsEditingDeadline] = useState(false);
  const [isInvalidDate, setIsInvalidDate] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const userList = useSelector((state) => state.user.user);
  const userCount = useSelector((state) => state.user.count);

  const descriptionRef = useRef(null);
  const nameRef = useRef(null);
  const deadlineRef = useRef(null);
  const currentDateTime = fDeadline(new Date());

  useEffect(() => {
    dispatch(getUsers({ page: 1, limit: userCount, name: searchQuery }));
  }, [dispatch, searchQuery, userCount]);

  useEffect(() => {
    dispatch(getSingleTask(detailTask._id));
  }, [dispatch, detailTask._id]);

  const handleAssignUser = (taskId, userId) => {
    dispatch(assignTask({ taskId, userId, projectId: detailTask.projectTo }));
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
          projectId: detailTask.projectTo,
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
          projectId: detailTask.projectTo,
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
        projectId: detailTask.projectTo,
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
        projectId: detailTask.projectTo,
      })
    );
  };

  const handleDeadlineChange = () => {
    setIsEditingDeadline(!isEditingDeadline);
  };

  const updateDeadline = (e) => {
    const newDeadline = e.target.value;
    const formattedDeadline = new Date(newDeadline);

    if (!isNaN(formattedDeadline)) {
      const formattedString = formattedDeadline.toISOString().slice(0, 16);
      setDetailTask((prevTask) => ({
        ...prevTask,
        deadline: formattedString,
      }));
      setIsInvalidDate(false);
    } else {
      setIsInvalidDate(true);
    }
  };

  const handleDeadlineKeyPress = (e) => {
    if (e.key === "Enter") {
      dispatch(
        updateTask({
          id: detailTask._id,
          deadline: detailTask.deadline,
          projectId: detailTask.projectTo,
        })
      );
      deadlineRef.current.blur();
    }
  };

  const handleMenuTask = () => {
    // Implement MenuTask here
  };

  const deleteDialogClose = () => {
    setOpenDeleteDialog(false);
  };

  const handleDeleteTask = () => {
    setOpenDeleteDialog(true);
  };

  const confirmDeleteTask = async (taskId) => {
    dispatch(deleteTask({ id: taskId, projectId: detailTask.projectTo }));
    setOpenDeleteDialog(false);
  };

  // Custom function to compare options with the value prop
  const isOptionEqualToValue = (option, value) => option._id === value?._id;

  return (
    <Box
      sx={{
        position: "fixed",
        top: "170px",
        right: 0,
        height: "calc(100vh - 65px)",
        overflow: "hidden",
        backgroundColor: "#b7b7a4",
        zIndex: 1,
        width: {
          xs: "100%",
          sm: "70%",
          md: "50%",
        },
      }}
    >
      <Box
        sx={{
          height: "100%",
          overflow: "auto",
          padding: "10px",
        }}
      >
        {/* Header part */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <CardContent>
              <TextField
                value={detailTask.name}
                onChange={handleNameChange}
                onKeyPress={handleNameKeyPress}
                fullWidth
                inputRef={nameRef}
                variant="standard"
                InputProps={{
                  style: {
                    color: "#212B36",
                  },
                }}
              />
            </CardContent>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <IconButton onClick={handleDeleteTask}>
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={handleMenuTask}>
              <MoreHorizIcon />
            </IconButton>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
        <Divider />

        {/* Body part */}
        <Box sx={{ padding: "20px" }}>
          <Grid container spacing={3}>
            <Grid item xs={6} sm={6} md={6} lg={3.5}>
              <Card
                sx={{
                  backgroundColor: {
                    Pending: "#C2E1FB",
                    Working: "#FFF283",
                    Review: "#E6F9FB",
                    Done: "#CBE4AE",
                  }[detailTask.status],
                }}
              >
                <CardContent
                  sx={{
                    "&:last-child": {
                      padding: "16px",
                    },
                  }}
                >
                  <Typography variant="body2" color="#212B36">
                    Status
                  </Typography>
                  <Select
                    value={detailTask.status}
                    onChange={handleStatusChange}
                    fullWidth
                    sx={{ width: "130px" }}
                    renderValue={(selected) => (
                      <Typography variant="body2" color="#212B36">
                        {selected}
                      </Typography>
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
                      <AssignmentIcon style={{ color: "#F1C93B", paddingRight: "5px" }} />
                      Working
                    </MenuItem>
                    <MenuItem value="Review">
                      <ContentPasteSearchIcon style={{ color: "#00BCD4", paddingRight: "5px" }} />
                      Review
                    </MenuItem>
                    <MenuItem value="Done">
                      <AssignmentTurnedInIcon style={{ color: "#8BC34A", paddingRight: "5px" }} />
                      Done
                    </MenuItem>
                  </Select>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={3.5}>
              <Card
                sx={{
                  backgroundColor: {
                    Low: "#CBFFA9",
                    Medium: "#F1C93B",
                    High: "#EF6262",
                  }[detailTask.priority],
                }}
              >
                <CardContent
                  sx={{
                    "&:last-child": {
                      padding: "16px",
                    },
                  }}
                >
                  <Typography variant="body2" color="#212B36">
                    Priority
                  </Typography>
                  <Select
                    value={detailTask.priority}
                    onChange={handlePriorityChange}
                    fullWidth
                    sx={{ width: "130px" }}
                    renderValue={(selected) => (
                      <Typography variant="body2" color="#212B36">
                        {selected}
                      </Typography>
                    )}
                    variant="standard"
                  >
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                  </Select>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={8} sm={8} md={6} lg={5}>
              <Card fullWidth>
                <CardContent
                  sx={{
                    "&:last-child": {
                      padding: "16px",
                    },
                  }}
                >
                  <Typography variant="body2">Deadline</Typography>
                  {isEditingDeadline ? (
                    // <FDateTimePicker/>
                    <TextField
                      value={fDeadline(detailTask.deadline)}
                      onChange={updateDeadline}
                      onKeyPress={handleDeadlineKeyPress}
                      inputRef={deadlineRef}
                      fullWidth
                      variant="standard"
                      error={isInvalidDate}
                      helperText={isInvalidDate && "Invalid date value"}
                      type="datetime-local"
                      inputProps={{ min: currentDateTime }}
                    />
                  ) : (
                    <Typography
                      variant="body2"
                      onClick={handleDeadlineChange}
                      sx={{
                        marginTop: "10px",
                        "&:hover": {
                          color: "#78C1F3",
                          fontWeight: "bold",
                        },
                        cursor: "pointer",
                      }}
                    >
                      {fDeadline(detailTask.deadline)}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Task Description part */}
        <Box
          sx={{
            paddingLeft: "20px",
            paddingRight: "20px",
            display: "flex",
            flexDirection: "column",
            marginBottom: "20px",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={7} md={7} lg={7}>
              <Card fullWidth>
                <CardContent
                  sx={{
                    "&:last-child": {
                      padding: "16px",
                    },
                  }}
                >
                  <Typography sx={{ textAlign: "left" }}>Description</Typography>
                  <TextField
                    multiline
                    rows={4}
                    value={detailTask.description}
                    onChange={handleDescriptionChange}
                    onKeyPress={handleDescriptionKeyPress}
                    fullWidth
                    inputRef={descriptionRef}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={8} sm={5} md={5} lg={5}>
              <Card fullWidth>
                <CardContent
                  sx={{
                    "&:last-child": {
                      padding: "16px",
                    },
                  }}
                >
                  <Typography variant="body2">Assignee</Typography>
                  <Autocomplete
                    options={userList ?? []}
                    getOptionLabel={(user) => user.name}
                    value={detailTask.assignTo ? detailTask.assignTo : null}
                    isOptionEqualToValue={isOptionEqualToValue}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        onChange={(e) => {
                          const query = e.target.value;
                          setSearchQuery(query);
                        }}
                        label="Assignee"
                        variant="standard"
                      />
                    )}
                    onChange={(event, user) => handleAssignUser(detailTask._id, user ? user._id : null)}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        <DeleteTask
          id={detailTask._id}
          openDeleteDialog={openDeleteDialog}
          deleteDialogClose={deleteDialogClose}
          onDelete={() => confirmDeleteTask(detailTask._id)}
        />

        {/* Comment part */}
        <Box
          sx={{
            paddingLeft: "20px",
            paddingRight: "20px",
            marginTop: "20px",
            marginBottom: "110px",
          }}
        >
          <Card
            sx={{
              padding: "20px",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <CommentList taskId={task._id} />
              </Grid>
              <Grid item xs={12}>
                <CommentForm taskId={task._id} />
              </Grid>
            </Grid>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default TaskDetail;
