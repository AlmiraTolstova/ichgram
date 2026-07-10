import { Box } from "@mui/material";
import { Outlet } from "react-router";
import Sidebar from "../sidebar";
import Footer from "../footer";
import SearchPanel from "../searchPanel";
import NotificationsPanel from "../notificationsPanel";

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
        <NotificationsPanel></NotificationsPanel>
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
