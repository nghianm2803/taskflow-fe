import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Typography, Container } from "@mui/material";
import NotFoundImage from "../assets/404.svg";

function NotFoundPage() {
  return (
    <Container sx={{ display: "flex", height: "100%", alignItems: "center" }}>
      <Box sx={{ maxWidth: 480, margin: "auto", textAlign: "center", mt: 5 }}>
        <Box component="img" alt="Have an Error" src={NotFoundImage} sx={{ width: "300px" }} />
        <Typography variant="h4" paragraph>
          Page not found!
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: "1rem" }}>
          Opps. Have an error, please try again or go Home.
        </Typography>
        <Button to="/" variant="contained" component={RouterLink}>
          Go to Home
        </Button>
      </Box>
    </Container>
  );
}
export default NotFoundPage;
