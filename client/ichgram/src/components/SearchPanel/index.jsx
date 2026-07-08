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
import CancelIcon from "@mui/icons-material/Cancel";
import { useDispatch, useSelector } from "react-redux";
import {
  clearQuery,
  closeSearch,
  selectSearch,
} from "../../redux/slices/searchSlice";
import { useState } from "react";
import { useEffect } from "react";
import { searchUsers } from "../../redux/slices/searchSlice";
import { clearSearch } from "../../redux/slices/searchSlice";
import { setTargetUserID } from "../../redux/slices/otherProfileSlice";
import { useNavigate } from "react-router-dom";

// const recentUsers = [
//   {
//     id: 1,
//     username: "sashaa",
//     fullname: "Sasha Ivanova",
//     avatar: "/logo.png",
//   },
// ];

export default function SearchPanel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isOpen, users } = useSelector(selectSearch);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query.trim().length < 2) {
      dispatch(clearSearch());
      return;
    }

    const timer = setTimeout(() => {
      dispatch(searchUsers(query));
    }, 300);

    return () => clearTimeout(timer);
  }, [query, dispatch]);

  //   useEffect(() => {
  //     const timer = setTimeout(() => {
  //       if (query.trim()) {
  //         dispatch(searchUsers(query));
  //       }
  //     }, 400);

  //     return () => clearTimeout(timer);
  //   }, [query]);

  //   useEffect(() => {
  //     if (!query.trim()) {
  //       dispatch(clearSearch());
  //       return;
  //     }

  //     const timer = setTimeout(() => {
  //       dispatch(searchUsers(query));
  //     }, 400);

  //     return () => clearTimeout(timer);
  //   }, [query]);

  //   useEffect(() => {
  //     if (query.trim().length < 2) {
  //       dispatch(clearSearch());
  //       return;
  //     }

  //     const timer = setTimeout(() => {
  //       dispatch(searchUsers(query));
  //     }, 300);

  //     return () => clearTimeout(timer);
  //   }, [query]);

  return (
    <>
      {/* затемнение */}
      {isOpen && (
        <Box
          onClick={() => dispatch(closeSearch())}
          sx={{
            position: "fixed",
            inset: 0,
            //bgcolor: "rgba(0,0,0,.35)",
            zIndex: 1,
          }}
        />
      )}

      {/* панель */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: "245px", // ширина Sidebar
          width: "24.8125rem",
          height: "100vh",
          bgcolor: "#fff",
          borderTopRightRadius: "1rem",
          borderBottomRightRadius: "1rem",
          boxShadow: "1 1 20px rgba(0,0,0,.15)",
          transform: isOpen ? "translateX(0)" : "translateX(-200%)",
          transition: "transform .10s ease",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          // border: "2px solid red",
          padding: "1.5rem 1rem 0rem 1rem",
        }}
      >
        <Box p={4}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              fontSize: "24px",
              lineHeight: "30px",
              color: "#000000",
              mb: "39px",
              ml: 1,
            }}
          >
            Search
          </Typography>

          <TextField
            fullWidth
            placeholder="Search"
            // variant="outlined"
            size="small"
            value={query}
            variant="filled"
            hiddenLabel
            sx={{
              "& .MuiFilledInput-root": {
                backgroundColor: "#EFEFEF",
                borderRadius: "8px",

                "&:before": {
                  borderBottom: "none",
                },
                "&:after": {
                  borderBottom: "none",
                },
                "&:hover:not(.Mui-disabled):before": {
                  borderBottom: "none",
                },
              },
            }}
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
                    <IconButton size="small" onClick={() => setQuery("")}>
                      <CancelIcon fontSize="small" />
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

              fontWeight: 600,
              fontSize: "16px",
              lineHeight: "20px",
            }}
          >
            Recent
          </Typography>

          {users?.map((user) => (
            <Box
              onClick={() => {
                dispatch(setTargetUserID(user._id));
                navigate("/otherprofile");
              }}
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
