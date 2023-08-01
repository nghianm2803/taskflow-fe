import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks, createTask, addTaskToProject } from "./taskSlice";
import { fDeadline } from "../../utils/formatTime";
import {
  Grid,
  Card,
  Typography,
  Box,
  CardContent,
  Stack,
  Container,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "./taskstyle.css";
import { FormProvider, FTextField } from "../../components/form";
import { LoadingButton } from "@mui/lab";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import TaskCard from "./TaskCard";
import LoadingScreen from "../../components/LoadingScreen";
import SearchInput from "../../components/SearchInput";
import FilterTask from "../../components/FilterTask";
import useAuth from "../../hooks/useAuth";

import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

const TaskList = ({ projectId }) => {
  const { user } = useAuth();
  const { tasksList, isLoading, taskCount } = useSelector((state) => state.task);
  const [filterBy, setFilterBy] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const currentDateTime = fDeadline(new Date());

  const yupSchema = Yup.object().shape({
    name: Yup.string().required("This field is required"),
    description: Yup.string().required("This field is required"),
  });

  const defaultValues = {
    name: "",
    description: "",
    deadline: "",
  };

  const methods = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    // Modify the deadline format before submitting
    const deadlineDate = new Date(data.deadline);
    const year = deadlineDate.getFullYear();
    const month = String(deadlineDate.getMonth() + 1).padStart(2, "0");
    const day = String(deadlineDate.getDate()).padStart(2, "0");
    const hours = String(deadlineDate.getHours()).padStart(2, "0");
    const minutes = String(deadlineDate.getMinutes()).padStart(2, "0");
    const seconds = String(deadlineDate.getSeconds()).padStart(2, "0");

    const formattedDeadline = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;

    const formattedData = {
      ...data,
      deadline: formattedDeadline,
    };

    try {
      const createdTaskData = await dispatch(createTask(formattedData));
      const taskId = createdTaskData.data.task._id;
      if (taskId) {
        dispatch(addTaskToProject({ taskId, projectId }));
        reset();
      } else {
        console.error("Error: Failed to retrieve taskId");
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const [isHovered, setIsHovered] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleSearchValue = (filterValue) => {
    setFilterValue(filterValue);
  };

  const handleFilterChange = (filterBy) => {
    setFilterBy(filterBy);
  };

  const handleTaskClick = () => {
    setShowForm((prevState) => !prevState);
  };

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    if (projectId) {
      dispatch(getTasks({ projectId, limit: taskCount, filterBy, filterValue }));
    }
  }, [projectId, dispatch, filterBy, filterValue, taskCount]);

  const filterTasksByProjectId = () => {
    return tasksList.filter((task) => task.projectTo === projectId);
  };

  const tasksOfProject = filterTasksByProjectId();

  let renderTasks;

  if (tasksOfProject.length > 0) {
    const pendingTasks = tasksOfProject.filter(
      (task) => task.status === "Pending"
    );
    const workingTasks = tasksOfProject.filter(
      (task) => task.status === "Working"
    );
    const reviewTasks = tasksOfProject.filter(
      (task) => task.status === "Review"
    );
    const doneTasks = tasksOfProject.filter((task) => task.status === "Done");

    const renderTaskCards = (tasks) => {
      return tasks.map((task) => <TaskCard key={task._id} task={task} />);
    };

    renderTasks = (
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          mt: 3,
        }}
        padding={1}
      >
        <Stack
          display="flex"
          flexDirection="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Box marginBottom={5} marginRight={1}>
            <SearchInput handleOnSubmit={handleSearchValue} />
          </Box>
          <Box marginBottom={5}>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <FilterTask handleFilterChange={handleFilterChange} mt={2} />
            </FormProvider>
          </Box>
        </Stack>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                width: "100%",
                height: "40px",
                backgroundColor: "#EDEEF8",
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <CardContent
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ContentPasteIcon
                  style={{ color: "#3F51B5", paddingRight: "5px" }}
                />
                <Typography variant="body2" display="block" align="left" color="#212B36">
                  Pending
                </Typography>
              </CardContent>
            </Card>
            {pendingTasks.length > 0 && renderTaskCards(pendingTasks)}
            {user.role === "Manager" ? (
              <Card
                className={isHovered ? "task-card-hovered" : "task-card"}
                sx={{
                  marginBottom: "10px",
                  width: "100%",
                  height: "40px",
                  position: "relative",
                  textAlign: "center",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor: "#FFF"
                }}
                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
                onClick={() => {
                  setShowForm((prevState) => !prevState);
                }}
              >
                <AddIcon fontSize="small" sx={{ color: "#212B36" }} />
                <Typography variant="body2" display="block" align="center" color="#212B36">
                  Task
                </Typography>
              </Card>) : ""
            }
            {showForm && (
              <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <FTextField
                  name="name"
                  fullWidth
                  required
                  placeholder="Task's name"
                />
                <FTextField
                  name="description"
                  fullWidth
                  required
                  placeholder="Task's description"
                />
                <FTextField
                  type="datetime-local"
                  name="deadline"
                  sx={{ width: 1, mb: "20px" }}
                  inputProps={{ min: currentDateTime }}
                />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    size="small"
                    loading={isSubmitting || isLoading}
                  >
                    Create Task
                  </LoadingButton>
                </Box>
              </FormProvider>
            )}
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                width: "100%",
                height: "40px",
                backgroundColor: "#FFFDEC",
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <CardContent
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <AssignmentIcon
                  style={{ color: "#F1C93B", paddingRight: "5px" }}
                />
                <Typography variant="body2" display="block" align="left" color="#212B36">
                  Working
                </Typography>
              </CardContent>
            </Card>
            {workingTasks.length > 0 && renderTaskCards(workingTasks)}
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                width: "100%",
                height: "40px",
                backgroundColor: "#E6F9FB",
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <CardContent
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ContentPasteSearchIcon
                  style={{ color: "#00BCD4", paddingRight: "5px" }}
                />
                <Typography variant="body2" display="block" align="left" color="#212B36">
                  Review
                </Typography>
              </CardContent>
            </Card>
            {reviewTasks.length > 0 && renderTaskCards(reviewTasks)}
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                width: "100%",
                height: "40px",
                backgroundColor: "#F4F9ED",
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <CardContent
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <AssignmentTurnedInIcon
                  style={{ color: "#8BC34A", paddingRight: "5px" }}
                />
                <Typography variant="body2" display="block" align="left" color="#212B36">
                  Done
                </Typography>
              </CardContent>
            </Card>
            {doneTasks.length > 0 && renderTaskCards(doneTasks)}
          </Grid>
        </Grid>
      </Container>
    );
  } else if (isLoading) {
    renderTasks = <LoadingScreen />;
  } else {
    renderTasks = (
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          mt: 3,
        }}
        padding="1"
      >
        <Stack
          display="flex"
          flexDirection="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Box marginBottom={5} marginRight={1}>
            <SearchInput handleOnSubmit={handleSearchValue} />
          </Box>
          <Box marginBottom={5}>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <FilterTask handleFilterChange={handleFilterChange} mt={2} />
            </FormProvider>
          </Box>
        </Stack>

        {user.role === "Manager" ? (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Card
                className={isHovered ? "task-card-hovered" : "task-card"}
                sx={{
                  marginTop: "10px",
                  marginBottom: "10px",
                  width: "100%",
                  height: "40px",
                  position: "relative",
                  textAlign: "center",
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor: "#FFF"
                }}
                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
                onClick={handleTaskClick}
              >
                <AddIcon fontSize="small" sx={{ color: "#212B36" }} />
                <Typography variant="body2" display="block" align="center" color="#212B36">
                  Task
                </Typography>
              </Card>
              {showForm && (
                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                  <FTextField
                    name="name"
                    fullWidth
                    required
                    placeholder="Task's name"
                  />
                  <FTextField
                    name="description"
                    fullWidth
                    required
                    placeholder="Task's description"
                  />
                  <FTextField
                    type="datetime-local"
                    name="deadline"
                    sx={{ width: 1, mb: "20px" }}
                    inputProps={{ min: currentDateTime }}
                  />

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <LoadingButton
                      type="submit"
                      variant="contained"
                      size="small"
                      loading={isSubmitting || isLoading}
                    >
                      Create Task
                    </LoadingButton>
                  </Box>
                </FormProvider>
              )}
            </Grid>
          </Grid>) : ""}
      </Container>
    );
  }

  return renderTasks;
};

export default TaskList;
