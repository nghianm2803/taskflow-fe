import { Outlet } from "react-router-dom";
import { Stack, Typography } from "@mui/material";

function EmptyData() {
  return (
    <Stack minHeight="100vh" justifyContent="center" alignItems="center">
      <Typography variant="h4">No record available</Typography>
      <Outlet />
    </Stack>
  );
}

export default EmptyData;
