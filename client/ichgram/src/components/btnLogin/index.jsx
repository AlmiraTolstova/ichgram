import Button from "@mui/material/Button";

function BtnLogin({ variantType = "primary", children, sx, ...props }) {
  const variants = {
    primary: {
      variant: "contained",
      sx: {
        minWidth: "268px",
        backgroundColor: "#0095F6",
        fontStyle: "normal",
        fontWeight: 600,
        fontSize: "14px",
        lineHeight: "18px",

        color: "#FFFFFF",

        "&:hover": {
          backgroundColor: "#048be5",
        },
      },
    },

    secondary: {
      variant: "outlined",
      sx: {
        borderColor: "#5B4CFF",
        color: "#5B4CFF",
      },
    },

    text: {
      variant: "text",
      sx: {
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: "12px",
        lineHeight: "16px",
        color: "#00376B",
        textDecoration: "underline",
        textUnderlineOffset: "2px",
        width: "168px",
      },
    },

    underline: {
      variant: "text",
      sx: {
        fontStyle: "normal",
        fontWeight: 600,
        fontSize: "14px",
        lineHeight: "16px",
        textDecoration: "underline",
        textUnderlineOffset: "2px",
        color: "#0095F6",
        "&:hover": {
          backgroundColor: "transparent",
          textDecoration: "underline",
        },
      },
    },
  };

  return (
    <Button
      variant={variants[variantType].variant}
      sx={{
        minWidth: "268px",
        paddingTop: "7px",
        paddingBottom: "7px",
        borderRadius: "8px",
        textTransform: "none",
        fontFamily: "Roboto",
        // fontSize: "14px",
        // lineHeight: "18px",
        display: "flex",
        alignItems: "center",
        textAlign: "center",
        ...variants[variantType].sx,
        ...sx, // позволяет переопределить стили при необходимости
      }}
      {...props}
    >
      {children}
    </Button>
  );
}

export default BtnLogin;
