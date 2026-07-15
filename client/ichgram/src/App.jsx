import "./App.css";
import Box from "@mui/material/Box";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import NotFoundPage from "./pages/notFoundPage";
import Login from "./pages/login";
import Register from "./pages/register";
import UserProfile from "./pages/profile";
import CreatePost from "./pages/createPost";
import EditProfile from "./pages/editProfile";
import MainLayout from "./components/layouts/MainLayout";
import Home from "./pages/home";
import Explore from "./pages/explore";
import OtherProfile from "./pages/otherProfile";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { socket } from "./socket/socket";

function App() {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (!token) return;
    console.log(user);
    socket.connect();
    socket.emit("join", user.id);

    return () => socket.disconnect();
  }, [token, user]);

  return (
    <Box>
      <Router>
        <Routes>
          {/* страницы без Layout */}
          <Route path="/" element={<Login></Login>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>

          {/* страницы с Layout */}
          <Route element={<MainLayout />}>
            <Route path="/home" element={<Home></Home>}></Route>
            <Route path="/explore" element={<Explore></Explore>}></Route>
            <Route
              path="/profile"
              element={<UserProfile></UserProfile>}
            ></Route>
            <Route
              path="/otherprofile"
              element={<OtherProfile></OtherProfile>}
            ></Route>
            <Route path="/create" element={<CreatePost></CreatePost>}></Route>
            <Route path="/notfoundpage" element={<NotFoundPage />}></Route>
            <Route path="/editprofile" element={<EditProfile />}></Route>
          </Route>
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
