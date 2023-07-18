import React, { useEffect } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  alpha,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FTextField, FormProvider } from "../../components/form";
import { LoadingButton } from "@mui/lab";
import { updateProject } from "./projectSlice";

const updateSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
});

function EditProject({ project, openEditDialog, editDialogClose }) {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.project.isLoading);

  const methods = useForm({
    resolver: yupResolver(updateSchema),
  });

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (data) => {
    dispatch(updateProject({ id: project._id, ...data }));
    editDialogClose();
  };

  useEffect(() => {
    reset(project);
  }, [project, reset]);

  return (
    <Dialog open={openEditDialog} onClose={editDialogClose}>
      <DialogTitle color="primary" textAlign="center">
        Edit your project <Divider />{" "}
      </DialogTitle>
      <DialogContent>
        <Box minWidth={350} maxHeight={350} mt={1}>
          <Stack spacing={2}>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <FTextField
                name="name"
                fullWidth
                onChange={(e) => setValue("name", e.target.value)}
                placeholder="Project name..."
                sx={{
                  marginBottom: "5px",
                  "& fieldset": {
                    borderWidth: `1px !important`,
                    borderColor: alpha("#919EAB", 0.32),
                  },
                }}
              />
              <FTextField
                name="description"
                multiline
                fullWidth
                onChange={(e) => setValue("description", e.target.value)}
                rows={2}
                placeholder="Project description..."
                sx={{
                  marginBottom: "5px",
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
                  color="primary"
                  loading={isSubmitting || isLoading}
                >
                  Save Change
                </LoadingButton>
              </Box>
            </FormProvider>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default EditProject;
