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
          fontFamily: "Montserrat",
          fontStyle: "normal",
          fontWeight: 700,
          fontSize: "64px",
          lineHeight: "110%",
          pt: 4,
        }}
      >
        Page Not Found
      </Typography>
      <Typography
        sx={{
          fontFamily: "Montserrat",
          fontStyle: "normal",
          fontWeight: 500,
          fontSize: "20px",
          lineHeight: "130%",
          color: "#8B8B8B",
          maxWidth: "664px",
          pt: 2,
          pb: 4,
        }}
      >
        We’re sorry, the page you requested could not be found. Please go back
        to the homepage.
      </Typography>
      {/* <BtnCard sx={{ pl: 7, pr: 7 }}>Go Home</BtnCard> */}
    </Box>
  );
}

export default NotFoundPage;
