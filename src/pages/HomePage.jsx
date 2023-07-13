import React from "react";
import useAuth from "../hooks/useAuth";
import { Box, Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function HomePage() {
  const auth = useAuth();

  if (!auth.user) {
    return <p>You are not logged in.</p>;
  }

  return (
    <Container maxWidth="100vw" maxheight="100vh">
      <Box
        maxwidth="100vw"
        height="80vh"
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems="center"
        padding="10px"
      >
        <Box p="10px">
          <Typography variant="h2" mb={5} color="primary">
            {" "}
            Taskflow{" "}
          </Typography>
          <Typography variant="h6">
            Our platform build is to help manage project easy.
          </Typography>
          <Typography variant="h6">
            We help tracking project by tasks.{" "}
          </Typography>
          <Typography variant="h6" mb={3}>
            Join us!
          </Typography>
          <Button variant="contained" component={Link} to="/projects">
            Projects
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default HomePage;
