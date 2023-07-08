import React, { useEffect } from "react";
import TaskCard from "./TaskCard";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "./taskSlice";
import LoadingScreen from "../../components/LoadingScreen";
import { Stack } from "@mui/material";

const TaskList = ({ projectId }) => {
  const { tasksList, isLoading } = useSelector((state) => state.task);
  const dispatch = useDispatch();

  useEffect(() => {
    if (projectId) {
      dispatch(getTasks({ projectId }));
    }
  }, [projectId, dispatch]);

  let renderTasks;

  if (tasksList.length > 0) {
    const tasksOfProject = tasksList.filter(
      (task) => task.projectTo === projectId
    );

    renderTasks = (
      <Stack spacing={1.5}>
        {tasksOfProject.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </Stack>
    );
  } else if (isLoading) {
    renderTasks = <LoadingScreen />;
  }

  return renderTasks;
};

export default TaskList;
