import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, TextField, Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import Logo from "../../assets/ICHGRAM.png";
import { login, resetState } from "../../redux/slices/authSlice";
import { Status } from "../../utils/Status";
import BtnLogin from "../../components/btnLogin";
import BtnOr from "../../components/btnOr";

import Sidebar from "../../components/sidebar";
import Footer from "../../components/footer";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, isErrorLogin, isSuccessLogin, message } = useSelector(
    (state) => state.auth,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isSuccessLogin) {
      navigate("/profile");
    }

    return () => {
      dispatch(resetState());
    };
  }, [isSuccessLogin, navigate, dispatch]);

  const onSubmit = (data) => {
    dispatch(login(data));
  };

  return (
    <Box>
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
        <Box
          component="img"
          src={Logo}
          alt="logo"
          sx={{
            width: "11.875rem",
          }}
        ></Box>

        <TextField
          label="Username or Email"
          fullWidth
          {...register("login", {
            required: "Username or email is required",
            validate: (value) => {
              const emailRegex = /^\S+@\S+\.\S+$/;
              const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;

              return (
                emailRegex.test(value) ||
                usernameRegex.test(value) ||
                "Enter a valid email or username"
              );
            },
          })}
          error={!!errors.login}
          helperText={errors.login?.message}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must contain at least 6 characters",
            },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <BtnLogin
          type="submit"
          variant="contained"
          disabled={status.login.isLoading === Status.LOADING}
        >
          {status.login.isLoading === Status.LOADING ? "Loading..." : "Login"}
        </BtnLogin>

        {isErrorLogin && <Typography color="error">{message}</Typography>}

        {isSuccessLogin && (
          <Typography color="success.main">Login successful</Typography>
        )}
        <BtnOr></BtnOr>

        <BtnLogin variantType="text">Forgot password?</BtnLogin>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Typography>Don't have an account, </Typography>

          <BtnLogin
            component={Link}
            to="/register"
            variantType="underline"
            sx={{ padding: "0px" }}
          >
            Sign up
          </BtnLogin>
        </Box>
      </Box>
      <Footer></Footer>
    </Box>
  );
}

export default Login;
