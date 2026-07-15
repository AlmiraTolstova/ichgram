import { Modal, Box, Divider, CircularProgress } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import {
  closeExistPostModal,
  getPostByPostID,
  selectPosts,
} from "../../redux/slices/postsSlice";

import PostHeader from "./PostHeader";
import PostInfo from "./PostInfo";
import CommentForm from "./CommentForm";

import styles from "./styles.module.css";
import { useEffect } from "react";
import { Status } from "../../utils/Status";
import { BASE_URL } from "../../api/api";
import { useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { IconButton } from "@mui/material";
import PostActionsMenu from "../postActionsMenu/PostActionsMenu";
import { setOpenPostActionMenu } from "../../redux/slices/userProfileSlice";

const PostModal = () => {
  const dispatch = useDispatch();

  const { openModal, currentPost, status } = useSelector(selectPosts);
  const { user } = useSelector((state) => state.auth);

  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    if (openModal) {
      dispatch(getPostByPostID());
    }
  }, [dispatch, openModal]);

  if (!currentPost) return null;

  return (
    <Modal
      open={openModal}
      onClose={() => {
        dispatch(closeExistPostModal());
      }}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "auto",
      }}
    >
      <Box
        className={styles.modal}
        sx={{
          flexDirection: {
            xs: "column",
            md: "row",
          },
          width: {
            xs: "90vw",
            sm: "95vw",
            md: "1000px",
          },
          height: {
            xs: "100%",
            sm: "90vh",
            md: "722px",
          },
        }}
      >
        {/* IMAGE */}

        <Box
          className={styles.imageWrapper}
          sx={{
            width: {
              xs: "100%",
              md: "577px",
            },
            height: {
              xs: "40vh",
              md: "100%",
            },
          }}
        >
          <img
            src={`${BASE_URL}${currentPost.image}`}
            alt=""
            className={styles.image}
          />
        </Box>
        <PostActionsMenu
          isOwner={currentPost?.author?._id === user.id}
          currentPost={currentPost}
        />
        {/* RIGHT */}

        {status.currentPost === Status.LOADING ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : (
          <Box className={styles.sidebar}>
            {currentPost?.author?._id === user.id ? (
              <Box
                // sx={{
                //   display: "flex",
                //   justifyContent: "flex-end",
                //   p: 1,
                // }}
                sx={{
                  width: {
                    xs: "100%",
                    md: 400,
                  },
                  flex: {
                    xs: 1,
                    md: "none",
                  },
                  overflowY: "auto",
                }}
              >
                <IconButton onClick={() => dispatch(setOpenPostActionMenu())}>
                  <MoreHorizIcon />
                </IconButton>
              </Box>
            ) : (
              <Box />
            )}
            <PostHeader />

            <Divider />

            <PostInfo />

            <Divider />

            <CommentForm />
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default PostModal;
