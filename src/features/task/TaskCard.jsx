import React, { useState } from "react";
import { Typography, Box, Card, CardContent, Collapse } from "@mui/material";
import "./taskstyle.css";
import { fDate } from "../../utils/formatTime";

const TaskCard = ({ task }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };

  const handleTaskClick = () => {
    setShowDetail(!showDetail);
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
        {showDetail && (
          <Collapse
            in={showDetail}
            timeout="1000"
            unmountOnExit
            sx={{
              position: "relative",
              top: 0,
              right: 0,
              width: "50%",
              transition: "width 0.3s ease",
              transformOrigin: "top right",
              backgroundColor: "red",
            }}
          >
            <Box sx={{ mt: 2 }}>
              <CardContent>
                <Card sx={{ maxWidth: 345 }}>
                  <Typography variant="body2">
                    Task details: {task.description}
                  </Typography>
                </Card>
              </CardContent>
            </Box>
          </Collapse>
        )}
      </Box>
    </>
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
