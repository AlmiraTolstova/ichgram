import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Stack,
} from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { BASE_URL } from "../../api/api";
import { useDispatch } from "react-redux";
import { openExistPostModal } from "../../redux/slices/postsSlice";

export default function PostCard({ post }) {
  const dispatch = useDispatch();
  return (
    <Card
      sx={{
        maxWidth: 500,
        mx: "auto",
        mb: 3,
      }}
    >
      <CardMedia
        component="img"
        height="450"
        image={`${BASE_URL}${post.image}`}
        alt="Post"
        sx={{
          objectFit: "cover",
        }}
      />

      <CardContent>
        <Typography variant="body1" sx={{ mb: 1 }}>
          {post.description}
        </Typography>

        <Typography variant="caption" color="text.secondary">
          {new Date(post.createdAt).toLocaleDateString()}
        </Typography>
      </CardContent>

      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Stack direction="row">
          <IconButton>
            <FavoriteBorderIcon />
          </IconButton>

          <Typography variant="body2" sx={{ alignSelf: "center", mr: 2 }}>
            {post.likes.length}
          </Typography>

          <IconButton
            onClick={() => {
              dispatch(openExistPostModal(post));
            }}
          >
            <ChatBubbleOutlineOutlinedIcon />
          </IconButton>

          <Typography variant="body2" sx={{ alignSelf: "center" }}>
            {post.comments.length}
          </Typography>
        </Stack>

        <Stack direction="row">
          <IconButton>
            <EditOutlinedIcon />
          </IconButton>

          <IconButton color="error">
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </Stack>
      </CardActions>
    </Card>
  );
}
