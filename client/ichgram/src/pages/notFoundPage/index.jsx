import { Box, Typography } from "@mui/material";
import Img from "../../assets/404.png";
function NotFoundPage() {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Box
          sx={{
            //border: "1px solid red",
            display: "flex",
            //p: "5.875rem 6.625rem 11.5625rem 7.375rem",
            p: {
              xs: "1rem 1rem 1rem 1rem",
              sm: "1rem 1rem 1rem 1rem",
              md: "2.375rem 5.9375rem 13.5rem 10.625rem",
            },
            gap: "2.75rem",
            flexDirection: {
              xs: "column",
              sm: "column",
              md: "row",
            },
          }}
        >
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
                fontWeight: 700,
                fontSize: "36px",
                lineHeight: "40px",
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
    </Box>
  );
}

export default NotFoundPage;
