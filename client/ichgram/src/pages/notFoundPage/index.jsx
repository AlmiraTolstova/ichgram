import { Box, Typography } from "@mui/material";
import Img from "../../assets/404.png";
import Sidebar from "../../components/sidebar";
import Footer from "../../components/footer";
function NotFoundPage() {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Sidebar></Sidebar>
        <Box
          sx={{
            border: "1px solid red",
            display: "flex",
            p: "94px 106px 185px 118px",
            gap: "2.75rem",
          }}
        >
          {/* IMG */}
          <Box
            component="img"
            src={Img}
            alt="login-image"
            sx={{
              width: "23.75rem",
              height: "auto",
              objectFit: "contain",
            }}
          ></Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                // fontStyle: "normal",
                fontWeight: 700,
                fontSize: "36px",
                lineHeight: "20px",
                display: "flex",
                alignItems: "center",
                color: "#000000",
                pt: "47px",
                pb: "1rem",
              }}
            >
              Oops! Page Not Found (404 Error)
            </Typography>
            <Typography
              sx={{
                fontStyle: "normal",
                fontWeight: 600,
                fontSize: "16px",
                lineHeight: "20px",
                display: "flex",
                alignItems: "center",
                color: "#737373",
                maxWidth: "475px",
              }}
            >
              We're sorry, but the page you're looking for doesn't seem to
              exist. If you typed the URL manually, please double-check the
              spelling. If you clicked on a link, it may be outdated or broken.
            </Typography>
            {/* <BtnCard sx={{ pl: 7, pr: 7 }}>Go Home</BtnCard> */}
          </Box>
        </Box>
      </Box>
      <Footer></Footer>
    </Box>
  );
}

export default NotFoundPage;
