import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Divider,
  Popover,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProject } from "./projectSlice";
import ProjectHeader from "./ProjectHeader";
import EditProject from "./EditProject";
import DeleteProject from "./DeleteProject";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TasksList from "../task/TaskList";
import EmptyData from "../../pages/EmptyData";
import LoadingScreen from "../../components/LoadingScreen";
import useAuth from "../../hooks/useAuth";

function SingleProject() {
  const { user } = useAuth();
  const { id } = useParams();
  const dispatch = useDispatch();
  const project = useSelector((state) => state.project.currentProject);
  const isLoading = useSelector((state) => state.project.isLoading);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleDialogOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenDialog(true);
  };

  const editDialogClose = () => {
    setOpenEditDialog(false);
  };

  const handleEditBtnClick = () => {
    setOpenDialog(false);
    setOpenEditDialog(true);
  };

  const handleDeleteBtnClick = () => {
    setOpenDialog(false);
    setOpenDeleteDialog(true);
  };

  const deleteDialogClose = () => {
    setOpenDeleteDialog(false);
  };

  useEffect(() => {
    dispatch(getSingleProject(id));
  }, [dispatch, id]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Stack
      direction="row"
      spacing={2}
      justifyContent="center"
      alignItems="center"
      padding={1}
    >
      <Stack
        width={{ xs: "90vw", md: "75vw" }}
        minHeight="100vh"
        padding={1}
        direction="column"
        justifyContent="space-between"
      >
        {project && project.isDeleted === false ? (
          <Box width="100%" minHeight="80vh" padding={1}>
            <Stack
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <ProjectHeader project={project} />
              {user.role === "Manager" ? (
                <Box>
                  <IconButton onClick={handleDialogOpen}>
                    <MoreVertIcon fontSize="medium" />
                  </IconButton>
                </Box>) : ""}

              <Popover
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <DialogContent>
                  <Stack
                    sx={{
                      width: "100px",
                      height: "20px",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: "5px",
                    }}
                    onClick={handleEditBtnClick}
                  >
                    <Typography variant="subtitle2">Edit</Typography>
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                  </Stack>
                  <Divider />
                  <Stack
                    sx={{
                      width: "100px",
                      height: "20px",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: "5px",
                    }}
                    onClick={handleDeleteBtnClick}
                  >
                    <Typography variant="subtitle2">Delete</Typography>
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </DialogContent>
              </Popover>

              <EditProject
                project={project}
                openEditDialog={openEditDialog}
                editDialogClose={editDialogClose}
              />
              <DeleteProject
                id={id}
                openDeleteDialog={openDeleteDialog}
                deleteDialogClose={deleteDialogClose}
              />
            </Stack>

            <TasksList projectId={project._id} />
          </Box>
        ) : (
          <EmptyData />
        )}
      </Stack>
    </Stack>
  );
}

export default SingleProject;
