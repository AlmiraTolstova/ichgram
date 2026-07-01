import {
  Box,
  Typography,
  Paper,
  Avatar,
  Button,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../components/sidebar";
import { useEffect } from "react";
import {
  getOwnPostsByUserID,
  selectUserProfile,
} from "../../redux/slices/userProfileSlice";
import { Status } from "../../utils/Status";
import PostCard from "../../components/postCard";

function UserProfile() {
  const user = useSelector((state) => state.auth.user);
  const userProfileSelector = useSelector(selectUserProfile);
  const posts = useSelector((state) => state.profile.ownPostsList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOwnPostsByUserID());
  }, [dispatch]);

  if (!user) {
    return (
      <Typography textAlign="center" mt={4}>
        No user data
      </Typography>
    );
  }

  return (
    <Box>
      <Sidebar></Sidebar>
      <Box>
        <Button
          onClick={() => {
            dispatch(getOwnPostsByUserID());
          }}
        >
          Обновить ленту
        </Button>
        <Button
          onClick={() => {
            console.log(userProfileSelector);
          }}
        >
          Reducer to console
        </Button>
      </Box>
      <Box>
        {status === Status.LOADING ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : (
          posts.map((post) => <PostCard key={post._id} post={post} />)
        )}
      </Box>
      <Paper
        elevation={3}
        sx={{
          maxWidth: 400,
          mx: "auto",
          mt: 5,
          p: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
        }}
      >
        <Avatar sx={{ width: 80, height: 80 }}>
          {user.fullname?.[0]?.toUpperCase()}
        </Avatar>

        <Typography variant="h6">{user.fullname}</Typography>

        <Box sx={{ width: "100%" }}>
          <Typography variant="body2" color="text.secondary">
            Username
          </Typography>
          <Typography>{user.username}</Typography>
        </Box>

        <Box sx={{ width: "100%" }}>
          <Typography variant="body2" color="text.secondary">
            Email
          </Typography>
          <Typography>{user.email}</Typography>
        </Box>

        <Box sx={{ width: "100%" }}>
          <Typography variant="body2" color="text.secondary">
            ID
          </Typography>
          <Typography fontSize={12} color="text.secondary">
            {user.id}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}

export default UserProfile;
