import { Box, TextField, Button, IconButton } from "@mui/material";

import SentimentSatisfiedAltOutlinedIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import AppButton from "../appButton";

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
      <AppButton appearance="bluelink" size="small">
        Send
      </AppButton>
    </Box>
  );
};

export default CommentForm;
