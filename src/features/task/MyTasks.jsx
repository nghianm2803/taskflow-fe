import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  Container,
  Card,
  Typography,
  Box,
  TableSortLabel,
  CardContent,
} from "@mui/material";
import { getTasksOfCurrentUser } from "./taskSlice";
import LoadingScreen from "../../components/LoadingScreen";
import { fDeadline } from "../../utils/formatTime";
import EmptyData from "../../pages/EmptyData";

function MyTasks() {
  const { tasksList, isLoading } = useSelector((state) => state.task);
  const [sorting, setSorting] = useState({ field: "", order: "" });
  const [sortedTasks, setSortedTasks] = useState([]);
  const dispatch = useDispatch();

  const handleSort = (field) => {
    if (sorting.field === field) {
      setSorting((prevState) => ({
        ...prevState,
        order: prevState.order === "asc" ? "desc" : "asc",
      }));
    } else {
      setSorting({ field, order: "asc" });
    }
  };

  useEffect(() => {
    dispatch(getTasksOfCurrentUser({ limit: 100 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (tasksList.length > 0) {
      const sorted = [...tasksList].sort((a, b) => {
        const isAsc = sorting.order === "asc";
        if (a[sorting.field] < b[sorting.field]) {
          return isAsc ? -1 : 1;
        }
        if (a[sorting.field] > b[sorting.field]) {
          return isAsc ? 1 : -1;
        }
        return 0;
      });
      setSortedTasks(sorted);
    }
  }, [tasksList, sorting]);

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
            <EmptyData />
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
                      onClick={() => handleSort("status")}
                      sortDirection={
                        sorting.field === "status" ? sorting.order : false
                      }
                    >
                      <TableSortLabel
                        active={sorting.field === "status"}
                        direction={
                          sorting.field === "status" ? sorting.order : "asc"
                        }
                      >
                        Status
                      </TableSortLabel>
                    </TableCell>
                    <TableCell
                      sx={{ display: { md: "table-cell" }, width: "20%" }}
                      onClick={() => handleSort("priority")}
                      sortDirection={
                        sorting.field === "priority" ? sorting.order : false
                      }
                    >
                      <TableSortLabel
                        active={sorting.field === "priority"}
                        direction={
                          sorting.field === "priority" ? sorting.order : "asc"
                        }
                      >
                        Priority
                      </TableSortLabel>
                    </TableCell>
                    <TableCell
                      sx={{ display: { md: "table-cell" } }}
                      onClick={() => handleSort("deadline")}
                      sortDirection={
                        sorting.field === "deadline" ? sorting.order : false
                      }
                    >
                      <TableSortLabel
                        active={sorting.field === "deadline"}
                        direction={
                          sorting.field === "deadline" ? sorting.order : "asc"
                        }
                      >
                        Deadline
                      </TableSortLabel>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedTasks.map((task) => {
                    return (
                      <TableRow key={task._id} hover>
                        <TableCell
                          align="left"
                          sx={{
                            cursor: "pointer",
                          }}
                        >
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            {task.name}
                          </Typography>
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
                            <CardContent>
                              <Typography
                                variant="body2"
                                display="block"
                                align="left"
                                color="#212B36"
                              >
                                {task.status}
                              </Typography>
                            </CardContent>
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
                                color="#212B36"
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
