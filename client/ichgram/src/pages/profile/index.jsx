import { Box, Typography, Paper, Avatar } from "@mui/material";
import { useSelector } from "react-redux";

function UserProfile() {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return (
      <Typography textAlign="center" mt={4}>
        No user data
      </Typography>
    );
  }

  return (
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
  );
}

export default UserProfile;
