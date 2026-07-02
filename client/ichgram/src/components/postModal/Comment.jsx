import { Avatar, Box, Typography, IconButton } from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const Comment = ({ comment }) => {
  return (
    <Box
      sx={{
        display: "flex",
        p: 2,
      }}
    >
      <Avatar src={comment.author.avatar} />

      <Box ml={2}>
        <Typography fontWeight={600}>{comment.author.username}</Typography>

        <Typography>{comment.text}</Typography>
      </Box>

      <IconButton sx={{ ml: "auto" }}>
        <FavoriteBorderIcon />
      </IconButton>
    </Box>
  );
};

export default Comment;
