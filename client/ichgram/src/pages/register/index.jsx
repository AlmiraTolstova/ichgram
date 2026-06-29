import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, TextField, Typography, Link } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  register as registerUser,
  resetState,
} from "../../redux/slices/authSlice";
import { Status } from "../../utils/Status";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, isErrorRegister, isSuccessRegister, message } = useSelector(
    (state) => state.auth,
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      fullname: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  useEffect(() => {
    if (isSuccessRegister) {
      navigate("/");
    }

    return () => {
      dispatch(resetState());
    };
  }, [isSuccessRegister, navigate, dispatch]);

  const onSubmit = (data) => {
    dispatch(
      registerUser({
        fullname: data.fullname,
        username: data.username,
        email: data.email,
        password: data.password,
      }),
    );
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 4,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        Register
      </Typography>

      <TextField
        label="Email"
        type="email"
        fullWidth
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: "Invalid email format",
          },
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <TextField
        label="Full Name"
        fullWidth
        {...register("fullname", {
          required: "Full name is required",
          minLength: {
            value: 2,
            message: "Full name must contain at least 2 characters",
          },
        })}
        error={!!errors.fullname}
        helperText={errors.fullname?.message}
      />

      <TextField
        label="User Name"
        fullWidth
        {...register("username", {
          required: "User name is required",
          minLength: {
            value: 2,
            message: "User name must contain at least 2 characters",
          },
        })}
        error={!!errors.username}
        helperText={errors.username?.message}
      />

      <TextField
        label="Password"
        type="password"
        fullWidth
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters",
          },
        })}
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      <TextField
        label="Confirm Password"
        type="password"
        fullWidth
        {...register("confirmPassword", {
          required: "Please confirm your password",
          validate: (value) => value === password || "Passwords do not match",
        })}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
      />

      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={status.register === Status.LOADING}
      >
        {status.register === Status.LOADING ? "Loading..." : "Register"}
      </Button>

      {isErrorRegister && <Typography color="error">{message}</Typography>}

      {isSuccessRegister && (
        <Typography color="success.main">Registration successful</Typography>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 0.5,
        }}
      >
        <Typography>Already have an account?</Typography>

        <Link component={RouterLink} to="/">
          Sign in
        </Link>
      </Box>
    </Box>
  );
}

export default Register;
