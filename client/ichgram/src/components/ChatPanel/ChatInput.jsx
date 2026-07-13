import { Box, TextField } from "@mui/material";

const ChatInput = () => {
  return (
    <Box
      sx={{
        p: 3,
        borderTop: "1px solid #DBDBDB",
      }}
    >
      <TextField
        fullWidth
        placeholder="Write message"
        variant="outlined"
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "999px",
          },
        }}
      />
    </Box>
  );
};

export default ChatInput;
