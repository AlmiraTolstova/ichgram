import "./App.css";
import Box from "@mui/material/Box";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import NotFoundPage from "./pages/notFoundPage";
import Login from "./pages/login";
import Register from "./pages/register";
import UserProfile from "./pages/profile";
import CreatePost from "./pages/createPost";
import EditProfile from "./pages/editProfile";

function App() {
  return (
    <Box>
      <Router>
        {/* <Header></Header> */}
        <Routes>
          <Route path="/" element={<Login></Login>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/profile" element={<UserProfile></UserProfile>}></Route>
          <Route path="/create" element={<CreatePost></CreatePost>}></Route>
          <Route path="/notfoundpage" element={<NotFoundPage />}></Route>
          <Route path="/editprofile" element={<EditProfile />}></Route>
        </Routes>
        {/* <Footer></Footer> */}
      </Router>
    </Box>
  );
}

export default App;
