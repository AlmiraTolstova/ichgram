import { Box, Typography } from "@mui/material";
import Img from "../../assets/404.png";
function NotFoundPage() {
  return (
    <Box
      sx={{
        maxWidth: "85rem",
        margin: "0 auto",
        textAlign: "center",
        pt: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "#282828",
      }}
    >
      <Box
        component="img"
        src={Img}
        alt="404-image"
        sx={{ maxWidth: "690px", height: "auto", display: "block" }}
      ></Box>
      <Typography
        sx={{
          fontStyle: "normal",
          fontEeight: 700,
          fontSize: "36px",
          lineHeight: "20px",
          display: "flex",
          alignItems: "center",
          color: "#000000",
          pt: 4,
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
          maxWidth: "664px",
          pt: 2,
          pb: 4,
        }}
      >
        We're sorry, but the page you're looking for doesn't seem to exist. If
        you typed the URL manually, please double-check the spelling. If you
        clicked on a link, it may be outdated or broken.
      </Typography>
      {/* <BtnCard sx={{ pl: 7, pr: 7 }}>Go Home</BtnCard> */}
    </Box>
  );
}

export default NotFoundPage;
