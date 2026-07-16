import { Avatar, Box, Typography } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import {
  closeExistPostModal,
  selectPosts,
} from "../../redux/slices/postsSlice";
import AppButton from "../appButton";
import { setTargetUserID } from "../../redux/slices/otherProfileSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../api/api";

const PostHeader = () => {
  const { currentPost } = useSelector(selectPosts);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        p: "8px",
      }}
    >
      <Avatar
        src={`${BASE_URL}${currentPost.author.avatar}`}
        onClick={() => {
          dispatch(closeExistPostModal());
          dispatch(setTargetUserID(currentPost.author._id));
          navigate("/otherprofile");
        }}
      />
      <Typography
        sx={{
          ml: "1rem",
          mr: 1,
          fontWeight: 600,
          fontSize: "12px",
          lineHeight: "15px",
          color: "#262626",
        }}
      >
        {currentPost.author.username}
      </Typography>

      <Typography mx={1}>•</Typography>
      <AppButton appearance="bluelink" size="small">
        Follow
      </AppButton>
    </Box>
  );
};

export default PostHeader;
