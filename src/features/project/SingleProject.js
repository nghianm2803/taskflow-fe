import React, { useEffect, useState } from "react";
import { Box, Stack, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProject } from "./projectSlice";
import ProjectHeader from "./ProjectHeader";
import EditProject from "./EditProject";
import ScrollToTopButton from "../../components/ScrollToTopButton";

function SingleProject() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const project = useSelector((state) => state.project.currentProject);

  const [openEditDialog, setOpenEditDialog] = useState(false);

  const editDialogOpen = () => {
    setOpenEditDialog(true);
  };

  const editDialogClose = () => {
    setOpenEditDialog(false);
  };

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
            <Button variant="outlined" onClick={editDialogOpen}>
              Edit Project
            </Button>
            <EditProject
              project={project}
              openEditDialog={openEditDialog}
              editDialogClose={editDialogClose}
              projectId={id}
            />
          </Box>
        )}
      </Stack>
      <ScrollToTopButton />
    </Stack>
  );
}

export default SingleProject;
