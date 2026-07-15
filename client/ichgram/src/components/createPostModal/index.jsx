import { useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Modal,
  Box,
  Typography,
  Avatar,
  TextField,
  IconButton,
} from "@mui/material";

import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import SentimentSatisfiedAltOutlinedIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";

import {
  createPost,
  closeCreatePostModal,
} from "../../redux/slices/userProfileSlice";
import { useTheme, useMediaQuery } from "@mui/material";

import AppButton from "../appButton";
import { BASE_URL } from "../../api/api";

const CreatePostModal = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const dispatch = useDispatch();

  const open = useSelector((state) => state.profile.openModal);
  const user = useSelector((state) => state.auth.user);

  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const preview = useMemo(
    () => (image ? URL.createObjectURL(image) : null),
    [image],
  );

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      createPost({
        description,
        image,
      }),
    );

    dispatch(closeCreatePostModal());

    setDescription("");
    setImage(null);
  };

  return (
    <Modal open={open} onClose={() => dispatch(closeCreatePostModal())}>
      <Box
        // sx={{
        //   width: 1100,
        //   height: 760,
        //   bgcolor: "background.paper",
        //   borderRadius: 3,
        //   position: "absolute",
        //   top: "50%",
        //   left: "50%",
        //   transform: "translate(-50%, -50%)",
        //   overflow: "hidden",
        //   boxShadow: 24,
        // }}
        sx={{
          width: {
            xs: "90%",
            sm: "95%",
            md: 900,
            lg: 1100,
          },
          height: {
            xs: "90dvh",
            sm: "90vh",
            md: 760,
          },
          bgcolor: "background.paper",
          borderRadius: {
            xs: 0,
            sm: 3,
          },
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          overflow: "hidden",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              height: 56,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 2,
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
          >
            <Box />

            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "16px",
                lineHeight: "24px",
                color: "#000000",
              }}
            >
              Create new post
            </Typography>

            <AppButton
              type="submit"
              appearance="bluelink"
              size={isMobile ? "small" : "large"}
              sx={{ textTransform: "uppercase" }}
            >
              Share
            </AppButton>
          </Box>

          {/* Content */}
          <Box
            // sx={{
            //   flex: 1,
            //   display: "flex",
            // }}
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: {
                xs: "column",
                md: "row",
              },
            }}
          >
            {/* Image section */}
            <Box
              // sx={{
              //   flex: 1,
              //   display: "flex",
              //   flexDirection: "column",
              //   justifyContent: "center",
              //   alignItems: "center",
              //   gap: 3,
              //   borderRight: "1px solid",
              //   borderColor: "divider",
              // }}
              sx={{
                flex: 1,
                minHeight: {
                  xs: 300,
                  md: "auto",
                },
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 3,
                borderRight: {
                  xs: "none",
                  md: "1px solid",
                },
                borderBottom: {
                  xs: "1px solid",
                  md: "none",
                },
                borderColor: "divider",
              }}
            >
              {image ? (
                <Box
                  component="img"
                  src={preview}
                  alt="Preview"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              ) : (
                <>
                  <CloudUploadOutlinedIcon
                    sx={{
                      fontSize: 90,
                      color: "text.disabled",
                    }}
                  />

                  <AppButton component="label">
                    Select from computer
                    <input
                      hidden
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImage(e.target.files?.[0] ?? null)}
                    />
                  </AppButton>
                </>
              )}
            </Box>

            {/* Sidebar */}
            <Box
              // sx={{
              //   width: 420,
              //   display: "flex",
              //   flexDirection: "column",
              // }}
              sx={{
                width: {
                  xs: "100%",
                  md: 420,
                },
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* User */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  p: 2,
                }}
              >
                <Avatar src={`${BASE_URL}${user.avatar}`} />

                <Typography fontWeight={600}>{user.username}</Typography>
              </Box>

              {/* Caption */}
              <Box sx={{ flex: 1, px: 2 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={10}
                  variant="standard"
                  placeholder="Write a caption..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  InputProps={{
                    disableUnderline: true,
                  }}
                />
              </Box>

              {/* Bottom */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  px: 2,
                  py: 1,
                  borderTop: "1px solid",
                  borderColor: "divider",
                }}
              >
                <IconButton>
                  <SentimentSatisfiedAltOutlinedIcon />
                </IconButton>

                <Typography variant="caption" color="text.secondary">
                  {description.length}/2200
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreatePostModal;
