import { Avatar, Box, Typography, Button } from "@mui/material";

import { useSelector } from "react-redux";

import { selectPosts } from "../../redux/slices/postsSlice";
import AppButton from "../appButton";

const PostHeader = () => {
  const { currentPost } = useSelector(selectPosts);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        p: "8px",
      }}
    >
      {/* <Avatar src={currentPost.author.avatar} /> */}
      <Avatar />
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
