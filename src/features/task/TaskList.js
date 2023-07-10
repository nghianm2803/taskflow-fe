import React, { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "./taskSlice";
import LoadingScreen from "../../components/LoadingScreen";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "./taskstyle.css";

const TaskList = ({ projectId }) => {
  const { tasksList, isLoading } = useSelector((state) => state.task);

  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (projectId) {
      dispatch(getTasks({ projectId }));
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
                marginTop: "5px",
                width: "100%",
                height: "20%",
                position: "relative",
                textAlign: "center",
                alignItems: "center",
              }}
              onMouseEnter={handleHover}
              onMouseLeave={handleLeave}
              // onClick={handleExplore}
            >
              <CardContent
                style={{
                  paddingBottom: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AddIcon fontSize="small" />
                <Typography variant="body2" display="block" align="center">
                  Task
                </Typography>
              </CardContent>
            </Card>
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
