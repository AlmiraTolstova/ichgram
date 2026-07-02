import { Box, TextField, Button, IconButton } from "@mui/material";

import SentimentSatisfiedAltOutlinedIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";

const CommentForm = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        p: 2,
      }}
    >
      <IconButton>
        <SentimentSatisfiedAltOutlinedIcon />
      </IconButton>

      <TextField
        placeholder="Add comment..."
        variant="standard"
        fullWidth
        InputProps={{
          disableUnderline: true,
        }}
      />

      <Button>Post</Button>
    </Box>
  );
};

export default CommentForm;
