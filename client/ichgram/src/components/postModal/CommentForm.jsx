import { Box, TextField, Button, IconButton } from "@mui/material";

import SentimentSatisfiedAltOutlinedIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import AppButton from "../appButton";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, selectPosts } from "../../redux/slices/postsSlice";
import { Status } from "../../utils/Status";

const CommentForm = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const { currentPost, status } = useSelector(selectPosts);
  const handleSend = async () => {
    if (!text.trim()) return;

    await dispatch(
      addComment({
        postId: currentPost._id,
        text,
      }),
    );

    setText("");
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        p: 2,
        border: "1px solid violet",
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
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <AppButton
        appearance="bluelink"
        size="small"
        onClick={handleSend}
        disabled={!text.trim() || status.addComment === Status.LOADING}
      >
        Send
      </AppButton>
    </Box>
  );
};

export default CommentForm;
