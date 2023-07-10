import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Divider,
  Popover,
  DialogContent,
  IconButton,
  Typography,
  Grid,
  Card,
  CardContent,
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
import AssignmentIcon from "@mui/icons-material/Assignment";
import ContentPasteGoIcon from "@mui/icons-material/ContentPasteGo";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

function SingleProject() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const project = useSelector((state) => state.project.currentProject);

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
          <Box width="100%" minHeight="80vh" padding={1}>
            <ProjectHeader project={project} />
            <Box>
              <IconButton onClick={handleDialogOpen}>
                <MoreVertIcon fontSize="medium" />
              </IconButton>
            </Box>

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
                  flexDirection="row"
                  alignItems="center"
                  onClick={handleEditBtnClick}
                >
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                  <Typography variant="subtitle2">Edit</Typography>
                </Stack>
                <Divider />
                <Stack
                  flexDirection="row"
                  alignItems="center"
                  onClick={handleDeleteBtnClick}
                >
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                  <Typography variant="subtitle2">Delete</Typography>
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

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Card
                  sx={{
                    width: "100%",
                    height: "70%",
                    backgroundColor: "#EDEEF8",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <CardContent
                    style={{
                      paddingBottom: "16px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <AssignmentIcon
                      style={{ color: "#3F51B5", paddingRight: "5px" }}
                    />
                    <Typography variant="body2" display="block" align="left">
                      Pending
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card
                  sx={{
                    width: "100%",
                    height: "70%",
                    backgroundColor: "#FFFDEC",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <CardContent
                    style={{
                      paddingBottom: "16px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <ContentPasteGoIcon
                      style={{ color: "#F1C93B", paddingRight: "5px" }}
                    />
                    <Typography variant="body2" display="block" align="left">
                      Working
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card
                  sx={{
                    width: "100%",
                    height: "70%",
                    backgroundColor: "#E6F9FB",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <CardContent
                    style={{
                      paddingBottom: "16px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <ContentPasteSearchIcon
                      style={{ color: "#00BCD4", paddingRight: "5px" }}
                    />
                    <Typography variant="body2" display="block" align="left">
                      Review
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card
                  sx={{
                    width: "100%",
                    height: "70%",
                    backgroundColor: "#F4F9ED",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <CardContent
                    style={{
                      paddingBottom: "16px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <AssignmentTurnedInIcon
                      style={{ color: "#8BC34A", paddingRight: "5px" }}
                    />
                    <Typography variant="body2" display="block" align="left">
                      Done
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <TasksList projectId={project._id} />
          </Box>
        )}
      </Stack>
    </Stack>
  );
}

export default SingleProject;
