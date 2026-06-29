import "./App.css";
import Box from "@mui/material/Box";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import NotFoundPage from "./pages/notFoundPage";
import Login from "./pages/login";
import Register from "./pages/register";
import UserProfile from "./pages/profile";

function App() {
  return (
    <Box>
      <Router>
        {/* <Header></Header> */}
        <Routes>
          <Route path="/" element={<Login></Login>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/profile" element={<UserProfile></UserProfile>}></Route>
          <Route path="/notfoundpage" element={<NotFoundPage />}></Route>
        </Routes>
        {/* <Footer></Footer> */}
      </Router>
    </Box>
  );
}

export default App;
