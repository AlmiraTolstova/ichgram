import {
  Avatar,
  Box,
  Paper,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  editUserData,
  selectAuth,
  uploadAvatar,
} from "../../redux/slices/authSlice";
import { BASE_URL } from "../../api/api";
import { useNavigate } from "react-router-dom";
import AppButton from "../../components/appButton";

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
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            p: {
              xs: "1rem 1rem 1rem 1rem", // мобильные устройства
              sm: "3rem 3rem 0.75rem 4rem", // планшеты
              md: "3rem 10.4375rem 7.3125rem 10.375rem",
            },
            gap: "2rem",
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
              p: "1rem",
              bgcolor: "#EFEFEF",
              borderRadius: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: {
                xs: "flex-start",
                md: "center",
              },
              flexDirection: {
                xs: "column",
                md: "row",
              },
              gap: 2,
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
            <AppButton size="medium" onClick={handleChoosePhoto}>
              New photo
            </AppButton>
          </Paper>

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              <Box>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "16px",
                    lineHeight: "20px",
                    color: "#000000",
                  }}
                >
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
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "16px",
                    lineHeight: "20px",
                    color: "#000000",
                  }}
                >
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
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: "16px",
                    lineHeight: "20px",
                    color: "#000000",
                  }}
                >
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

              <AppButton
                sx={{
                  alignSelf: "flex-start",
                }}
                type="submit"
                appearance="primary"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Saving..." : "Save"}
              </AppButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default EditProfile;
