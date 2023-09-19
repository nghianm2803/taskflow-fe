import { Outlet, Link as RouterLink } from "react-router-dom";
import { Box, Button, Container, Typography } from "@mui/material";
import EmptyDataImage from "../assets/emptydata.svg";

function EmptyData() {
  return (
    <Container maxWidth="xs">
      <Box sx={{ maxWidth: 480, marginTop: "100px", textAlign: "center", mt: 5 }}>
        <Box component="img" alt="Have an Error" src={EmptyDataImage} sx={{ width: "400px" }} />
        <Typography variant="h4">No record available</Typography>
        <Outlet />
        <Button to="/" variant="contained" component={RouterLink} sx={{ marginTop: "30px" }}>
          Go to Home
        </Button>
      </Box>
    </Container>
  );
}

export default EmptyData;
