import { Avatar, Box, Typography, IconButton } from "@mui/material";
import { BASE_URL } from "../../api/api";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const CommentPost = ({ comment }) => {
  return (
    <Box
      sx={{
        display: "flex",
        // p: 2,
        border: "1px solid yellow",
        fontWeight: 600,
        p: 1,
      }}
    >
      <Avatar sx={{ mr: 2 }} src={`${BASE_URL}${comment.author.avatar}`} />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: "13px",
            lineHeight: "15px",
            color: "#262626",
          }}
        >
          {comment.author.username}
        </Typography>

        <Typography
          sx={{
            fontWeight: 400,
            fontSize: "13px",
            lineHeight: "15px",
            color: "#00376B",
          }}
        >
          {comment.text}
        </Typography>
      </Box>

      <IconButton sx={{ ml: "auto" }}>
        <FavoriteBorderIcon />
      </IconButton>
    </Box>
  );
};

export default CommentPost;
