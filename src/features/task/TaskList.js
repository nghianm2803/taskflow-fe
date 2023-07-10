import React, { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import { useDispatch, useSelector } from "react-redux";
import { getTasks, createTask, addTaskToProject } from "./taskSlice";
import LoadingScreen from "../../components/LoadingScreen";
import { Grid, Card, Typography, alpha, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "./taskstyle.css";
import { FormProvider, FTextField } from "../../components/form";
import { LoadingButton } from "@mui/lab";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";

const TaskList = ({ projectId }) => {
  const { tasksList, isLoading } = useSelector((state) => state.task);

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

    const formattedDeadline = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

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
      dispatch(getTasks({ projectId, limit: 100 }));
    }
  }, [projectId, dispatch]);

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

    renderTasks = (
      <Grid container spacing={2}>
        {pendingTasks.length > 0 && (
          <Grid item xs={12} sm={6} md={3}>
            {pendingTasks.map((task) => (
              <TaskCard key={task._id} task={task} />
            ))}
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
              }}
              onMouseEnter={handleHover}
              onMouseLeave={handleLeave}
              onClick={handleTaskClick}
            >
              <AddIcon fontSize="small" />
              <Typography variant="body2" display="block" align="center">
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
                  sx={{
                    "& fieldset": {
                      borderWidth: `1px !important`,
                      borderColor: alpha("#47BA5F", 0.32),
                    },
                  }}
                />
                <FTextField
                  name="description"
                  fullWidth
                  required
                  placeholder="Task's description"
                  sx={{
                    "& fieldset": {
                      borderWidth: `1px !important`,
                      borderColor: alpha("#47BA5F", 0.32),
                    },
                  }}
                />
                <FTextField
                  type="datetime-local"
                  name="deadline"
                  sx={{ width: 1, mb: "20px" }}
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
                  {/* Invalid name & Invalid description & Invalid Deadline &
                  Deadline must be in the format 'yyyy-mm-dd hh:mm:ss' */}
                </Box>
              </FormProvider>
            )}
          </Grid>
        )}

        {workingTasks.length > 0 && (
          <Grid item xs={12} sm={6} md={3}>
            {workingTasks.map((task) => (
              <TaskCard key={task._id} task={task} />
            ))}
          </Grid>
        )}

        {reviewTasks.length > 0 && (
          <Grid item xs={12} sm={6} md={3}>
            {reviewTasks.map((task) => (
              <TaskCard key={task._id} task={task} />
            ))}
          </Grid>
        )}

        {doneTasks.length > 0 && (
          <Grid item xs={12} sm={6} md={3}>
            {doneTasks.map((task) => (
              <TaskCard key={task._id} task={task} />
            ))}
          </Grid>
        )}
      </Grid>
    );
  } else if (isLoading) {
    renderTasks = <LoadingScreen />;
  }

  return renderTasks;
};

export default TaskList;
