import React, { useState } from "react";
import { Typography, Box, Card } from "@mui/material";
import "./taskstyle.css";
import { fDate } from "../../utils/formatTime";
import TaskDetail from "./TaskDetail";

const TaskCard = ({ task }) => {
  const [showDetail, setShowDetail] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };

  const handleTaskClick = () => {
    setShowDetail(!showDetail);
  };

  const handleCloseForm = () => {
    setShowDetail(false);
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "flex-start" }}>
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
          <Typography sx={styleTypo}>{task.name}</Typography>
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
            <Typography sx={styleTypo}>
              {task.assignTo ? task.assignTo : "Unassigned"}
            </Typography>
            <Typography sx={styleTypo}> {fDate(task.deadline)}</Typography>
          </Box>
        </Card>
        {showDetail && <TaskDetail task={task} onClose={handleCloseForm} />}
      </Box>
    </>
  );
};

const styleTypo = {
  fontWeight: "500px",
  fontSize: "14px",
  lineHeight: "20px",
  letterSpace: "0px",
  wordBreak: "break-word",
  cursor: "pointer",
};

export default TaskCard;
