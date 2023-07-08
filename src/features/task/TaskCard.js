import { Typography, Box, Card } from "@mui/material";
import React from "react";
import { useState } from "react";
import "./taskstyle.css";
import { useNavigate } from "react-router-dom";
import { fDate } from "../../utils/formatTime";

const TaskCard = ({ task }) => {
  const navigate = useNavigate();

  // const handleExplore = () => {
  //   const taskId = task._id;
  //   navigate(`/task/${taskId}`);
  // };

  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };

  return (
    <Card
      className={isHovered ? "task-card-hovered" : "task-card"}
      sx={{
        p: 1,
        width: 320,
        height: "100%",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      // onClick={handleExplore}
    >
      <Typography sx={{ overflowWrap: "break-word" }}>{task.name}</Typography>
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
        <Typography>{task.assignTo ? task.assignTo : "Unassigned"}</Typography>
        <Typography> {fDate(task.deadline)}</Typography>
      </Box>
    </Card>
  );
};

export default TaskCard;
