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

function App() {
  return (
    <Box>
      <Router>
        {/* <Header></Header> */}
        <Routes>
          {/* страницы без Layout */}
          <Route path="/" element={<Login></Login>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>

          {/* страницы с Layout */}
          <Route element={<MainLayout />}>
            <Route
              path="/profile"
              element={<UserProfile></UserProfile>}
            ></Route>
            <Route path="/create" element={<CreatePost></CreatePost>}></Route>
            <Route path="/notfoundpage" element={<NotFoundPage />}></Route>
            <Route path="/editprofile" element={<EditProfile />}></Route>
          </Route>
        </Routes>
        {/* <Footer></Footer> */}
      </Router>
    </Box>
  );
}

export default App;
