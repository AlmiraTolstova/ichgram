import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Modal,
  Box,
  Typography,
  Avatar,
  TextField,
  IconButton,
  Button,
} from "@mui/material";

import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import SentimentSatisfiedAltOutlinedIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";

import {
  createPost,
  closeCreatePostModal,
} from "../../redux/slices/userProfileSlice";

import styles from "./styles.module.css";

const CreatePostModal = () => {
  const dispatch = useDispatch();

  const open = useSelector((state) => state.profile.openModal);
  const user = useSelector((state) => state.auth.user);

  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

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
      <Box className={styles.modal}>
        <form className={styles.form} onSubmit={handleSubmit}>
          {/* Header */}

          <div className={styles.header}>
            <div />

            <Typography variant="h6" fontWeight={700}>
              Create new post
            </Typography>

            <Button type="submit" variant="text">
              Share
            </Button>
          </div>

          {/* Content */}

          <div className={styles.content}>
            {/* Левая часть */}

            <div className={styles.imageSection}>
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt=""
                  className={styles.preview}
                />
              ) : (
                <>
                  <CloudUploadOutlinedIcon sx={{ fontSize: 90 }} />

                  <Button component="label" variant="contained">
                    Select from computer
                    <input
                      hidden
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </Button>
                </>
              )}
            </div>

            {/* Правая часть */}

            <div className={styles.sidebar}>
              <div className={styles.user}>
                <Avatar />

                <Typography fontWeight={600}>{user.username}</Typography>
              </div>

              <TextField
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

              <div className={styles.bottom}>
                <IconButton>
                  <SentimentSatisfiedAltOutlinedIcon />
                </IconButton>

                <Typography variant="caption" color="text.secondary">
                  {description.length}/2200
                </Typography>
              </div>
            </div>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default CreatePostModal;
