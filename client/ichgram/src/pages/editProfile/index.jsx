import {
  Avatar,
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";

import Sidebar from "../../components/sidebar";
import Footer from "../../components/footer";

import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";
import { editUserData, selectAuth } from "../../redux/slices/authSlice";

function EditProfile() {
  const dispatch = useDispatch();

  const { user, status } = useSelector(selectAuth);

  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      username: "",
      link: "",
      about: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        username: user.username ?? "",
        link: user.link ?? "",
        about: user.about ?? "",
      });
    }
  }, [user, reset]);

  const about = watch("about");

  const onSubmit = async (data) => {
    try {
      await dispatch(editUserData(data)).unwrap();
      console.log("Profile updated");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box>
      <Box display="flex">
        <Sidebar />

        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            p: "94px 106px 185px 118px",
            gap: "2.75rem",
          }}
        >
          <Typography variant="h4" fontWeight={700}>
            Edit profile
          </Typography>

          <Paper
            elevation={0}
            sx={{
              p: 3,
              bgcolor: "#f5f5f5",
              borderRadius: 4,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box direction="row" spacing={2} alignItems="center">
              <Avatar
                src="/logo.png"
                sx={{
                  width: 70,
                  height: 70,
                }}
              />

              <Box>
                <Typography fontWeight={700} fontSize={30}>
                  {user?.username}
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{
                    mt: 1,
                  }}
                >
                  {user?.about}
                </Typography>
              </Box>
            </Box>

            <Button variant="contained">New photo</Button>
          </Paper>

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Box spacing={4}>
              <Box>
                <Typography fontWeight={700} mb={1}>
                  Username
                </Typography>

                <Controller
                  name="username"
                  control={control}
                  rules={{
                    required: "Username is required",
                  }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      fullWidth
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </Box>

              <Box>
                <Typography fontWeight={700} mb={1}>
                  Website
                </Typography>

                <Controller
                  name="link"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <LinkIcon fontSize="small" />
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  )}
                />
              </Box>

              <Box>
                <Typography fontWeight={700} mb={1}>
                  About
                </Typography>

                <Controller
                  name="about"
                  control={control}
                  rules={{
                    maxLength: {
                      value: 150,
                      message: "Maximum 150 characters",
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      fullWidth
                      multiline
                      rows={4}
                      error={!!fieldState.error}
                      helperText={
                        fieldState.error?.message ??
                        `${about?.length ?? 0} / 150`
                      }
                      slotProps={{
                        formHelperText: {
                          sx: {
                            textAlign: "right",
                            m: 1,
                          },
                        },
                      }}
                    />
                  )}
                />
              </Box>

              <Button
                type="submit"
                variant="contained"
                disabled={status === "loading"}
                sx={{
                  width: 330,
                  height: 48,
                  textTransform: "none",
                  fontWeight: 700,
                }}
              >
                {status === "loading" ? "Saving..." : "Save"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}

export default EditProfile;
