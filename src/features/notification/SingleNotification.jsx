import { Divider, Stack, Typography, IconButton } from "@mui/material";
import React from "react";
import CircleIcon from '@mui/icons-material/Circle';

function SingleNotification({ notification, handleReadNotification }) {
  return (
    <>
      <Stack
        width={300}
        height={80}
        justifyContent="space-between"
        alignItems="space-between"
        padding={1}
        mb={1}
        sx={{
          cursor: "pointer",
          borderRadius: "10px",
        }}
        onClick={() => handleReadNotification(notification._id)}
      >
        {notification && (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 0.5 }}
            position="relative"
          >
            <Typography>{notification.message}</Typography>
            {notification.read === false ? (
              <IconButton>
                <CircleIcon fontSize="small" color="secondary" />
              </IconButton>) : (
              <IconButton sx={{ opacity: 0 }}>
                <CircleIcon fontSize="small" color="secondary" />
              </IconButton>)
            }
          </Stack>
        )}
      </Stack >
      <Divider />
    </>
  );
}

export default SingleNotification;
