import { Outlet, Link as RouterLink } from "react-router-dom";
import { Box, Button, Container, Typography } from "@mui/material";

function EmptyData() {
  return (
    <Container maxWidth="xs">
      <Box sx={{ maxWidth: 480, marginTop: "100px", textAlign: "center" }}>
        <Typography variant="h4">No record available</Typography>
        <Outlet />
        <Button to="/" variant="contained" component={RouterLink} sx={{ marginTop: "30px" }}>
          Go to Home
        </Button>
      </Box>
    </Container >
  );
}

export default EmptyData;
