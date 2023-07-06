import React, { useEffect } from "react";
import { Box, Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProject } from "./projectSlice";
import ProjectHeader from "./ProjectHeader";
// import ProjectBanner from "./ProjectBanner";
import ScrollToTopButton from "../../components/ScrollToTopButton";

function SingleProject() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const project = useSelector((state) => state.project.currentProject);

  useEffect(() => {
    dispatch(getSingleProject(id));
  }, [dispatch, id]);

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={2}
      justifyContent="center"
      alignItems="center"
      mt="30px"
      padding={1}
    >
      <Stack
        width={{ xs: "90vw", md: "75vw" }}
        minHeight="100vh"
        padding={1}
        direction="column"
        justifyContent="space-between"
      >
        {project && (
          <Box width="100%" minheight="80vh" padding={1}>
            <ProjectHeader project={project} />
          </Box>
        )}
      </Stack>
      <ScrollToTopButton />
    </Stack>
  );
}

export default SingleProject;
