import { Avatar, Box, Typography, Button } from "@mui/material";

import { useSelector } from "react-redux";

import { selectPosts } from "../../redux/slices/postsSlice";

const PostHeader = () => {
  const { currentPost } = useSelector(selectPosts);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        p: 2,
      }}
    >
      {/* <Avatar src={currentPost.author.avatar} /> */}
      <Avatar />
      <Typography ml={2} fontWeight={600}>
        {currentPost.author.username}
      </Typography>

      <Typography mx={1}>•</Typography>

      <Button size="small">Follow</Button>
    </Box>
  );
};

export default PostHeader;
