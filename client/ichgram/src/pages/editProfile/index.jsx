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
import { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  editUserData,
  selectAuth,
  uploadAvatar,
} from "../../redux/slices/authSlice";
import BtnLogin from "../../components/btnLogin";
import { BASE_URL } from "../../api/api";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      navigate("/profile");
    } catch (err) {
      console.error(err);
    }
  };

  const inputRef = useRef(null);

  const handleChoosePhoto = () => {
    inputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      await dispatch(uploadAvatar(file)).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box>
      <Box sx={{ display: "flex", border: "2px solid green" }}>
        {/* <Sidebar /> */}

        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            p: "48px 167px 117px 166px",
            gap: "33px",
            border: "2px solid red",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              fontSize: "20px",
              lineHeight: "25px",
              color: "#000000",
              marginBottom: 1,
            }}
          >
            Edit profile
          </Typography>

          <Paper
            sx={{
              p: "16px 16px 8px 16px",
              bgcolor: "#EFEFEF",
              borderRadius: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              border: "2px solid red",
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Avatar
                src={`${BASE_URL}${user.avatar}`}
                sx={{
                  width: "56px",
                  height: "56px",
                }}
              />

              <Box
                sx={{
                  marginLeft: "1rem",
                  flexDirection: "column",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "16px",
                    lineHeight: "20px",
                    color: "#000000",
                  }}
                >
                  {user?.username}
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{
                    mt: "0.5rem",
                    maxWidth: "465px",
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "18px",
                    color: "#737373",
                  }}
                >
                  {user?.about}
                </Typography>
              </Box>
            </Box>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleFileChange}
            />

            <BtnLogin sx={{ width: "200px" }} onClick={handleChoosePhoto}>
              New photo
            </BtnLogin>
            {/* <Button variant="contained">New photo</Button> */}
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

      {/* <Footer /> */}
    </Box>
  );
}

export default EditProfile;
