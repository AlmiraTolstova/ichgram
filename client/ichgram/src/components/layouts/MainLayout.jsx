import { Box } from "@mui/material";
import { Outlet } from "react-router";
import Sidebar from "../sidebar";
import Footer from "../footer";
import SearchPanel from "../SearchPanel";

function MainLayout() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flex: 1,
        }}
      >
        <Sidebar />
        <SearchPanel />

        <Box
          sx={{
            flex: 1,
          }}
        >
          <Outlet />
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}

export default MainLayout;
