import { Box, Container, Link, Stack, Typography } from "@mui/material";

const links = [
  { label: "Home", href: "#" },
  { label: "Search", href: "#" },
  { label: "Explore", href: "#" },
  { label: "Messages", href: "#" },
  { label: "Notifications", href: "#" },
  { label: "Create", href: "#" },
];

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        border: "1px solid ",
        borderColor: "divider",
        bgcolor: "#fff",
      }}
    >
      <Container
        sx={{
          width: {
            xs: "100%",
            sm: "28rem",
            md: "30.875rem",
          },
          pt: "1.5rem",
          pb: "3rem",
          border: "1px solid red",
        }}
      >
        <Stack
          direction="row"
          sx={{
            display: "flex",

            flexWrap: {
              xs: "wrap",
              md: "nowrap",
            },
            justifyContent: "space-between",
          }}
        >
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              underline="none"
              sx={{
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: "12px",
                lineHeight: "16px",
                display: "flex",
                alignItems: "center",
                color: "#737373",
                transition: "0.2s",
                "&:hover": {
                  color: "text.primary",
                },
              }}
            >
              {link.label}
            </Link>
          ))}
        </Stack>

        <Typography
          color="text.secondary"
          align="center"
          sx={{
            marginTop: "3rem",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "12px",
            lineHeight: "16px",
            display: "flex",
            justifyContent: "center",
            color: "#737373",
          }}
        >
          © 2024 ICHgram
        </Typography>
      </Container>
    </Box>
  );
}
export default Footer;
