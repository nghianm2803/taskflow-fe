import React, { useEffect } from "react";
import TaskCard from "./TaskCard";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "./taskSlice";
import LoadingScreen from "../../components/LoadingScreen";
import { Grid } from "@mui/material";

const TaskList = ({ projectId }) => {
  const { tasksList, isLoading } = useSelector((state) => state.task);
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
