import React from "react";
import { Box, Card, alpha, Stack, Typography } from "@mui/material";

import { FormProvider, FTextField } from "../../components/form";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { createProject } from "./projectSlice";
import { LoadingButton } from "@mui/lab";

const yupSchema = Yup.object().shape({
  name: Yup.string().required("This field is required"),
  description: Yup.string().required("This field is required"),
});

const defaultValues = {
  name: "",
  description: "",
};

function ProjectForm({ onClose }) {
  const { isLoading } = useSelector((state) => state.project);

  const methods = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(createProject(data)).then(() => {
      reset();
      onClose();
    });
  };

  return (
    <Card sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Typography variant="subtitle2">Project Name</Typography>
          <FTextField
            name="name"
            fullWidth
            required
            label="Project's name"
            rows={4}
            sx={{
              "& fieldset": {
                borderWidth: `1px !important`,
                borderColor: alpha("#919EAB", 0.32),
              },
            }}
          />
          <Typography variant="subtitle2">Project Description</Typography>
          <FTextField
            name="description"
            multiline
            fullWidth
            required
            rows={4}
            label="Project's description"
            sx={{
              "& fieldset": {
                borderWidth: `1px !important`,
                borderColor: alpha("#919EAB", 0.32),
              },
            }}
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <LoadingButton
              type="submit"
              variant="contained"
              size="small"
              loading={isSubmitting || isLoading}
            >
              Create Project
            </LoadingButton>
          </Box>
        </Stack>
      </FormProvider>
    </Card>
  );
}

export default ProjectForm;
