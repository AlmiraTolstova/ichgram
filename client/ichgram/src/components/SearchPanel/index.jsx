import {
  Box,
  Typography,
  TextField,
  IconButton,
  Avatar,
  InputAdornment,
  Divider,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

import { useDispatch, useSelector } from "react-redux";
import { closeSearch, selectSearch } from "../../redux/slices/searchSlice";
import { useState } from "react";
import { useEffect } from "react";
import { searchUsers } from "../../redux/slices/searchSlice";
import { clearSearch } from "../../redux/slices/searchSlice";

const recentUsers = [
  {
    id: 1,
    username: "sashaa",
    fullname: "Sasha Ivanova",
    avatar: "/logo.png",
  },
];

export default function SearchPanel() {
  const dispatch = useDispatch();
  const { isOpen, users } = useSelector(selectSearch);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        dispatch(searchUsers(query));
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (!query.trim()) {
      dispatch(clearSearch());
      return;
    }

    const timer = setTimeout(() => {
      dispatch(searchUsers(query));
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (query.trim().length < 2) {
      dispatch(clearSearch());
      return;
    }

    const timer = setTimeout(() => {
      dispatch(searchUsers(query));
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <>
      {/* затемнение */}
      {isOpen && (
        <Box
          onClick={() => dispatch(closeSearch())}
          sx={{
            position: "fixed",
            inset: 0,
            bgcolor: "rgba(0,0,0,.35)",
            zIndex: 1,
          }}
        />
      )}

      {/* панель */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: "250px", // ширина Sidebar
          width: 400,
          height: "100vh",

          bgcolor: "#fff",
          borderTopRightRadius: 24,
          borderBottomRightRadius: 24,

          boxShadow: "0 0 20px rgba(0,0,0,.15)",

          transform: isOpen ? "translateX(0)" : "translateX(-200%)",

          transition: "transform .3s ease",

          zIndex: 100,

          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box p={4}>
          <Typography variant="h4" fontWeight={700} mb={4}>
            Search
          </Typography>

          <TextField
            fullWidth
            placeholder="Search"
            variant="outlined"
            size="small"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton size="small">
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>

        <Divider />

        <Box
          sx={{
            p: 4,
            flex: 1,
            overflowY: "auto",
          }}
        >
          <Typography
            fontWeight={700}
            sx={{
              mb: 3,
            }}
          >
            Recent
          </Typography>

          {users?.map((user) => (
            <Box
              key={user._id}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                py: 1.5,
                cursor: "pointer",

                "&:hover": {
                  bgcolor: "#fafafa",
                },
              }}
            >
              <Avatar src={user.avatar} />

              <Box>
                <Typography fontWeight={600}>{user.username}</Typography>

                <Typography variant="body2" color="text.secondary">
                  {user.fullname}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
}
