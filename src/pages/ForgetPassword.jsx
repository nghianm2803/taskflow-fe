import React from "react";
import { Stack, Alert, Container, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { FormProvider, FTextField } from "../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { forgotPassword } from "../features/user/userSlice";
import { useDispatch } from "react-redux";
import AlertMsg from "../components/AlertMsg";

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const defaultValues = {
  email: "",
};

function ForgetPassword() {
  const dispatch = useDispatch();

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    const { email } = data;
    try {
      await dispatch(forgotPassword({ email }));
      reset();
    } catch (error) {
      reset();
      setError("responseError", error);
    }
  };

  return (
    <Container maxWidth="xs">
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <AlertMsg />
          {!!errors.responseError && <Alert severity="error">{errors.responseError.message}</Alert>}
          <Typography color="primary" textAlign="center" variant="h5" fontFamily="sans-serif" fontWeight="bolder">
            Forgot Password
          </Typography>

          <FTextField name="email" label="Email address" />
          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Send Email
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Container>
  );
}

export default ForgetPassword;

