import { Outlet } from "react-router-dom";
import Logo from "../components/Logo";
import { Stack, Typography } from "@mui/material";

function BlankLayout() {
  return (
    <Stack minHeight="100vh" justifyContent="center" alignItems="center">
      <Logo sx={{ width: 90, height: 90, mb: 5 }} />
      <Typography variant="h4">No record available</Typography>
      <Outlet />
    </Stack>
  );
}

export default BlankLayout;
