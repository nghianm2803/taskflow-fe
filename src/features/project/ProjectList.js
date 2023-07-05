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
} from "@mui/material";
import { FormProvider } from "../../components/form";
import SearchInput from "../../components/SearchInput";
import SortProject from "../../components/SortProject";
import { useForm } from "react-hook-form";
import ProjectCard from "./ProjectCard";
import LoadingScreen from "../../components/LoadingScreen";

function ProjectList() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const projects = useSelector((state) => state.project.project);
  const totalPage = useSelector((state) => state.project.totalPages);
  

  const handleOnSubmit = (search) => {
    setSearch(search);
  };

  const handleChange = (e, value) => {
    setPage(value);
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
