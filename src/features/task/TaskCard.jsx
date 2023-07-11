import { Typography, Box, Card } from "@mui/material";
import React, { useState } from "react";
import "./taskstyle.css";
import { useNavigate } from "react-router-dom";
import { fDate } from "../../utils/formatTime";

const TaskCard = ({ task }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };

  const handleTaskClick = () => {
    console.log("Task card clicked:", task._id);
  };

  return (
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
