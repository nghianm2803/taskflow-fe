import { Box, Typography } from "@mui/material";
import React from "react";
import SingleNotification from "./SingleNotification";

function NotificationCard({ notifications }) {
  return (
    <Box>
      {notifications && notifications.length > 0 ? (
        <>
          {notifications.map((notification) => (
            <SingleNotification
              key={notification._id}
              notification={notification}
            />
          ))}
        </>
      ) : (
        <Typography variant="h6" textAlign="center" color="primary">
          Nothing Here Yet!
        </Typography>
      )}
    </Box>
  );
}

export default NotificationCard;
