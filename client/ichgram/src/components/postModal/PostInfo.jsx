import { Avatar, Box, Typography, IconButton } from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../api/api";

import {
  getPostByPostID,
  selectPosts,
  toggleLike,
} from "../../redux/slices/postsSlice";
import FavoriteIcon from "@mui/icons-material/Favorite";

const PostInfo = () => {
  const { currentPost } = useSelector(selectPosts);
  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        border: "1px solid green",
      }}
    >
      <Box
        sx={{
          border: "1px solid blue",
          display: "flex",
          p: "8px",
        }}
      >
        <Avatar
          sx={{ mr: "12px" }}
          src={`${BASE_URL}${currentPost.author.avatar}`}
        />

        <Box ml={2}>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "14px",
              lineHeight: "15px",
              color: "#262626",
            }}
            fontWeight={600}
          >
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

      <Box sx={{ p: "12px", border: "1px solid green" }}>
        <IconButton
          onClick={() => {
            dispatch(toggleLike(currentPost._id));
          }}
        >
          {currentPost.isLiked ? (
            <FavoriteIcon sx={{ color: "red" }} />
          ) : (
            <FavoriteBorderIcon />
          )}
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
