import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Box, TextField, Typography } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../../assets/ICHGRAM.png";

import {
  register as registerUser,
  resetState,
} from "../../redux/slices/authSlice";
import { Status } from "../../utils/Status";
import AppButton from "../../components/appButton";

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
      sx={{
        marginTop: "5.375rem",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          border: "1px solid #DBDBDB",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "1.875rem 2.5rem 1.4375rem",
        }}
      >
        <Box
          component="img"
          src={Logo}
          alt="logo"
          sx={{
            width: "11.875rem",
          }}
        ></Box>
        <Typography
          variant="h6"
          sx={{
            maxWidth: "15.94rem",
            fontWeight: 600,
            fontSize: "16px",
            lineHeight: "20px",
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            color: "#737373",
            marginBottom: "2.25rem",
          }}
        >
          Sign up to see photos and videos from your friends.
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            minWidth: "16.75rem",
          }}
        >
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
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />

          <AppButton
            type="submit"
            appearance="primary"
            disabled={status.register === Status.LOADING}
          >
            {status.register === Status.LOADING ? "Loading..." : "Sign up"}
          </AppButton>

          {isErrorRegister && <Typography color="error">{message}</Typography>}

          {isSuccessRegister && (
            <Typography color="success.main">
              Registration successful
            </Typography>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          width: "21.875rem",
          marginTop: "1rem",
          border: "1px solid  #DBDBDB",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.625rem 3.48rem 1.625rem",
          gap: "0.5rem",
        }}
      >
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "18px",
            color: "#000000",
          }}
        >
          Have an account?
        </Typography>

        <AppButton
          component={RouterLink}
          to="/"
          appearance="bluelink"
          sx={{ minWidth: "4.25rem" }}
        >
          Log in
        </AppButton>
      </Box>
    </Box>
  );
}

export default Register;
