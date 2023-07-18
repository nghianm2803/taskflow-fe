import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Link,
  TableContainer,
  Container,
  Card,
  Typography,
  Box,
  CardContent,
} from "@mui/material";
import { getTasksOfCurrentUser } from "./taskSlice";
import LoadingScreen from "../../components/LoadingScreen";
import { fDeadline } from "../../utils/formatTime";

function MyTasks() {
  const { tasksList, isLoading } = useSelector((state) => state.task);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasksOfCurrentUser({ limit: 6 }));
  }, [dispatch]);

  if (isLoading) {
    return <LoadingScreen />;
  }
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
      <Typography variant="h4" sx={{ mb: 3 }}>
        My Tasks
      </Typography>
      <Card sx={{ p: 3 }}>
        <Box sx={{ overflowX: "auto" }}>
          {tasksList && tasksList.length === 0 ? (
            <Typography variant="subtitle2" sx={{ my: 4 }}>
              No tasks available.
            </Typography>
          ) : (
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ width: { xs: "20%", sm: "25%" } }}>
                      Name
                    </TableCell>
                    <TableCell
                      sx={{
                        display: { sm: "table-cell" },
                        width: "20%",
                      }}
                    >
                      Status
                    </TableCell>
                    <TableCell
                      sx={{ display: { md: "table-cell" }, width: "20%" }}
                    >
                      Priority
                    </TableCell>
                    <TableCell sx={{ display: { md: "table-cell" } }}>
                      Deadline
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tasksList.map((task) => {
                    return (
                      <TableRow key={task._id} hover>
                        <TableCell
                          align="left"
                          sx={{
                            cursor: "pointer",
                          }}
                        >
                          <Link variant="subtitle2" sx={{ fontWeight: 600 }}>
                            {task.name}
                          </Link>
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{ display: { sm: "table-cell" } }}
                        >
                          <Card
                            sx={{
                              width: "70%",
                              height: "40px",
                              display: "flex",
                              alignItems: "center",
                              marginBottom: "10px",
                              backgroundColor: {
                                Pending: "#C2E1FB",
                                Working: "#FFF283",
                                Review: "#E6F9FB",
                                Done: "#CBE4AE",
                              }[task.status],
                            }}
                          >
                            <CardContent>{task.status}</CardContent>
                          </Card>
                        </TableCell>
                        <TableCell
                          align="left"
                          sx={{ display: { md: "table-cell" } }}
                        >
                          <Card
                            sx={{
                              width: "70%",
                              height: "40px",
                              display: "flex",
                              alignItems: "center",
                              marginBottom: "10px",
                              backgroundColor: {
                                Low: "#CBFFA9",
                                Medium: "#F1C93B",
                                High: "#EF6262",
                              }[task.priority],
                            }}
                          >
                            <CardContent>
                              <Typography
                                variant="body2"
                                display="block"
                                align="left"
                              >
                                {task.priority}
                              </Typography>
                            </CardContent>
                          </Card>
                        </TableCell>
                        <TableCell align="left">
                          {fDeadline(task.deadline)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Card>
    </Container>
  );
}

export default MyTasks;
