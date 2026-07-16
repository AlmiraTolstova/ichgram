import { Avatar, Box, Typography, IconButton } from "@mui/material";
import { BASE_URL } from "../../api/api";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { closeExistPostModal } from "../../redux/slices/postsSlice";
import { setTargetUserID } from "../../redux/slices/otherProfileSlice";

const CommentPost = ({ comment }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        fontWeight: 600,
        p: 1,
      }}
    >
      <Avatar
        sx={{ mr: 2 }}
        src={`${BASE_URL}${comment.author.avatar}`}
        onClick={() => {
          dispatch(closeExistPostModal());
          dispatch(setTargetUserID(comment.author._id));
          navigate("/otherprofile");
        }}
      />

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
