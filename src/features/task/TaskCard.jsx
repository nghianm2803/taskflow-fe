import React, { useState } from "react";
import { Typography, Box, Card, Avatar, Stack } from "@mui/material";
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Card
          className={isHovered ? "task-card-hovered" : "task-card"}
          sx={{
            p: 1,
            width: "100%",
            minHeight: "40px",
            height: "auto",
            position: "relative",
            overflow: "hidden",
            marginBottom: "10px",
            backgroundColor: "#FFF"
          }}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
          onClick={handleTaskClick}
        >
          <Typography sx={styleTypo} variant="h6">
            {task.name}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              rowGap: 3,
              columnGap: 2,
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
              },
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              {task.assignTo && (
                <Avatar
                  alt={task.assignTo.name}
                  src={task.assignTo.avatar}
                  sx={{ width: "30px", height: "30px" }}
                />
              )}
              <Typography sx={styleTypo}>
                {task.assignTo ? task.assignTo.name : "Unassigned"}
              </Typography>
            </Stack>
            <Typography sx={styleTypo}>{fDate(task.deadline)}</Typography>
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
  color: "#212B36"
};

export default TaskCard;
