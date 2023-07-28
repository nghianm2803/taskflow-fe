import { Divider, Stack, Typography } from "@mui/material";
import React from "react";

function SingleNotification({ notification }) {
  return (
    <>
      <Stack
        width={300}
        height={80}
        justifyContent="center"
        alignItems="flex-start"
        padding={1}
        mb={1}
      >
        {notification && (
          <>
            {notification.type === "Task" && (
              <>
                <Typography >{notification.message}</Typography>
              </>
            )}
            {notification.type === "Comment" && (
              <>
                <Typography >
                  {notification.message}
                </Typography>
              </>
            )}
          </>
        )}
      </Stack>
      <Divider />
    </>
  );
}

export default SingleNotification;
