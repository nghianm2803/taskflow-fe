import { Box, Stack, Typography } from "@mui/material";
import React from "react";

function ProjectHeader({ project }) {
  return (
    <Stack direction={{ xs: "column", md: "row" }} spacing={2} padding={1}>
      <Stack direction="row" width={{ xs: "100%", md: "75%" }} minheight={50}>
        <Stack direction="column" width="100%" padding={1}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "primary.main",
            }}
          >
            {project?.name}
          </Typography>
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ fontFamily: "sans-serif", fontStyle: "italic" }}
            >
              {project?.description}
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default ProjectHeader;
