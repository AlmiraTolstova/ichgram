import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { TextField, Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import Logo from "../../assets/ICHGRAM.png";
import { login, resetState } from "../../redux/slices/authSlice";
import { Status } from "../../utils/Status";
import BtnLogin from "../../components/btnLogin";
import BtnOr from "../../components/btnOr";
import Img from "../../assets/404.png";
import AppButton from "../../components/appButton";

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
    <Box
      sx={{
        marginTop: "5.375rem",
        display: "flex",
        justifyContent: "center",
        gap: "2rem",
      }}
    >
      {/* IMG */}
      <Box
        component="img"
        src={Img}
        alt="login-image"
        sx={{
          width: "23.75rem",
          height: "auto",
        }}
      ></Box>

      {/* FORM */}
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          width: "21.875rem",
          // mx: "auto",
          // mt: 1,
          // display: "flex",
          // flexDirection: "column",
          // gap: 2,
        }}
      >
        <Box
          sx={{
            border: "1px solid #DBDBDB",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
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

          <TextField
            label="Username, or email"
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

          {/* <BtnLogin variantType="text">Forgot password?</BtnLogin> */}
          <AppButton appearance="text">Forgot password?</AppButton>
        </Box>
        <Box
          sx={{
            marginTop: "0.625rem",
            border: "1px solid  #DBDBDB",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.4375rem 1.375rem",
          }}
        >
          <Typography>Don't have an account? </Typography>

          {/* <BtnLogin
            component={Link}
            to="/register"
            variantType="underline"
            sx={{ minWidth: "4.25rem" }}
          >
            Sign up
          </BtnLogin> */}
          <AppButton
            component={Link}
            to="/register"
            appearance="underline"
            sx={{ minWidth: "4.25rem" }}
          >
            Sign up
          </AppButton>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
