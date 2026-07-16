import {
  Avatar,
  Box,
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
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import { BASE_URL } from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { openExistPostModal, toggleLike } from "../../redux/slices/postsSlice";
import { CommentSvgOutline } from "../icons";
import AppButton from "../appButton";

import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";
import {
  followUser,
  setTargetUserID,
  unfollowUser,
} from "../../redux/slices/otherProfileSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function FeedCard({ post }) {
  const dispatch = useDispatch();
  const currentUserId = useSelector((state) => state.auth.user.id);
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        mb: 4,
        width: "100%",
        maxWidth: "29.375rem",
        mx: "auto", // центрирует карточку
        bgcolor: "#fff",
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
            onClick={() => {
              dispatch(setTargetUserID(post.author._id));
              navigate("/otherprofile");
            }}
          />
        }
        action={
          <Stack direction="row" spacing={1} alignItems="center">
            {post.isFollowing ? (
              <AppButton
                appearance="bluelink"
                size="small"
                onClick={() => {
                  dispatch(setTargetUserID(post.author._id));
                  dispatch(unfollowUser());
                }}
              >
                Following
              </AppButton>
            ) : (
              <AppButton
                appearance="bluelink"
                size="small"
                onClick={() => {
                  dispatch(setTargetUserID(post.author._id));
                  dispatch(followUser());
                }}
              >
                Follow
              </AppButton>
            )}
          </Stack>
        }
        title={
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "12.0585px",
                lineHeight: "16px",
                color: "#000000",
              }}
            >
              {post.author?.username}
            </Typography>

            <Typography color="text.secondary">•</Typography>

            <Typography
              sx={{
                fontWeight: 400,
                fontSize: "12.0585px",
                lineHeight: "16px",
                color: "#737373",
              }}
              variant="caption"
              color="text.secondary"
            >
              {formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: false,
                locale: enUS,
              })}
            </Typography>
            <Typography color="text.secondary">•</Typography>
          </Box>
        }
      />

      {/* Image */}

      <CardMedia
        onClick={() => dispatch(openExistPostModal(post))}
        component="img"
        image={`${BASE_URL}${post.image}`}
        alt={post.description}
        sx={{
          width: "100%",
          aspectRatio: "402 / 504",
          objectFit: "cover",
          display: "block",
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
          <CommentSvgOutline></CommentSvgOutline>
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
