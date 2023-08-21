import React, { useState } from "react";
import { Stack, Alert, IconButton, InputAdornment, Container, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate, useLocation } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import { FormProvider, FTextField } from "../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import AlertMsg from "../components/AlertMsg";

const RegisterSchema = Yup.object().shape({
  password: Yup.string().required("Password is required"),
  passwordConfirmation: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

const defaultValues = {
  password: "",
  passwordConfirmation: "",
};

function ResetPassword() {
  const navigate = useNavigate();

  const auth = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const resetToken = searchParams.get("resetToken");

  const onSubmit = async (data) => {
    const { password } = data;
    try {
      await auth.resetPassword({ password, resetToken }, () => {
        navigate("/", { replace: true });
      });
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
            Reset password
          </Typography>
          <FTextField
            name="password"
            label="New Password"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FTextField
            name="passwordConfirmation"
            label="New Password Confirmation"
            type={showPasswordConfirmation ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)} edge="end">
                    {showPasswordConfirmation ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Save
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Container>
  );
}

export default ResetPassword;

