import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import { BASE_URL } from "../../api/api";
import { useDispatch } from "react-redux";
import { openExistPostModal, toggleLike } from "../../redux/slices/postsSlice";

export default function FeedCard({ post }) {
  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        // maxWidth: 470,
        // mx: "auto",
        // mb: 4,
        // borderRadius: 2,
        width: "100%",
        mb: 4,
        borderRadius: 2,
        // border: "2px solid green",
        borderBottom: "1px solid #DBDBDB",
      }}
    >
      {/* Header */}

      <CardHeader
        avatar={
          <Avatar
            src={
              post.author?.avatar
                ? `${BASE_URL}${post.author.avatar}`
                : undefined
            }
          />
        }
        action={
          <IconButton>
            <MoreHorizIcon />
          </IconButton>
        }
        title={
          <Typography fontWeight={700}>{post.author?.username}</Typography>
        }
        subheader={new Date(post.createdAt).toLocaleDateString()}
      />

      {/* Image */}

      <CardMedia
        onClick={() => dispatch(openExistPostModal(post))}
        component="img"
        image={`${BASE_URL}${post.image}`}
        alt={post.description}
        sx={{
          aspectRatio: "1 / 1",
          objectFit: "cover",
        }}
      />

      {/* Action buttons */}

      <CardActions>
        <IconButton
          onClick={() => {
            dispatch(toggleLike(post._id));
          }}
        >
          {post.isLiked ? (
            <FavoriteIcon sx={{ color: "red" }} />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>

        <IconButton onClick={() => dispatch(openExistPostModal(post))}>
          <ChatBubbleOutlineOutlinedIcon />
        </IconButton>
      </CardActions>

      {/* Content */}

      <CardContent sx={{ pt: 0 }}>
        <Typography fontWeight={700} mb={1}>
          {post.likesCount} likes
        </Typography>

        <Typography variant="body2">
          <Typography component="span" fontWeight={700}>
            {post.author?.username}
          </Typography>{" "}
          {post.description}
        </Typography>

        {/* Последние комментарии */}

        {post.comments?.length > 0 && (
          <Stack spacing={0.5} mt={1}>
            {post.comments.map((comment) => (
              <Typography key={comment._id} variant="body2">
                <Typography component="span" fontWeight={700}>
                  {comment.author.username}
                </Typography>{" "}
                {comment.text}
              </Typography>
            ))}
          </Stack>
        )}

        {/* Ссылка "Посмотреть все комментарии" */}

        {post.commentsCount > 0 && (
          <Link
            component="button"
            underline="hover"
            color="text.secondary"
            sx={{ mt: 1 }}
            onClick={() => dispatch(openExistPostModal(post))}
          >
            View all comments ({post.commentsCount})
          </Link>
        )}

        <Typography
          variant="caption"
          color="text.secondary"
          display="block"
          mt={1}
        >
          {new Date(post.createdAt).toLocaleDateString()}
        </Typography>
      </CardContent>
    </Box>
  );
}
