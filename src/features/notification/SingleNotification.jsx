import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import CircleIcon from '@mui/icons-material/Circle';
// import { useTheme } from "@mui/material/styles";

function SingleNotification({ notification, handleReadNotification }) {
  // const theme = useTheme();

  return (
    <>
      <Stack
        width={300}
        height={80}
        justifyContent="center"
        alignItems="flex-start"
        padding={1}
        mb={1}
        sx={{
          cursor: "pointer",
          borderRadius: "10px",
          // backgroundColor: theme.palette.primary.main,
          // color: theme.palette.primary.contrastText,
          // "&:hover": {
          //   backgroundColor: "#EDEEF8",
          // },
        }}
        onClick={() => handleReadNotification(notification._id)}
      >
        {notification && (
          <>
            {notification.type === "Task" && (
              <Stack
                direction="row"
                alignItems={{ sm: "center" }}
                justifyContent="space-between"
                sx={{ mb: 0.5 }}
                position="relative"
              >
                <Box pr={3}>
                  <Typography>{notification.message}</Typography>
                </Box>
                {notification.read === false ? (<CircleIcon fontSize="small" color="secondary" />) : ""}
              </Stack>
            )}
            {notification.type === "Comment" && (
              <Stack
                direction="row"
                alignItems={{ sm: "center" }}
                justifyContent="space-between"
                sx={{ mb: 0.5 }}
                position="relative"
              >
                <Box pr={3}>
                  <Typography>{notification.message}</Typography>
                </Box>
                {notification.read === false ? (<CircleIcon fontSize="small" color="secondary" />) : ""}
              </Stack>
            )}
          </>
        )}
      </Stack>
      <Divider />
    </>
  );
}

export default SingleNotification;
