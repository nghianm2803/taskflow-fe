import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "./projectSlice";
import {
  Box,
  Container,
  Grid,
  Pagination,
  Stack,
  Typography,
  CardContent,
  Card,
  Modal,
  Fade,
} from "@mui/material";
import { FormProvider } from "../../components/form";
import SearchInput from "../../components/SearchInput";
import SortProject from "../../components/SortProject";
import { useForm } from "react-hook-form";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";
import LoadingScreen from "../../components/LoadingScreen";
import "./projectcard.css";

function ProjectList() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const projects = useSelector((state) => state.project.project);
  const totalPage = useSelector((state) => state.project.totalPages);

  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };

  const handleOnSubmit = (search) => {
    setSearch(search);
  };

  const handleChange = (e, value) => {
    setPage(value);
  };

  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const handleCreateProject = () => {
    setIsCreatingProject(true);
  };
  const handleCloseModal = () => {
    setIsCreatingProject(false);
  };

  const handleSortChange = (sortValue) => {
    setSortBy(sortValue);
  };
  const methods = useForm();

  const { handleSubmit } = methods;

  const onSubmit = (formData) => {
    setSortBy(formData.sortBy);
  };

  useEffect(() => {
    dispatch(
      getProjects({
        page,
        search,
        sortBy,
      })
    );
  }, [dispatch, page, search, sortBy]);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        mt: 3,
      }}
      padding="1"
    >
      <Typography
        color="primary"
        textAlign="center"
        variant="h4"
        fontFamily="sans-serif"
        fontWeight="bolder"
        mt="10px"
        mb="50px"
      >
        Browse current Start Up opportunities on Taskflow.
      </Typography>
      <Stack
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Box marginBottom={5}>
          <SearchInput handleOnSubmit={handleOnSubmit} />
        </Box>
        <Box marginBottom={5}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <SortProject handleSortChange={handleSortChange} mt={2} />
          </FormProvider>
        </Box>
      </Stack>
      {projects ? (
        <>
          <Grid
            container
            direction="row"
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 12, sm: 8, md: 12 }}
          >
            {projects?.map((project, index) => (
              <Grid item xs={12} sm={4} md={4} key={index}>
                <ProjectCard key={project._id} project={project} />
              </Grid>
            ))}

            <Grid item xs={12} sm={4} md={4}>
              <Card
                className={isHovered ? "project-card-hovered" : "project-card"}
                sx={{
                  width: 320,
                  height: "100%",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
              >
                <CardContent
                  style={{
                    position: "relative",
                    zIndex: 1,
                    padding: "8px",
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "250px",
                    marginTop: "20px",

                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#D2B48C",
                    color: "#172b4d",
                    fontSize: "1.5rem",
                    borderRadius: "10px",
                    cursor: "pointer",
                  }}
                  onClick={handleCreateProject}
                >
                  Create new Project
                </CardContent>
                {isCreatingProject && (
                  <Modal
                    open={isCreatingProject}
                    onClose={handleCloseModal}
                    closeAfterTransition
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Fade in={isCreatingProject}>
                      <Box
                        sx={{
                          width: 400, // Adjust the width of the modal as needed
                          bgcolor: "background.paper",
                          borderRadius: "10px",
                          boxShadow: 24,
                          p: 4,
                        }}
                      >
                        <ProjectForm />
                      </Box>
                    </Fade>
                  </Modal>
                )}
              </Card>
            </Grid>
          </Grid>
          <Stack spacing={2} mt={5} justifyContent="center" alignItems="center">
            <Pagination
              count={totalPage}
              variant="outlined"
              shape="rounded"
              onChange={handleChange}
            />
          </Stack>
        </>
      ) : (
        <LoadingScreen />
      )}
    </Container>
  );
}

export default ProjectList;
