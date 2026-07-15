import Button from "@mui/material/Button";

function AppButton({
  appearance = "primary",
  size = "large",
  children,
  sx,
  ...props
}) {
  const appearances = {
    primary: {
      variant: "contained",
      sx: {
        backgroundColor: "#0095F6",
        color: "#FFFFFF",
        boxShadow: "none",

        "&:hover": {
          backgroundColor: "#048be5",
        },
      },
    },

    gray: {
      variant: "contained",
      sx: {
        backgroundColor: "#EFEFEF",
        color: "#000000",
        boxShadow: "none",

        "&:hover": {
          backgroundColor: "#e8e6e6",
        },
      },
    },

    secondary: {
      variant: "outlined",
      sx: {
        borderColor: "#0095F6",
        color: "#0095F6",

        "&:hover": {
          borderColor: "#048be5",
        },
      },
    },

    text: {
      variant: "text",
      sx: {
        color: "#00376B",
        fontWeight: 400,
        textDecoration: "underline",
        textUnderlineOffset: "2px",

        "&:hover": {
          backgroundColor: "transparent",
        },
      },
    },

    underline: {
      variant: "text",
      sx: {
        color: "#0095F6",
        fontWeight: 600,
        textDecoration: "underline",
        textUnderlineOffset: "2px",

        "&:hover": {
          backgroundColor: "transparent",
          textDecoration: "underline",
        },
      },
    },
    bluelink: {
      variant: "text",
      sx: {
        color: "#0095F6",
        fontWeight: 600,
        textUnderlineOffset: "2px",

        "&:hover": {
          backgroundColor: "transparent",
          textDecoration: "underline",
        },
      },
    },
  };

  const sizes = {
    large: {
      minWidth: "268px",
      paddingTop: "7px",
      paddingBottom: "7px",
      fontSize: "14px",
      lineHeight: "18px",
    },

    medium: {
      minWidth: "168px",
      paddingTop: "7px",
      paddingBottom: "7px",
      fontSize: "14px",
      lineHeight: "18px",
      fontWeight: 600,
    },

    small: {
      minWidth: "120px",
      paddingTop: "5px",
      paddingBottom: "5px",
      fontSize: "12px",
      lineHeight: "16px",
    },
  };

  return (
    <Button
      variant={appearances[appearance].variant}
      sx={{
        borderRadius: "8px",
        textTransform: "none",
        fontFamily: "Roboto",
        fontStyle: "normal",
        display: "flex",
        alignItems: "center",
        textAlign: "center",
        ...sizes[size],
        ...appearances[appearance].sx,
        ...sx,
      }}
      {...props}
    >
      {children}
    </Button>
  );
}

export default AppButton;
