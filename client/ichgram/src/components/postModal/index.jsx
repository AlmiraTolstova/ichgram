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

import styles from "./PostModal.module.css";
import { useEffect } from "react";
import { Status } from "../../utils/Status";

const PostModal = () => {
  const dispatch = useDispatch();

  const { openModal, currentPost, status } = useSelector(selectPosts);

  useEffect(() => {
    if (openModal) {
      dispatch(getPostByPostID());
    }
  }, [dispatch, openModal]);

  if (!currentPost) return null;

  return (
    <Modal open={openModal} onClose={() => dispatch(closeExistPostModal())}>
      <Box className={styles.modal}>
        {/* IMAGE */}

        <Box className={styles.imageWrapper}>
          <img src={currentPost.imageUrl} alt="" className={styles.image} />
        </Box>

        {/* RIGHT */}

        {status.currentPost === Status.LOADING ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : (
          <Box className={styles.sidebar}>
            {/* <PostHeader />

            <Divider />

            <PostInfo />

            <Divider />

            <CommentForm /> */}
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default PostModal;
