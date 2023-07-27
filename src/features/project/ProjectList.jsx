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
  Button,
  Fade,
  alpha,
} from "@mui/material";
import SearchInput from "../../components/SearchInput";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";
import LoadingScreen from "../../components/LoadingScreen";
import "./projectcard.css";
import { Link } from "react-router-dom";
import { FTextField, FormProvider } from "../../components/form";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { sendInvitation } from "../user/userSlice";
import useAuth from "../../hooks/useAuth";

function ProjectList() {
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const projects = useSelector((state) => state.project.project);
  const totalPage = useSelector((state) => state.project.totalPages);
  const isLoading = useSelector((state) => state.project.isLoading);
  const { user } = useAuth();

  const dispatch = useDispatch();

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };

  const handleOnSubmit = (name) => {
    setName(name);
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

  useEffect(() => {
    dispatch(
      getProjects({
        page,
        name,
      })
    );
  }, [dispatch, page, name]);

  const yupSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
  });

  const defaultValues = {
    email: "",
  };

  const methods = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (data) => {
    dispatch(sendInvitation(data)).then(() => {
      reset();
    });
  };

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
        <Box display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          justifyContent="flex-start"
          alignItems="center">
          <Box marginBottom={5} marginRight={1}>
            <SearchInput handleOnSubmit={handleOnSubmit} />
          </Box>
          <Box marginBottom={5}>
            <Button variant="contained" component={Link} to="/tasks/mytasks">
              My Tasks
            </Button>
          </Box>
        </Box>
        {user.role === "Manager" ? (<Box marginBottom={5}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Box display="flex"
              flexDirection={{ xs: "column", md: "row" }}
              justifyContent="flex-start"
              alignItems="center">
              <FTextField
                name="email"
                fullWidth
                label="Add member"
                placeholder="Enter email..."
                size="small"
                sx={{
                  "& fieldset": {
                    borderWidth: `1px !important`,
                    borderColor: alpha("#919EAB", 0.32),
                    marginRight:"10px"
                  },
                }}
              />
              <LoadingButton
                type="submit"
                variant="contained"
                color="primary"
                loading={isSubmitting || isLoading}
              >
                Add
              </LoadingButton>
            </Box>
          </FormProvider>
        </Box>) : ""}
      </Stack>
      {projects ? (
        <>
          <Grid
            container
            direction="row"
            spacing={3}
            columns={{ xs: 12, sm: 8, md: 12 }}
          >
            {projects?.map((project) => (
              <Grid item xs={12} sm={4} md={4} key={project._id}>
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
                  backgroundColor: "#D2B48C",
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
                    color: "#52796F",
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
                        <ProjectForm onClose={handleCloseModal} />
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
