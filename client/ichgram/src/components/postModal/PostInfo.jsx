import { Avatar, Box, Typography, IconButton } from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../api/api";

import { selectPosts } from "../../redux/slices/postsSlice";

const PostInfo = () => {
  const { currentPost } = useSelector(selectPosts);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          p: 2,
        }}
      >
        <Avatar src={`${BASE_URL}${currentPost.author.avatar}`} />

        <Box ml={2}>
          <Typography fontWeight={600}>
            {currentPost.author.username}
          </Typography>

          <Typography>{currentPost.description}</Typography>
        </Box>
      </Box>

      <Box sx={{ flex: 1 }}>
        {currentPost.comments.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))}
      </Box>

      <Box p={2}>
        <IconButton>
          <FavoriteBorderIcon />
        </IconButton>

        <IconButton>
          <ChatBubbleOutlineOutlinedIcon />
        </IconButton>

        <Typography fontWeight={600}>
          {currentPost.likes.length} likes
        </Typography>

        <Typography variant="caption" color="text.secondary">
          {currentPost.createdAt}
        </Typography>
      </Box>
    </Box>
  );
};

export default PostInfo;
