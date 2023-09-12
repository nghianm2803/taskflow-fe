import { Box, Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./projectcard.css";
import cover_1 from "../../assets/cover_1.jpeg";
import cover_2 from "../../assets/cover_2.jpeg";
import cover_3 from "../../assets/cover_3.jpeg";
import cover_4 from "../../assets/cover_4.jpeg";
import cover_5 from "../../assets/cover_5.jpeg";

const projectImages = [cover_1, cover_2, cover_3, cover_4, cover_5];

function ProjectCard({ project }) {
  const navigate = useNavigate();

  const handleExplore = () => {
    const projectId = project._id;
    navigate(`/projects/${projectId}`);
  };

  const [isHovered, setIsHovered] = useState(false);
  const [randomIndex, setRandomIndex] = useState(0);

  useEffect(() => {
    const newIndex = Math.floor(Math.random() * projectImages.length);
    setRandomIndex(newIndex);
  }, []);

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
            width: 350,
            height: "100%",
            position: "relative",
            overflow: "hidden",
            backgroundImage: `url(${projectImages[randomIndex]})`,
            cursor: "pointer",
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
                <Typography variant="h5" gutterBottom fontWeight="bold" color="#523D56">
                  {project?.name}
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="#523D56">
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
