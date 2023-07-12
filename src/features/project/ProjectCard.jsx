import { Box, Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./projectcard.css";

function ProjectCard({ project }) {
  const navigate = useNavigate();

  const handleExplore = () => {
    const projectId = project._id;
    navigate(`/project/${projectId}`);
  };

  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      {project && (
        <Card
          className={isHovered ? "project-card-hovered" : "project-card"}
          sx={{
            width: 320,
            height: "100%",
            position: "relative",
            overflow: "hidden",
            backgroundColor: "aquamarine",
          }}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
          onClick={handleExplore}
        >
          <CardContent
            style={{
              position: "relative",
              zIndex: 1,
              padding: "8px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: "250px",
              marginTop: "20px",
              borderRadius: "10px",
            }}
          >
            <Box>
              <Box>
                <Typography
                  variant="h5"
                  gutterBottom
                  fontWeight="bold"
                  color="green"
                >
                  {project?.name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  gutterBottom
                >
                  {project?.description}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      )}
    </>
  );
}

export default ProjectCard;
