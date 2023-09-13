import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../user/userSlice";
import LoadingScreen from "../../components/LoadingScreen";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import EmptyData from "../../pages/EmptyData";
import SearchInput from "../../components/SearchInput";
import { fDeadline } from "../../utils/formatTime";
function Dashboard() {
  const dispatch = useDispatch();
  const { users, count, isLoading } = useSelector((state) => state.user);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(getUsers({ page: 1, limit: count, name: searchQuery }));
  }, [dispatch, searchQuery, count]);

  const handleOnSubmit = (name) => {
    setSearchQuery(name);
  };

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
        Dashboard
      </Typography>
      <Stack
        display="flex"
        flexDirection={{ xs: "column", sm: "row", md: "row" }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Box display="flex" flexDirection="row" justifyContent="flex-start" alignItems="center">
          <Box mb={5} mr={1}>
            <SearchInput handleOnSubmit={handleOnSubmit} />
          </Box>
        </Box>
      </Stack>
      <Card sx={{ p: 3 }}>
        <Box sx={{ overflowX: "auto" }}>
          {users && users.length === 0 ? (
            <EmptyData />
          ) : (
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ width: { xs: "20%", sm: "25%" } }}>Name</TableCell>
                    <TableCell
                      sx={{
                        display: { sm: "table-cell" },
                        width: "20%",
                      }}
                    >
                      Email
                    </TableCell>
                    <TableCell sx={{ display: { md: "table-cell" }, width: "20%" }}>Role</TableCell>
                    <TableCell sx={{ display: { md: "table-cell" }, width: "20%" }}>Total tasks</TableCell>
                    <TableCell sx={{ display: { md: "table-cell" }, width: "20%" }}>Created At</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => {
                    return (
                      <TableRow key={user._id} hover>
                        <TableCell
                          align="left"
                          sx={{
                            cursor: "pointer",
                          }}
                        >
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <Avatar alt={user?.avatar} src={user?.avatar} />
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                              {user.name}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left" sx={{ display: { sm: "table-cell" } }}>
                          {user.email}
                        </TableCell>
                        <TableCell align="left" sx={{ display: { md: "table-cell" } }}>
                          <Card
                            sx={{
                              width: "60%",
                              height: "40px",
                              display: "flex",
                              alignItems: "center",
                              marginBottom: "10px",
                              backgroundColor: {
                                Admin: "#CBFFA9",
                                Manager: "#F1C93B",
                                Employee: "#EF6262",
                              }[user.role],
                            }}
                          >
                            <CardContent>
                              <Typography variant="body2" display="block" color="#212B36">
                                {user.role}
                              </Typography>
                            </CardContent>
                          </Card>
                        </TableCell>
                        <TableCell align="left">{user.tasksList.length}</TableCell>
                        <TableCell align="left">{fDeadline(user.createdAt)}</TableCell>
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

export default Dashboard;

